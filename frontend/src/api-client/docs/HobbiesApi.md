# AuthApi.HobbiesApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiHabitsGet**](HobbiesApi.md#apiHabitsGet) | **GET** /api/habits | Получить список хобби пользователя
[**apiHabitsHabitIdGet**](HobbiesApi.md#apiHabitsHabitIdGet) | **GET** /api/habits/{habitId} | Получить детали хобби
[**apiHabitsHabitIdPut**](HobbiesApi.md#apiHabitsHabitIdPut) | **PUT** /api/habits/{habitId} | Обновить хобби
[**apiHabitsPost**](HobbiesApi.md#apiHabitsPost) | **POST** /api/habits | Создать новое хобби



## apiHabitsGet

> [Habit] apiHabitsGet()

Получить список хобби пользователя

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesApi();
apiInstance.apiHabitsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Habit]**](Habit.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiHabitsHabitIdGet

> Habit apiHabitsHabitIdGet(habitId)

Получить детали хобби

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesApi();
let habitId = 56; // Number | 
apiInstance.apiHabitsHabitIdGet(habitId, (error, data, response) => {
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

[**Habit**](Habit.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiHabitsHabitIdPut

> apiHabitsHabitIdPut(habitId, habitUpdate)

Обновить хобби

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesApi();
let habitId = 56; // Number | 
let habitUpdate = new AuthApi.HabitUpdate(); // HabitUpdate | 
apiInstance.apiHabitsHabitIdPut(habitId, habitUpdate, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **habitId** | **Number**|  | 
 **habitUpdate** | [**HabitUpdate**](HabitUpdate.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## apiHabitsPost

> Habit apiHabitsPost(newHabit)

Создать новое хобби

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesApi();
let newHabit = new AuthApi.NewHabit(); // NewHabit | 
apiInstance.apiHabitsPost(newHabit, (error, data, response) => {
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
 **newHabit** | [**NewHabit**](NewHabit.md)|  | 

### Return type

[**Habit**](Habit.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

