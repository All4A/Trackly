package main

import "gorm.io/gorm"

type Hobby struct {
	HobbyId   int    `json:"hobby_id"`
	HobbyName string `json:"hobby_name"`
	gorm.Model
}
