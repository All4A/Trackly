package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

type HabitsApi struct {
	habitRepo *repositories.HabitRepository
}

func NewHabitsApi(habitRepo *repositories.HabitRepository) *HabitsApi {
	return &HabitsApi{habitRepo: habitRepo}
}

func (h *HabitsApi) PostHabits(ctx echo.Context) error {
	var habit models.Habit

	if err := ctx.Bind(&habit); err != nil {

		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})

	}
	if err := h.habitRepo.CreateHabit(&habit); err != nil {

		if err.Error() == fmt.Sprintf("habit with name '%s' already exists", habit.HabitName) {
			return ctx.JSON(409, map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habit)
}

func (h *HabitsApi) GetHabits(ctx echo.Context) error {
	habits, err := h.habitRepo.GetHabits()
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habits)
}

func (h *HabitsApi) GetHabitsHabitId(ctx echo.Context, habitId int) error {
	///habitId, _ := strconv.Atoi(ctx.Param("habitId"))

	habit, err := h.habitRepo.GetHabitById(habitId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habit)

}

func (h *HabitsApi) PutHabits(ctx echo.Context) error {
	var updatedHabit models.Habit

	if err := ctx.Bind(&updatedHabit); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})
	}

	habit, _ := h.habitRepo.GetHabitById(updatedHabit.ID)
	if habit == nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": "habit does not exist"})
	}

	habit.HabitName = updatedHabit.HabitName
	habit.Description = updatedHabit.Description

	if err := h.habitRepo.UpdateHabit(habit); err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, habit)
}

func (h *HabitsApi) DeleteHabitsHabitId(ctx echo.Context, habitId int) error {
	///habitId, _ := strconv.Atoi(ctx.Param("habitId"))

	if err := h.habitRepo.DeleteHabitById(habitId); err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, map[string]string{"message": "habit deleted"})
}
