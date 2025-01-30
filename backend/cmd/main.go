package main

import (
	"flag"
	"github.com/labstack/echo/v4"
	"log"
	"trackly-backend/internal/api"
	"trackly-backend/internal/config"
	"trackly-backend/internal/db"
	"trackly-backend/internal/repositories"
)

func main() {
	// Загрузка конфигурации
	configFilePath := flag.String("configs", "", "Path to the configuration file")
	flag.Parse()
	println("config path:" + *configFilePath)

	cfg, err := config.LoadConfig(*configFilePath)
	if err != nil {
		log.Fatalf("Could read config: %v", err)
	}

	// Инициализация базы данных
	database, err := db.InitDB(&cfg.Database)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	// Инициализация Echo
	e := echo.New()

	// Инициализация репозитория и сервера
	userRepo := repositories.NewUserRepository(database)
	server := api.NewServer(userRepo)

	// Регистрация эндпоинтов из OpenAPI
	api.RegisterHandlers(e, server)

	// Запуск сервера
	e.Logger.Fatal(e.Start(":" + cfg.Port))
}
