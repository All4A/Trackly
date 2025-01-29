package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	gorm.Model
}

func init() {
	var err error
	dsn := "postgresql://postgres:postgres@localhost:54321/test_db?sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect to database")
	}

	fmt.Println("Connected to the database")

	if err := db.AutoMigrate(&User{}); err != nil {
		fmt.Println("Migration failed:", err)
		panic("failed to migrate database")
	}

	fmt.Println("Database connected and migration completed")
}

func createUser(c echo.Context) error {
	user := User{}
	if err := c.Bind(&user); err != nil {
		return err
	}

	result := db.Create(&user)
	if result.Error != nil {
		return c.JSON(500, result.Error)
	}

	return c.JSON(http.StatusCreated, user)
}

func getUserByID(c echo.Context) error {
	id := c.Param("id")
	user := User{}
	db.First(&user, id)
	return c.JSON(http.StatusOK, user)
}

func deleteUserByID(c echo.Context) error {
	id := c.Param("id")
	var user User
	db.Delete(&user, id)
	return c.NoContent(http.StatusNoContent)
}

func getUsers(c echo.Context) error {
	var users []User
	db.Find(&users)

	return c.JSON(http.StatusOK, users)
}
