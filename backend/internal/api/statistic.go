package api

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"sort"
	"strconv"
	"time"
	"trackly-backend/internal/models"
	"trackly-backend/internal/repositories"
)

type StatisticApi struct {
	habitRepo     *repositories.HabitRepository
	statisticRepo *repositories.StatisticRepository
}

func NewStatisticApi(habitRepo *repositories.HabitRepository, statisticRepo *repositories.StatisticRepository) *StatisticApi {
	return &StatisticApi{habitRepo: habitRepo, statisticRepo: statisticRepo}
}

func (s StatisticApi) GetApiHabitsHabitIdStatistic(ctx echo.Context, habitId int, params GetApiHabitsHabitIdStatisticParams) error {

	if err := ctx.Bind(&params); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]interface{}{})
	}

	userId := ctx.Get("user_id").(int)

	habit, err := s.habitRepo.GetHabitById(habitId, userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]interface{}{})
	}

	plansArr := habit.Plans

	var plan models.Plan
	if len(plansArr) > 0 {

		sort.Slice(plansArr, func(i, j int) bool {
			return plansArr[i].ID > plansArr[j].ID
		})
		plan = plansArr[0]
	}

	dateFrom := params.DateFrom.Time
	dateTo := params.DateTo.Time

	dateTo = time.Date(
		dateTo.Year(), dateTo.Month(), dateTo.Day(),
		23, 59, 59, 999999999,
		dateTo.Location(),
	)

	scores := habit.HabitScore

	sort.Slice(scores, func(i, j int) bool {
		return scores[i].DateTime.Before(scores[j].DateTime)
	})

	response := HabitStatisticResponse{
		GroupBy: &params.GroupBy,
		Period: (*[]struct {
			Interval *string `json:"interval,omitempty"`
			Value    *int    `json:"value,omitempty"`
		})(&[]struct {
			Interval *string
			Value    *int
		}{}),
		PlanUnit: (*PlanUnit)(plan.PlanUnit),
	}

	switch params.GroupBy {

	case "day":

		dateScores := make(map[time.Time]int)
		for _, score := range scores {
			if score.DateTime.After(dateFrom) && score.DateTime.Before(dateTo) {

				dateScores[score.DateTime] += score.Value
			}

		}

		for dateKey, value := range dateScores {
			weekday := dateKey.Weekday().String()
			*response.Period = append(*response.Period, struct {
				Interval *string `json:"interval,omitempty"`
				Value    *int    `json:"value,omitempty"`
			}{
				Interval: &weekday,
				Value:    &value,
			})
		}

	case "month":
		var currentMonth string
		var currentValue int
		first := true

		for _, score := range scores {
			if score.DateTime.Before(dateFrom) || score.DateTime.After(dateTo) {
				continue
			}

			month := score.DateTime.Month().String()

			if first {
				currentMonth = month
				currentValue = score.Value
				first = false
				continue
			}

			if month != currentMonth {

				newMonth := currentMonth
				newValue := currentValue
				*response.Period = append(*response.Period, struct {
					Interval *string `json:"interval,omitempty"`
					Value    *int    `json:"value,omitempty"`
				}{
					Interval: &newMonth,
					Value:    &newValue,
				})

				currentMonth = month
				currentValue = 0
			}

			currentValue += score.Value
		}
		if !first {

			newMonth := currentMonth
			newValue := currentValue
			*response.Period = append(*response.Period, struct {
				Interval *string `json:"interval,omitempty"`
				Value    *int    `json:"value,omitempty"`
			}{
				Interval: &newMonth,
				Value:    &newValue,
			})
		}
	case "year":

		yearScores := make(map[string]int)
		for _, score := range scores {
			if score.DateTime.After(dateFrom) && score.DateTime.Before(dateTo) {
				year := strconv.Itoa(score.DateTime.Year())
				yearScores[year] += score.Value
			}
		}
		for yearKey, value := range yearScores {
			*response.Period = append(*response.Period, struct {
				Interval *string `json:"interval,omitempty"`
				Value    *int    `json:"value,omitempty"`
			}{
				Interval: &yearKey,
				Value:    &value,
			})
		}
	}

	return ctx.JSON(http.StatusOK, response)

}

func (s StatisticApi) GetApiHabitsHabitIdStatisticTotal(ctx echo.Context, habitId int) error {

	userId := ctx.Get("user_id").(int)

	habit, err := s.habitRepo.GetHabitById(habitId, userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	uniqueDates := make(map[time.Time]bool)
	total := 0

	for _, score := range habit.HabitScore {
		total += score.Value
		uniqueDates[score.DateTime.UTC().Truncate(24*time.Hour)] = true
	}

	days := len(uniqueDates)
	average := 0
	if days > 0 {
		average = total / days
	}

	plansArr := habit.Plans

	var plan models.Plan
	if len(plansArr) > 0 {

		sort.Slice(plansArr, func(i, j int) bool {
			return plansArr[i].ID > plansArr[j].ID
		})
		plan = plansArr[0]
	}

	response := HabitStatisticTotalResponse{
		AveragePerDay: &average,
		PlanUnit:      (*PlanUnit)(plan.PlanUnit),
		Total:         &total,
	}

	return ctx.JSON(200, response)

}
