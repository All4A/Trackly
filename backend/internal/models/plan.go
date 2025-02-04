package models

type Plan struct {
	ID        int    `gorm:"primaryKey" json:"plan_id"`
	HabitId   int    `json:"habit_id"`
	PlanUnit  string `json:"plan_unit"`
	Goal      *int   `json:"goal"`
	StartTime string `json:"start_time"`
	CloseTime string `json:"close_time"`
}
