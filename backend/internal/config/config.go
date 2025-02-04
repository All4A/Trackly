package config

import (
	"fmt"
	"gopkg.in/yaml.v3"
	"log"
	"os"
	"strconv"
)

type Config struct {
	AppName     string      `yaml:"app_name"`
	Port        string      `yaml:"port"`
	Database    DbConfig    `yaml:"database"`
	JwtSecret   string      `yaml:"jwt_secret"`
	MinioConfig MinioConfig `yaml:"minio_config"`
}

type DbConfig struct {
	Host     string `yaml:"host"`
	Port     string `yaml:"port"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
	DbName   string `yaml:"dbname"`
}

type MinioConfig struct {
	Port              string
	MinioEndpoint     string
	BucketName        string
	MinioRootUser     string
	MinioRootPassword string
	MinioUseSSL       bool
}

func LoadConfig(filePath string) (*Config, error) {

	file, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("error reading configs file: %w", err)
	}

	var config Config
	err = yaml.Unmarshal(file, &config)
	if err != nil {
		return nil, fmt.Errorf("error parsing configs file: %w", err)
	}

	if config.Database.Host == "" {
		dbHost := os.Getenv("DB_HOST")
		if dbHost == "" {
			return nil, fmt.Errorf("DB_HOST environment variable is not set")
		}
		config.Database.Host = dbHost
	}

	if config.Database.Password == "" {
		dbPassword := os.Getenv("DB_PASSWORD")
		if dbPassword == "" {
			return nil, fmt.Errorf("DB_PASSWORD environment variable is not set")
		}
		config.Database.Password = dbPassword
	}

	config.MinioConfig = MinioConfig{
		Port:              getEnv("PORT", "8080"),
		MinioEndpoint:     getEnv("MINIO_ENDPOINT", "localhost:9000"),
		BucketName:        getEnv("MINIO_BUCKET_NAME", "best-bucket"),
		MinioRootUser:     getEnv("MINIO_ROOT_USER", "root"),
		MinioRootPassword: getEnv("MINIO_ROOT_PASSWORD", "best-password"),
		MinioUseSSL:       getEnvAsBool("MINIO_USE_SSL", false),
	}

	log.Printf("Loaded config: %+v", config.MinioConfig)

	return &config, nil
}

func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsBool(key string, defaultValue bool) bool {
	if valueStr := getEnv(key, ""); valueStr != "" {
		if value, err := strconv.ParseBool(valueStr); err == nil {
			return value
		}
	}
	return defaultValue
}
