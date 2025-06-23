package db

import (
	"context"
	"fmt"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"log"
	"time"
	"trackly-backend/internal/config"
)

type MinioClient struct {
	Client *minio.Client
}

func NewMinioClient(cfg *config.Config) (*MinioClient, error) {
	retryConnectCount := 5
	var client *minio.Client
	var conErr error
	for i := 0; i < retryConnectCount; i++ {
		c, err := minio.New(cfg.MinioConfig.MinioEndpoint, &minio.Options{
			Creds:  credentials.NewStaticV4(cfg.MinioConfig.MinioRootUser, cfg.MinioConfig.MinioRootPassword, ""),
			Secure: cfg.MinioConfig.MinioUseSSL,
		})
		if err != nil {
			conErr = err
			log.Printf("Failed to connect to MinIO (attempt %d/%d): %v", i+1, retryConnectCount, err)
			time.Sleep(5 * time.Second)
			continue
		}
		client = c
		conErr = nil
		break
	}

	if conErr != nil {
		return nil, fmt.Errorf("failed to connect to MinIO after %d attempts: %w", retryConnectCount, conErr)
	}

	err := initMinio(context.Background(), cfg, client)
	if err != nil {
		return nil, err
	}
	return &MinioClient{Client: client}, nil
}

func initMinio(ctx context.Context, cfg *config.Config, client *minio.Client) error {
	exists, err := client.BucketExists(ctx, cfg.MinioConfig.BucketName)
	if err != nil {
		return err
	}
	if !exists {
		log.Printf("Бакет %s не найден, создаем новый...", cfg.MinioConfig.BucketName)
		err := client.MakeBucket(ctx, cfg.MinioConfig.BucketName, minio.MakeBucketOptions{})
		if err != nil {
			return err
		}
	}

	return nil
}
