
## Codegen
используется кодогенерация ручек по опен апи схеме [openapi.yaml](open-api/openapi.yaml)
```bash
go install github.com/deepmap/oapi-codegen/cmd/oapi-codegen@latest 
```
```bash
oapi-codegen -generate types,server -package api open-api/openapi.yaml > internal/api/api.gen.go
```



Запускается все дело в докере
```bash
docker-compose up --build
```