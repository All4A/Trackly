package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

type HServer struct {
	habitRepo *repositories.HabitRepository
}

func NewHServer(habitRepo *repositories.HabitRepository) *HServer {
	return &HServer{habitRepo: habitRepo}
}

func (h *HServer) CreateHabit(ctx echo.Context) error {
	var habit models.Habit

	if err := ctx.Bind(&habit); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})
	}
	if err := h.habitRepo.CreateHabit(&habit); err != nil {

		if err.Error() == fmt.Sprintf("habit with name '%s' already exists", habit.Name) {
			return ctx.JSON(409, map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habit)
}

func (h *HServer) GetHabits(ctx echo.Context) error {
	habits, err := h.habitRepo.GetHabits()
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habits)
}

func (h *HServer) GetHabitById(ctx echo.Context) error {
	habitId, _ := strconv.Atoi(ctx.Param("habitId"))

	habit, err := h.habitRepo.GetHabitById(habitId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habit)

}

func (h *HServer) UpdateHabit(ctx echo.Context) error {
	var updatedHabit models.Habit

	if err := ctx.Bind(&updatedHabit); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})
	}

	habit, _ := h.habitRepo.GetHabitById(updatedHabit.ID)
	if habit == nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": "habit does not exist"})
	}

	habit.Name = updatedHabit.Name
	habit.Description = updatedHabit.Description

	if err := h.habitRepo.UpdateHabit(habit); err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, habit)
}

func (h *HServer) DeleteHabitById(ctx echo.Context) error {
	habitId, _ := strconv.Atoi(ctx.Param("habitId"))

	if err := h.habitRepo.DeleteHabitById(habitId); err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, map[string]string{"message": "habit deleted"})
}
