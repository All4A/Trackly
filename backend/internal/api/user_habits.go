package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

type UserHabitsApi struct {
	userHabitsRepo *repositories.HabitUserRepository
	HabitsRepo     *repositories.HabitRepository
}

func NewUserHabitsApi(userHabitsRepo *repositories.HabitUserRepository, HabitsRepo *repositories.HabitRepository) *UserHabitsApi {
	return &UserHabitsApi{userHabitsRepo: userHabitsRepo, HabitsRepo: HabitsRepo}
}

func (u *UserHabitsApi) PostUserHabits(ctx echo.Context) error {
	var userHabitRequest models.UserHabitRequest

	if err := ctx.Bind(&userHabitRequest); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})
	}

	var habit models.Habit

	habit.HabitName = userHabitRequest.HabitName
	habit.Description = userHabitRequest.Description

	if err := u.HabitsRepo.CreateHabit(&habit); err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	var userHabit models.UserHabit

	userHabit.HabitID = habit.ID
	userHabit.UserID = userHabitRequest.UserID
	userHabit.CurrentPlan = userHabitRequest.CurrentPlan
	userHabit.StartDate = userHabitRequest.StartDate

	if err := u.userHabitsRepo.CreateUserHabit(&userHabit); err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, userHabit)

}

func (u *UserHabitsApi) GetUserHabits(ctx echo.Context) error {

	habits, err := u.userHabitsRepo.GetUserHabits()
	if err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, habits)

}
func (u *UserHabitsApi) GetUserHabitsUserId(ctx echo.Context, userId int) error {

	userHabits, err := u.userHabitsRepo.GetUserHabitsByUserId(userId)

	if err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, userHabits)
}

func (u *UserHabitsApi) GetUserHabitsUserIdHabitId(ctx echo.Context, userId int, habitId int) error {

	userHabit, err := u.userHabitsRepo.GetUserHabitsByUserIdHabitId(userId, habitId)

	if err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, userHabit)

}

func (u *UserHabitsApi) PutUserHabits(ctx echo.Context) error {

	var updatedUserHabit models.UserHabit

	if err := ctx.Bind(&updatedUserHabit); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request body"})
	}

	habit, _ := u.userHabitsRepo.GetUserHabitsByUserIdHabitId(updatedUserHabit.UserID, updatedUserHabit.HabitID)

	if habit == nil {
		return ctx.JSON(404, map[string]string{"error": "user not found"})
	}

	habit.CurrentPlan = updatedUserHabit.CurrentPlan

	if err := u.userHabitsRepo.UpdateUserHabit(habit); err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, habit)
}

func (u *UserHabitsApi) DeleteUserHabitsUserIdHabitId(ctx echo.Context, userId int, habitId int) error {

	if err := u.userHabitsRepo.DeleteUserHabit(userId, habitId); err != nil {
		return ctx.JSON(404, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, map[string]string{"message": "user_habit deleted"})
}
