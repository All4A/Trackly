package api

import "github.com/labstack/echo/v4"

type StatisticApi struct {
}

func NewStatisticApi() *StatisticApi {
	return &StatisticApi{}
}

func (s StatisticApi) GetApiHabitsHabitIdStatistic(ctx echo.Context, habitId int, params GetApiHabitsHabitIdStatisticParams) error {
	//TODO implement me
	panic("implement me")
}

func (s StatisticApi) GetApiHabitsHabitIdStatisticTotal(ctx echo.Context, habitId int) error {
	//TODO implement me
	panic("implement me")
}
