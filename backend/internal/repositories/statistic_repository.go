package repositories

import (
	"gorm.io/gorm"
	"trackly-backend/internal/models"
)

type StatisticRepository struct {
	db *gorm.DB
}

func NewStatisticRepository(db *gorm.DB) *StatisticRepository {
	return &StatisticRepository{db: db}
}

func (s *StatisticRepository) CreateStatistic(score *models.HabitScore) error {
	return s.db.Create(score).Error
}
