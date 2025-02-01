package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

func NewUserApi(userRepo *repositories.UserRepository) *UserApi {
	return &UserApi{userRepo: userRepo}
}

type UserApi struct {
	userRepo *repositories.UserRepository
}

func (s *UserApi) PostLogin(ctx echo.Context) error {
	//TODO implement me
	panic("implement me")
}

func (s *UserApi) PostRegister(ctx echo.Context) error {
	var user models.User
	if err := ctx.Bind(&user); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	println("username" + user.Username)
	err := s.userRepo.CreateUser(&user)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return ctx.JSON(200, user)
}
