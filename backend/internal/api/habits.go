package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/repositories"
)

type HabitsApi struct {
	habitRepo *repositories.HabitRepository
}

func NewHabitsApi(habitRepo *repositories.HabitRepository) *HabitsApi {
	return &HabitsApi{habitRepo: habitRepo}
}

func (h *HabitsApi) GetApiHabits(ctx echo.Context) error {
	uid := ctx.Get("user_id")
	println(uid)
	//TODO implement me
	panic("implement me")
}

func (h *HabitsApi) PostApiHabits(ctx echo.Context) error {
	//TODO implement me
	panic("implement me")
}

func (h *HabitsApi) GetApiHabitsHabitId(ctx echo.Context, habitId int) error {
	habit, err := h.habitRepo.GetHabitById(habitId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habit)
}

func (h *HabitsApi) PutApiHabitsHabitId(ctx echo.Context, habitId int) error {
	//TODO implement me
	panic("implement me")
}
