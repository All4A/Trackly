# AuthApi.UsersApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsersAvatarPost**](UsersApi.md#apiUsersAvatarPost) | **POST** /api/users/avatar | Загрузить аватар
[**apiUsersProfileGet**](UsersApi.md#apiUsersProfileGet) | **GET** /api/users/profile | Получить профиль пользователя
[**apiUsersProfilePut**](UsersApi.md#apiUsersProfilePut) | **PUT** /api/users/profile | Обновить профиль пользователя



## apiUsersAvatarPost

> apiUsersAvatarPost(opts)

Загрузить аватар

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.UsersApi();
let opts = {
  'file': "/path/to/file" // File | 
};
apiInstance.apiUsersAvatarPost(opts, (error, data, response) => {
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
 **file** | **File**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: Not defined


## apiUsersProfileGet

> UserProfile apiUsersProfileGet()

Получить профиль пользователя

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.UsersApi();
apiInstance.apiUsersProfileGet((error, data, response) => {
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

[**UserProfile**](UserProfile.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersProfilePut

> apiUsersProfilePut(userProfileUpdate)

Обновить профиль пользователя

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new AuthApi.UsersApi();
let userProfileUpdate = new AuthApi.UserProfileUpdate(); // UserProfileUpdate | 
apiInstance.apiUsersProfilePut(userProfileUpdate, (error, data, response) => {
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
 **userProfileUpdate** | [**UserProfileUpdate**](UserProfileUpdate.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

