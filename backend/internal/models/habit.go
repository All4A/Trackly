package models

type Habit struct {
	ID          int    `gorm:"primaryKey" json:"habit_id"`
	HabitName   string `json:"habit_name"`
	Description string `json:"description"`
}
