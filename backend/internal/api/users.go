package api

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/minio/minio-go/v7"
	"log"
	"net/http"
	"trackly-backend/internal/config"
	"trackly-backend/internal/db"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
	"trackly-backend/internal/utils"
)

func NewUserApi(userRepo *repositories.UserRepository, cfg *config.Config, minioClient *db.MinioClient) *UserApi {
	return &UserApi{userRepo: userRepo, cfg: cfg, minioClient: minioClient}
}

type UserApi struct {
	userRepo    *repositories.UserRepository
	cfg         *config.Config
	minioClient *db.MinioClient
}

func (a UserApi) PostApiAuthLogin(c echo.Context) error {
	var req = LoginRequest{}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	userFromDb, err := a.userRepo.FindUserByEmail(string(req.Email))
	if err != nil {
		return err
	}

	if req.Password != userFromDb.Password {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
	}

	token, err := utils.GenerateJwt(a.cfg.JwtSecret, userFromDb.ID)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, LoginResponse{token})
}

func (a UserApi) PostApiAuthRegister(ctx echo.Context) error {
	var registerRequest = RegisterRequest{}
	err := ctx.Bind(&registerRequest)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	user := models.User{
		Username: *registerRequest.Username,
		Password: *registerRequest.Password,
		Email:    string(*registerRequest.Email),
	}
	err = a.userRepo.CreateUser(&user)
	if err != nil {
		return err
	}
	return ctx.JSON(200, "")
}

func (a UserApi) GetApiUsersProfile(ctx echo.Context) error {
	userID, ok := ctx.Get("user_id").(int)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "invalid user_id"})
	}

	user, err := a.userRepo.FindUserById(userID)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": "user not found"})
	}

	return ctx.JSON(http.StatusOK, user)

}

func (a UserApi) PutApiUsersProfile(ctx echo.Context) error {
	userID, ok := ctx.Get("user_id").(int)
	if !ok {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "invalid user_id"})
	}

	var updateRequest models.User
	if err := ctx.Bind(&updateRequest); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	user, err := a.userRepo.FindUserById(userID)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": "user not found"})
	}

	// Обновляем только непустые поля
	if updateRequest.Username != "" {
		user.Username = updateRequest.Username
	}
	if updateRequest.Email != "" {
		user.Email = updateRequest.Email
	}
	if !updateRequest.DateOfBirth.IsZero() {
		user.DateOfBirth = updateRequest.DateOfBirth
	}
	if updateRequest.Country != "" {
		user.Country = updateRequest.Country
	}
	if updateRequest.City != "" {
		user.City = updateRequest.City
	}

	err = a.userRepo.UpdateUser(user)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to update user"})
	}

	return ctx.NoContent(http.StatusOK)
}

func (a *UserApi) PostApiUsersAvatar(ctx echo.Context) error {
	log.Println("📂 Receiving file from request...")
	file, err := ctx.FormFile("avatar")
	if err != nil {
		log.Printf("❌ Error retrieving file: %v", err)
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "invalid file"})
	}

	imageID := uuid.New().String()

	log.Println("📂 Opening uploaded file...")
	src, err := file.Open()
	if err != nil {
		log.Printf("❌ Error opening file: %v", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "unable to open file"})
	}
	defer src.Close()

	if a.minioClient == nil {
		log.Println("❌ MinIO client is nil!")
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "MinIO client is not initialized"})
	}

	if a.cfg.MinioConfig.BucketName == "" {
		log.Println("❌ MinIO bucket name is empty!")
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Bucket name is empty"})
	}

	log.Println("🚀 Uploading file to MinIO...")
	log.Printf("Bucket: %s, ObjectName: %s", a.cfg.MinioConfig.BucketName, imageID)

	_, err = a.minioClient.Client.PutObject(ctx.Request().Context(), a.cfg.MinioConfig.BucketName, imageID, src, file.Size, minio.PutObjectOptions{})
	if err != nil {
		log.Printf("❌ Error uploading avatar to MinIO: %v", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "error uploading image to MinIO"})
	}
	log.Println("✅ Upload successful!")

	userID, ok := ctx.Get("user_id").(int)
	if !ok {
		log.Println("❌ user_id is missing or invalid!")
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "invalid user_id"})
	}
	log.Printf("Updating user %d avatar to %s", userID, imageID)

	err = a.userRepo.UpdateUserAvatar(userID, imageID)
	if err != nil {
		log.Printf("❌ Error updating user avatar in DB: %v", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "error updating user avatar in DB"})
	}
	log.Println("✅ User avatar updated successfully!")

	return ctx.JSON(http.StatusOK, map[string]string{"message": "avatar uploaded successfully"})
}

func (a *UserApi) GetApiUsersAvatar(ctx echo.Context) error {

	userID, ok := ctx.Get("user_id").(int)
	if !ok {
		log.Println("❌ user_id is missing or invalid!")
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "invalid user_id"})
	}

	user, err := a.userRepo.FindUserById(userID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "error fetching user"})
	}

	if user.AvatarId == uuid.Nil {
		return ctx.JSON(http.StatusNotFound, map[string]string{"error": "avatar not found"})
	}

	object, err := a.minioClient.Client.GetObject(ctx.Request().Context(), a.cfg.MinioConfig.BucketName, user.AvatarId.String(), minio.GetObjectOptions{})
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "error fetching image from MinIO"})
	}
	defer object.Close()

	ctx.Response().Header().Set("Content-Type", "image/jpeg")
	return ctx.Stream(http.StatusOK, "image/jpeg", object)
}
