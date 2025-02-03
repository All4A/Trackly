package repositories

import (
	"fmt"
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

func (r *UserRepository) FindUserByEmail(username string) (*models.User, error) {
	return findUser(r.db, withUserName(username))
}

func findUser(tx *gorm.DB, opts ...db.CommonScopeOption) (*models.User, error) {
	user := models.User{}
	err := tx.Scopes(opts...).Last(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func withUserName(userName string) db.CommonScopeOption {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("email = ?", userName)
	}
}

func (r *UserRepository) UpdateUserAvatar(userID string, avatarUUID string) error {
	query := `UPDATE users SET avatar_id = $1 WHERE id = $2`
	err := r.db.Exec(query, avatarUUID, userID)
	if err != nil {
		return fmt.Errorf("failed to update avatar for user %s: %w", userID, err)
	}
	return nil
}
