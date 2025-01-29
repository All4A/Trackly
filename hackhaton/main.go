package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Welcome to the User API!")
	})

	e.GET("/users", getUsers)
	e.GET("/users/:id", getUserByID)
	e.DELETE("/users/:id", deleteUserByID)
	e.POST("/users", createUser)

	e.Logger.Fatal(e.Start(":8081"))
}
