package models

type Habit struct {
	ID            int      `gorm:"primaryKey" json:"habit_id"`
	HabitName     string   `json:"habit_name"`
	Description   *string  `json:"description"`
	UserId        int      `json:"user_id"`
	StartDate     string   `json:"start_date"`
	Notifications *bool    `json:"notifications"`
	TodayValue    *float32 `json:"today_value"`
	Plans         []Plan   `gorm:"foreignKey:HabitId"`
}
