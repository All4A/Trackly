# AuthApi.HobbiesScoreApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiHabitsHabitIdScorePost**](HobbiesScoreApi.md#apiHabitsHabitIdScorePost) | **POST** /api/habits/{habitId}/score | Записать время, потраченное на хобби



## apiHabitsHabitIdScorePost

> apiHabitsHabitIdScorePost(habitId, scoreHabit)

Записать время, потраченное на хобби

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.HobbiesScoreApi();
let habitId = 56; // Number | 
let scoreHabit = new AuthApi.ScoreHabit(); // ScoreHabit | 
apiInstance.apiHabitsHabitIdScorePost(habitId, scoreHabit, (error, data, response) => {
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
 **scoreHabit** | [**ScoreHabit**](ScoreHabit.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

