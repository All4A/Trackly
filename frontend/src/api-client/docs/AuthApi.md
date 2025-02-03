# AuthApi.AuthApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthLoginPost**](AuthApi.md#apiAuthLoginPost) | **POST** /api/auth/login | Вход пользователя
[**apiAuthRegisterPost**](AuthApi.md#apiAuthRegisterPost) | **POST** /api/auth/register | Регистрация нового пользователя



## apiAuthLoginPost

> LoginResponse apiAuthLoginPost(loginRequest)

Вход пользователя

Аутентифицирует пользователя и возвращает JWT токен

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.AuthApi();
let loginRequest = new AuthApi.LoginRequest(); // LoginRequest | 
apiInstance.apiAuthLoginPost(loginRequest, (error, data, response) => {
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
 **loginRequest** | [**LoginRequest**](LoginRequest.md)|  | 

### Return type

[**LoginResponse**](LoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthRegisterPost

> ApiAuthRegisterPost200Response apiAuthRegisterPost(registerRequest)

Регистрация нового пользователя

Регистрирует нового пользователя и возвращает статус \&quot;ok\&quot;

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.AuthApi();
let registerRequest = new AuthApi.RegisterRequest(); // RegisterRequest | 
apiInstance.apiAuthRegisterPost(registerRequest, (error, data, response) => {
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
 **registerRequest** | [**RegisterRequest**](RegisterRequest.md)|  | 

### Return type

[**ApiAuthRegisterPost200Response**](ApiAuthRegisterPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

