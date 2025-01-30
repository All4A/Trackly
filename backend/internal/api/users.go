package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/auth"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

func NewServer(userRepo *repositories.UserRepository) *Server {
	return &Server{userRepo: userRepo}
}

type Server struct {
	userRepo *repositories.UserRepository
}

func (s *Server) PostLogin(ctx echo.Context) error {
	var loginData models.User

	if err := ctx.Bind(&loginData); err != nil {
		return ctx.JSON(400, map[string]string{"error": err.Error()})
	}

	user, err := s.userRepo.FindUserByUsername(loginData.Username)
	if err != nil || user.Password != loginData.Password {
		return ctx.JSON(401, map[string]string{"error": "Invalid username or password"})
	}

	token, err := auth.GenerateToken(user.Username)
	if err != nil {
		return ctx.JSON(500, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(200, map[string]string{"token": token})
}

func (s *Server) PostRegister(ctx echo.Context) error {
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
