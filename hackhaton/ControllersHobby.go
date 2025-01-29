package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

func createHobby(c echo.Context) error {
	hobby := main.Hobby{}

	if err := c.Bind(&hobby); err != nil {
		return err
	}

	result := main.db.Create(&hobby)

	if result.Error != nil {
		return c.JSON(500, result.Error)
	}

	return c.JSON(http.StatusNoContent, hobby)
}

func getHobby(c echo.Context) error {
	var hobbies []main.Hobby

	main.db.Find(&hobbies)

	return c.JSON(http.StatusOK, hobbies)
}

func getHobbyById(c echo.Context) error {
	id := c.Param("id")
	var hobby main.Hobby

	if result := db.First(&hobby, id); result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, "Hobby not found with ID: "+id)
		}
		return c.JSON(http.StatusInternalServerError, result.Error)
	}

	return c.JSON(http.StatusOK, hobby)
}

func updateHobby(c echo.Context) error {
	id := c.Param("id")

	var hobby main.Hobby

	if result := db.First(&hobby, id); result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, "Hobby not found with ID: "+id)
		}
		return c.JSON(http.StatusInternalServerError, result.Error)
	}

	if err := c.Bind(&hobby); err.Error != nil {
		return c.JSON(http.StatusBadRequest, err.Error)
	}

	if res := db.Save(&hobby); res.Error != nil {
		return c.JSON(http.StatusInternalServerError, res.Error)
	}

	return c.JSON(http.StatusOK, hobby)
}

func deleteHobby(c echo.Context) error {
	id := c.Param("id")
	var hobby main.Hobby

	if res := db.Delete(&hobby, id); res.Error != nil {
		return c.JSON(http.StatusInternalServerError, res.Error)
	}

	return c.NoContent(http.StatusNoContent)
}

func addHobbyToUser(c echo.Context) error {
	userId := c.Param("userId")
	hobbyId := c.Param("hobbyId")

	var user main.User

	if result := db.First(&user, userId); result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, "User not found with ID: "+userId)
		}
		return c.JSON(http.StatusInternalServerError, result.Error)
	}

	var hobby main.Hobby

	if result := db.First(&hobby, hobbyId); result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, "Hobby not found with ID: "+hobbyId)
		}
		return c.JSON(http.StatusInternalServerError, result.Error)
	}

	if err := db.Model(&user).Association("Hobbies").Append(&hobby); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, "Hobby added!")
}

///func getUserHobbies(c echo.Context) error {}
