package models

type UserHabitRequest struct {
	UserID      int    `json:"user_id"`
	HabitName   string `json:"habit_name"`
	Description string `json:"description"`
	StartDate   string `json:"start_date"`
	CurrentPlan int    `json:"current_plan"`
}
