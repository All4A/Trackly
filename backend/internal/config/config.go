package config

import (
	"fmt"
	"gopkg.in/yaml.v3"
	"os"
)

// Config represents the application configuration
type Config struct {
	AppName   string   `yaml:"app_name"`
	Port      string   `yaml:"port"`
	Database  DbConfig `yaml:"database"`
	JwtSecret string   `yaml:"jwt_secret"`
}

// DbConfig represents the database configuration
type DbConfig struct {
	Host     string `yaml:"host"`
	Port     string `yaml:"port"`
	Username string `yaml:"username"`
	Password string `yaml:"password"` // This will be overridden by the environment variable
	DbName   string `yaml:"dbname"`
}

// LoadConfig reads the YAML configuration file and injects environment variables
func LoadConfig(filePath string) (*Config, error) {
	// Read the YAML file
	file, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("error reading configs file: %w", err)
	}

	// Parse the YAML into the Config struct
	var config Config
	err = yaml.Unmarshal(file, &config)
	if err != nil {
		return nil, fmt.Errorf("error parsing configs file: %w", err)
	}

	// Override the password from the environment variable

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

	return &config, nil
}
