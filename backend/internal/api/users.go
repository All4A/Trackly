package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
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
	//TODO implement me
	panic("implement me")
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
