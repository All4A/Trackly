package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"trackly-backend/internal/config"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
	"trackly-backend/internal/utils"
)

func NewUserApi(userRepo *repositories.UserRepository, cfg *config.Config) *UserApi {
	return &UserApi{userRepo: userRepo, cfg: cfg}
}

type UserApi struct {
	userRepo *repositories.UserRepository
	cfg      *config.Config
}

func (a UserApi) PostApiAuthLogin(c echo.Context) error {
	var req = LoginRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	userFromDb, err := a.userRepo.FindUserByEmail(string(req.Email))
	if err != nil {
		return err
	}
	// Validate credentials (this is just an example)
	if req.Password != userFromDb.Password {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
	}

	// Create JWT claims
	token, err := utils.GenerateJwt(a.cfg.JwtSecret, userFromDb.ID)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, LoginResponse{token})
}

func (a UserApi) PostApiAuthRegister(ctx echo.Context) error {
	var registerRequest = RegisterRequest{}
	err := ctx.Bind(&registerRequest)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	user := models.User{
		Username: *registerRequest.Username,
		Password: *registerRequest.Password,
		Email:    string(*registerRequest.Email),
	}
	err = a.userRepo.CreateUser(&user)
	if err != nil {
		return err
	}
	return ctx.JSON(200, "")
}

func (a UserApi) GetApiUsersProfile(ctx echo.Context) error {
	//TODO implement me
	panic("implement me")
}

func (a UserApi) PutApiUsersProfile(ctx echo.Context) error {
	//TODO implement me
	panic("implement me")
}

func (a UserApi) PostApiUsersAvatar(ctx echo.Context) error {
	//TODO implement me
	panic("implement me")
}
