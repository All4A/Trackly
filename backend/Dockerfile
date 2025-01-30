# Используем официальный образ Go
FROM golang:1.22-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY go.mod go.sum ./

# Загружаем зависимости
RUN go mod download

# Копируем исходный код
COPY . .

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o my-go-service ./cmd/main.go

# Используем минимальный образ для финального контейнера
FROM alpine:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем бинарный файл из builder
COPY --from=builder /app/my-go-service .

# Копируем папку с конфигурацией
COPY configs ./configs

# Открываем порт
EXPOSE 8080

# Запускаем приложение с аргументом (по умолчанию)
CMD ["./my-go-service", "--configs", "./configs/config.yaml"]