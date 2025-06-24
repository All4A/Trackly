package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"trackly-backend/internal/config"
)

type GptPrompt struct {
	ModelUri          string                 `json:"modelUri"`
	CompletionOptions map[string]interface{} `json:"completionOptions"`
	Messages          []map[string]string    `json:"messages"`
}

type YandexGptResponse struct {
	Result struct {
		Alternatives []struct {
			Message struct {
				Role string `json:"role"`
				Text string `json:"text"`
			} `json:"message"`
			Status string `json:"status"`
		} `json:"alternatives"`
		Usage struct {
			InputTextTokens         string `json:"inputTextTokens"`
			CompletionTokens        string `json:"completionTokens"`
			TotalTokens             string `json:"totalTokens"`
			CompletionTokensDetails struct {
				ReasoningTokens string `json:"reasoningTokens"`
			} `json:"completionTokensDetails"`
		} `json:"usage"`
		ModelVersion string `json:"modelVersion"`
	} `json:"result"`
}

type GetCommentResponse struct {
	Comment string `json:"comment"`
}

type AiService interface {
	GetStatisticComment(statistic string) (*GetCommentResponse, error)
}

type YandexGptService struct {
	token  string
	folder string
	client *http.Client
}

func NewYandexGptService(config config.AiConfig) *YandexGptService {
	return &YandexGptService{config.Token, config.Folder, http.DefaultClient}
}

const url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"

func (y YandexGptService) GetStatisticComment(statistic string) (*GetCommentResponse, error) {
	prompt := newGptPrompt(y.folder, hobbyAnalyticsComment, statistic)

	promptJson, err := json.Marshal(prompt)
	if err != nil {
		return nil, err
	}
	b := bytes.NewReader(promptJson)
	request, err := http.NewRequest("POST", url, b)
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", y.token))
	if err != nil {
		return nil, err
	}
	do, err := y.client.Do(request)
	if err != nil {
		return nil, err
	}
	defer do.Body.Close()
	body, err := io.ReadAll(do.Body)

	var yandexResponse YandexGptResponse
	err = json.Unmarshal(body, &yandexResponse)
	if err != nil {
		return nil, err
	}

	// Извлекаем текст комментария из первого альтернативного ответа
	if len(yandexResponse.Result.Alternatives) > 0 {
		comment := yandexResponse.Result.Alternatives[0].Message.Text
		return &GetCommentResponse{Comment: comment}, nil
	}

	return nil, fmt.Errorf("no alternatives found in response")
}

const hobbyAnalyticsComment = "дай короткий комментарий по хобби пользователя и дай ему полезный совет по хобби, по типу: - ты молодец, продолжнай в том же духе, -стоит поднажать, ты выбиваешься из графика"

func newGptPrompt(folder string, systemPrompt string, message string) *GptPrompt {
	return &GptPrompt{
		ModelUri: fmt.Sprintf("gpt://%s/yandexgpt", folder),
		CompletionOptions: map[string]interface{}{
			"stream":      false,
			"temperature": 0.6,
			"maxTokens":   2000,
			"reasoningOptions": map[string]interface{}{
				"mode": "DISABLED",
			},
		},
		Messages: []map[string]string{
			{"role": "system", "text": systemPrompt},
			{"role": "user", "text": message},
		},
	}
}
