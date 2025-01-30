package repositories

import (
	"gorm.io/gorm"
	"trackly-backend/internal/models"
)

type HabitRepositoryInterface interface {
	NewHabitRepository(db *gorm.DB) *HabitRepository
	CreateHabit(habit *models.Habit) error
	GetHabitById(id int) (*models.Habit, error)
	DeleteHabitById(id int) error
	UpdateHabit(habit *models.Habit) error
}

type HabitRepository struct {
	db *gorm.DB
}

func NewHabitRepository(db *gorm.DB) *HabitRepository {
	return &HabitRepository{db: db}
}

func (r *HabitRepository) CreateHabit(habit *models.Habit) error {
	return r.db.Create(&habit).Error
}

func (r *HabitRepository) GetHabitById(id int) (*models.Habit, error) {

	var habit models.Habit

	if err := r.db.First(&habit, id).Error; err != nil {
		return nil, err
	}
	return &habit, nil
}

func (r *HabitRepository) DeleteHabitById(id int) error {
	if err := r.db.Delete(&models.Habit{}, id).Error; err != nil {
		return err
	}

	return nil
}

func (r *HabitRepository) UpdateHabit(habit *models.Habit) error {

	if err := r.db.Save(&habit).Error; err != nil {
		return err
	}
	return nil
}
