package models

type User struct {
	ID       int    `gorm:"column:id"`
	Password string `json:"password"`
	Username string `json:"username"`
}
