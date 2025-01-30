package repositories

import (
	"gorm.io/gorm"
	"trackly-backend/internal/db"
	"trackly-backend/internal/models"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) CreateUser(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) FindUserByUsername(username string) (*models.User, error) {
	return findUser(r.db, withUserName(username))
}

func findUser(tx *gorm.DB, opts ...db.CommonScopeOption) (*models.User, error) {
	user := models.User{}
	err := tx.Model(&models.User{}).Scopes(opts...).Last(user)
	if err != nil {
		return nil, err.Error
	}
	return &user, nil
}

func withUserName(userName string) db.CommonScopeOption {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("username = ?", userName)
	}
}
