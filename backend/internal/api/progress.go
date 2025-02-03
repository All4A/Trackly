package api

import "github.com/labstack/echo/v4"

type ProgressApi struct {
}

func NewProgressApi() *ProgressApi {
	return &ProgressApi{}
}

func (h *ProgressApi) PostApiHabitsHabitIdScore(ctx echo.Context, habitId int) error {
	//TODO implement me
	panic("implement me")
}
