package repositories

import (
	"gorm.io/gorm"
	"trackly-backend/internal/models"
)

type HabitUserRepository struct {
	db *gorm.DB
}

func NewHabitUserRepository(db *gorm.DB) *HabitUserRepository {
	return &HabitUserRepository{db: db}
}

func (h *HabitUserRepository) CreateUserHabit(userHabits *models.UserHabit) error {
	return h.db.Create(&userHabits).Error
}

func (h *HabitUserRepository) GetUserHabits() ([]*models.UserHabit, error) {
	var userHabits []*models.UserHabit
	err := h.db.Find(&userHabits).Error
	if err != nil {
		return nil, err
	}

	return userHabits, nil

}

func (h *HabitUserRepository) UpdateUserHabit(userHabits *models.UserHabit) error {

	return h.db.Save(userHabits).Error
}

func (h *HabitUserRepository) GetUserHabitsByUserId(id int) (*[]models.UserHabit, error) {

	var userHabits []models.UserHabit

	err := h.db.Where("user_id = ?", id).First(&userHabits).Error

	if err != nil {
		return nil, err
	}

	return &userHabits, nil
}

func (h *HabitUserRepository) GetUserHabitsByUserIdHabitId(userId, habitId int) (*models.UserHabit, error) {

	var userHabit models.UserHabit

	err := h.db.Where("user_id = ? and habit_id = ?", userId, habitId).First(&userHabit).Error

	if err != nil {
		return nil, err
	}
	return &userHabit, nil
}

func (h *HabitUserRepository) DeleteUserHabit(userId, habitId int) error {

	if err := h.db.Delete(&models.UserHabit{}, "user_id = ? and habit_id = ?", userId, habitId).Error; err != nil {
		return err
	}
	return nil
}
