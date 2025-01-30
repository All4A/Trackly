package models

type User struct {
	ID       int    `gorm:"column:id"`
	Password string `json:"-"`
	Username string `json:"username"`
}
