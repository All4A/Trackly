package models

type User struct {
	UID      string `gorm:"column:id"`
	Password string `json:"password"`
	Username string `json:"username"`
}
