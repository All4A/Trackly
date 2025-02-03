# AuthApi.HobbiesStatisticApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiHabitsHabitIdStatisticGet**](HobbiesStatisticApi.md#apiHabitsHabitIdStatisticGet) | **GET** /api/habits/{habitId}/statistic | Получение статустики
[**apiHabitsHabitIdStatisticTotalGet**](HobbiesStatisticApi.md#apiHabitsHabitIdStatisticTotalGet) | **GET** /api/habits/{habitId}/statistic/total | Получение статустики



## apiHabitsHabitIdStatisticGet

> HabitStatisticResponse apiHabitsHabitIdStatisticGet(habitId, dateFrom, dateTo, groupBy)

Получение статустики

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesStatisticApi();
let habitId = 56; // Number | 
let dateFrom = new Date("Sun Jan 01 03:00:00 MSK 2017"); // Date | 
let dateTo = new Date("Sun Jan 01 03:00:00 MSK 2017"); // Date | 
let groupBy = new AuthApi.StatisticGroupBy(); // StatisticGroupBy | 
apiInstance.apiHabitsHabitIdStatisticGet(habitId, dateFrom, dateTo, groupBy, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **habitId** | **Number**|  | 
 **dateFrom** | **Date**|  | 
 **dateTo** | **Date**|  | 
 **groupBy** | [**StatisticGroupBy**](.md)|  | 

### Return type

[**HabitStatisticResponse**](HabitStatisticResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiHabitsHabitIdStatisticTotalGet

> HabitStatisticTotalResponse apiHabitsHabitIdStatisticTotalGet(habitId)

Получение статустики

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesStatisticApi();
let habitId = 56; // Number | 
apiInstance.apiHabitsHabitIdStatisticTotalGet(habitId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **habitId** | **Number**|  | 

### Return type

[**HabitStatisticTotalResponse**](HabitStatisticTotalResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

