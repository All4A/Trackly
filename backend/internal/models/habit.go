package models

type Habit struct {
	ID          int    `gorm:"column:habit_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
