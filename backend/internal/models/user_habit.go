package models

type UserHabit struct {
	ID          int    `gorm:"primaryKey" json:"id"`
	UserID      int    `gorm:"index" json:"user_id"`
	HabitID     int    `gorm:"index" json:"habit_id"`
	StartDate   string `json:"start_date"`
	CurrentPlan int    `json:"current_plan"`
}
