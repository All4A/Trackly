package api

import (
	"github.com/labstack/echo/v4"
	openapi_types "github.com/oapi-codegen/runtime/types"
	"sort"
	"time"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

type HabitsApi struct {
	habitRepo *repositories.HabitRepository
	planRepo  *repositories.PlanRepository
}

func NewHabitsApi(habitRepo *repositories.HabitRepository, planRepo *repositories.PlanRepository) *HabitsApi {
	return &HabitsApi{habitRepo: habitRepo, planRepo: planRepo}
}

func (h *HabitsApi) GetApiHabits(ctx echo.Context) error {

	userId := ctx.Get("user_id").(int)

	habits, err := h.habitRepo.GetHabitsByUserId(userId)
	if err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	var response []Habit

	for _, habit := range habits {
		plans, err := h.planRepo.GetPlansByHabitId(habit.ID)
		if err != nil {
			return ctx.JSON(500, map[string]string{"message": err.Error()})
		}
		plans_arr := *plans
		var plan models.Plan
		if len(plans_arr) > 0 {

			sort.Slice(plans_arr, func(i, j int) bool {
				return plans_arr[i].ID > plans_arr[j].ID
			})
			plan = plans_arr[0]
		}
		planUnit := PlanUnit(plan.PlanUnit)
		respPlan := Plan{
			Goal:     plan.Goal,
			PlanUnit: &planUnit,
		}

		layout := "2006-01-02"

		startDate, err := time.Parse(layout, habit.StartDate)
		if err != nil {
			return ctx.JSON(500, map[string]string{"message": err.Error()})
		}

		responsHabit := Habit{
			CurrentPlan:   &respPlan,
			Id:            &habit.ID,
			Name:          &habit.HabitName,
			Notifications: habit.Notifications,
			StartDate:     &openapi_types.Date{Time: startDate},
			TodayValue:    habit.TodayValue,
		}

		response = append(response, responsHabit)

	}
	return ctx.JSON(200, response)

}

func (h *HabitsApi) PostApiHabits(ctx echo.Context) error {

	var habit NewHabit

	if err := ctx.Bind(&habit); err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	userId, ok := ctx.Get("user_id").(int)
	if !ok {
		return ctx.JSON(400, map[string]string{"message": "User ID не найден в контексте"})
	}

	todayValue := new(float32)
	*todayValue = 0

	t := time.Now()

	formatted := t.Format("2006-01-02")

	habit1 := models.Habit{
		HabitName:     habit.Name,
		Description:   habit.Description,
		UserId:        userId,
		StartDate:     formatted,
		Notifications: habit.Notifications,
		TodayValue:    todayValue,
	}

	plan := models.Plan{
		HabitId:   habit1.ID,
		PlanUnit:  string(*habit.Plan.PlanUnit),
		Goal:      habit.Plan.Goal,
		StartTime: habit1.StartDate,
	}

	habit1.Plans = append(habit1.Plans, plan)

	if err := h.habitRepo.CreateHabit(&habit1); err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	habitResponse := Habit{
		CurrentPlan:   &habit.Plan,
		Id:            &habit1.ID,
		Name:          &habit.Name,
		Notifications: habit.Notifications,
		StartDate:     &openapi_types.Date{t},
		TodayValue:    habit1.TodayValue,
	}

	return ctx.JSON(201, habitResponse)

}

func (h *HabitsApi) GetApiHabitsHabitId(ctx echo.Context, habitId int) error {
	userId := ctx.Get("user_id").(int)

	habit, err := h.habitRepo.GetHabitById(habitId, userId)
	if err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	plans, err := h.planRepo.GetPlansByHabitId(habitId)
	if err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	var plans_arr = *plans
	var plan models.Plan
	if len(plans_arr) > 0 {

		sort.Slice(plans_arr, func(i, j int) bool {
			return plans_arr[i].ID > plans_arr[j].ID
		})
		plan = plans_arr[0]
	}

	planUnit := PlanUnit(plan.PlanUnit)

	planResp := Plan{
		Goal:     plan.Goal,
		PlanUnit: &planUnit,
	}

	layout := "2006-01-02"

	startDate, err := time.Parse(layout, habit.StartDate)

	response := Habit{
		CurrentPlan:   &planResp,
		Id:            &habit.ID,
		Name:          &habit.HabitName,
		Notifications: habit.Notifications,
		StartDate:     &openapi_types.Date{startDate},
		TodayValue:    habit.TodayValue,
	}

	return ctx.JSON(200, response)

}

func (h *HabitsApi) PutApiHabitsHabitId(ctx echo.Context, habitId int) error {

	userId := ctx.Get("user_id").(int)

	var updateHabit HabitUpdate

	if err := ctx.Bind(&updateHabit); err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	habit, err := h.habitRepo.GetHabitById(habitId, userId)
	if err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	habit.HabitName = *updateHabit.Name
	habit.Notifications = updateHabit.Notifications
	habit.Description = updateHabit.Description

	if err := h.habitRepo.UpdateHabit(habit); err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	var plan models.Plan

	plan.Goal = updateHabit.Plan.Goal
	plan.PlanUnit = string(*updateHabit.Plan.PlanUnit)
	plan.HabitId = habitId

	t := time.Now()
	formatted := t.Format("2006-01-02")

	plan.StartTime = formatted

	if err := h.planRepo.CreatePlan(&plan); err != nil {
		return ctx.JSON(500, map[string]string{"message": err.Error()})
	}

	return ctx.JSON(200, map[string]string{"message": "OK"})

}
