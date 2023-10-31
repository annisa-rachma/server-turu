# Lodging API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-signin`
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-signin`
- `GET /pub/lodgings`
- `GET /pub/lodgings/:id`
- `GET /pub/types`

Routes below need authentication

- `GET /pub/bookmarks`
- `POST /pub/bookmarks/:LodgingId`
- `DELETE /pub/bookmarks/:id`
- `GET /lodgings`
- `POST /lodgings`
- `GET /lodgings/:id`
- `GET /types`
- `POST /types`
- `GET /types/:id`
- `PUT /types/:id`
- `DELETE /types/:id`
- `GET /histories`

Routes below need authorization

- `PUT /lodgings/:id`
- `PATCH /lodgings/:id`
- `DELETE /lodgings/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "succesfully registered",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "minimum password length is 5 character"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password cannot empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /google-signin

Description:

- If the email has not been registered, it will be registered as a staff. If it is already registered, it will serve as a login.

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string",
  "role": "string"
}
```

&nbsp;

## 4. POST /pub/register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "succesfully registered"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "minimum password length is 5 character"
}
```

&nbsp;

## 5. POST /pub/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "imageUrl": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password cannot empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 6. POST /pub/google-signin

Request:

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "imageUrl": "string"
}
```

&nbsp;

## 7. GET /pub/lodgings

Description:

- Get all active lodgings from database

Request:
- query : 
```json
{
  "filter": "string",
  "search": "string",
  "page": "string"
}
```

_Response (200 - OK)_

```json
{
  "total": 8,
  "lodging":[
      ...,
      {
      "id": 1,
      "name": "THE 1O1 Yogyakarta Tugu Hotel",
      "facility": "Restaurant, Swimming pool, Fitness Center, Lounge",
      "roomCapacity": 100,
      "imgUrl": "https://gudeg.net/cni-content/uploads/modules/direktori/logo/20161124093438.jpg",
      "authorId": 1,
      "location": "Jl. Margoutomo 103 (Jl. Mangkubumi), Jetis, Yogyakarta, Yogyakarta Province, Indonesia, 55232",
      "price": 1533000,
      "typeId": 1,
      "status": "Active",
      "Type": {
        "id": 1,
        "name": "Hotel"
      }
      },
      ...,
  ]
}

```

&nbsp;

## 8. GET /pub/lodgings/:id

Description:

- Find specific lodging data by id

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "THE 1O1 Yogyakarta Tugu Hotel",
  "facility": "Restaurant, Swimming pool, Fitness Center, Lounge",
  "roomCapacity": 100,
  "imgUrl": "https://gudeg.net/cni-content/uploads/modules/direktori/logo/20161124093438.jpg",
  "authorId": 1,
  "location": "Jl. Margoutomo 103 (Jl. Mangkubumi), Jetis, Yogyakarta, Yogyakarta Province, Indonesia, 55232",
  "price": 1533000,
  "typeId": 1,
  "status": "Active",
  "Type": {
    "id": 1,
    "name": "Hotel"
  },
  "qr": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 9. GET /pub/types

Description:

- Get all type from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{ "types" : [
      ...,
       {
        "id": 1,
        "name": "Hotel",
        "createdAt": "2023-09-28T11:13:03.528Z",
        "updatedAt": "2023-09-28T11:13:03.528Z"
      },
      ...,
  ]

}
```

&nbsp;
## 10. GET /pub/bookmarks

Description:

- Get all bookmarks from the current customer's bookmarks data

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    ...,
    {
    "id": 2,
    "LodgingId": 2,
    "CustomerId": 1,
    "Lodging": {
      "id": 2,
      "name": "Amanjiwo",
      "facility": "Spa, Private swimming pool, Boutique, Garden, Hill",
      "roomCapacity": 33,
      "imgUrl": "https://www.trailsofindochina.com/wp-content/uploads/2018/07/1-1.jpg",
      "authorId": 1,
      "location": "Ds. Majaksingi, Borobudur, Central Java, Indonesia",
      "price": 17000000,
      "typeId": 4,
      "status": "Active",
      "Type": {
        "id": 4,
        "name": "Resort"
      }
    }
  },
    ...,
]

```

&nbsp;

## 11. POST /pub/bookmarks/:LodgingId

Description:

- Adding new bookmark to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "LodgingId": "integer"
}
```

_Response (201 - Created)_
```json
{
  "id": 7,
  "CustomerId": 8,
  "LodgingId": 1
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Lodging already bookmarked"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Lodging not found"
}
```
&nbsp;

## 12. DELETE /pub/bookmarks/:id

Description:

- deleting bookmark

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (201 - Created)_
```json
{
  "message": "success to delete"
}
```
&nbsp;

## 13. GET /lodgings

Description:

- Get all lodgings from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "lodging": [
    ...,
    {
      "name": "Corinthia Budapest",
      "facility": "Conference Hall, Indoor swimming pool",
      "roomCapacity": 100,
      "imgUrl": "https://www.corinthia.com/media/2951/corinthia-budapest-exterior.jpg",
      "authorId": 2,
      "location": "Budapest, Erzsébet körút 43-49., Hungary",
      "price": 1500,
      "typeId": 1,
      "status": "Active",
      "createdAt": "2023-10-02T09:53:02.238Z",
      "updatedAt": "2023-10-02T09:53:02.238Z"
    },
    ...,
  ]
}
```

&nbsp;

## 14. POST /lodgings

Description:

- Adding new lodgings to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "facility": "string",
  "roomCapacity": "integer",
  "imgUrl": "string",
  "authorId": "integer",
  "location": "string",
  "price": "integer",
  "typeId": "integer",
  "status": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Successfully added lodging with name ${lodgingAdded.name}",
  "lodgingAdded": {
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "authorId": "integer",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Facility is required"
}
OR
{
  "message": "Room Capacity is required"
}
OR
{
  "message": "Image is required"
}
OR
{
  "message": "Invalid url format"
}
OR
{
  "message": "Location is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 10"
}
```

&nbsp;

## 15. PUT /lodgings/:id

Description:

- Edit lodging data

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "facility": "string",
  "roomCapacity": "integer",
  "imgUrl": "string",
  "location": "string",
  "price": "integer",
  "typeId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Succesfully edited lodging with id 41"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Facility is required"
}
OR
{
  "message": "Room Capacity is required"
}
OR
{
  "message": "Image is required"
}
OR
{
  "message": "Invalid url format"
}
OR
{
  "message": "Location is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 10"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 16. PATCH /lodgings/:id

Description:

- Edit lodging's status

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Succesfully edited status with id 41"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 17. GET /lodgings/:id

Description:

- Find specific lodging data by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "lodging": {
    "name": "Corinthia Budapest",
    "facility": "Conference Hall, Indoor swimming pool",
    "roomCapacity": 100,
    "imgUrl": "https://www.corinthia.com/media/2951/corinthia-budapest-exterior.jpg",
    "authorId": 2,
    "location": "Budapest, Erzsébet körút 43-49., Hungary",
    "price": 1500,
    "typeId": 1,
    "createdAt": "2023-10-02T09:53:02.238Z",
    "updatedAt": "2023-10-02T09:53:02.238Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Lodging not found"
}
```
&nbsp;

## 18. DELETE /lodgings/:id

Description:

- Delete lodging by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "success to delete ${lodging.name}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 19. GET /types

Description:

- Get all type from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{ "types" : [
      ...,
       {
        "id": 1,
        "name": "Hotel",
        "createdAt": "2023-09-28T11:13:03.528Z",
        "updatedAt": "2023-09-28T11:13:03.528Z"
      },
      ...,
  ]

}
```

&nbsp;

## 20. POST /types

Description:

- Adding new types to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Successfully added new type",
  "typeAdded": {
    "id": 9,
    "name": "Apartment",
    "updatedAt": "2023-10-09T09:40:52.565Z",
    "createdAt": "2023-10-09T09:40:52.565Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "type is required"
}
```

&nbsp;

## 21. GET /types/:id

Description:

- Find specific type data by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "type": {
    "id": 1,
    "name": "Camping",
    "createdAt": "2023-10-03T08:44:58.433Z",
    "updatedAt": "2023-10-09T06:41:12.756Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Lodging not found"
}
```

## 22. PUT /types/:id

Description:

- Edit types

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer"
}
```
- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Succesfully edited type with id 9"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "type is required"
}
```

&nbsp;

## 23. DELETE /types/:id

Description:

- Delete types by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "success to delete type with id 9"
}
```

&nbsp;

## 24. GET /histories

Description:

- Get all histories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "histories": [
    ...,
    {
      "id": 3,
      "lodgingName": "test7",
      "description": "Entity status with id 41 has been updated from Active into Archived",
      "updatedBy": "ab@mail.com",
      "createdAt": "2023-10-09T08:35:45.902Z",
      "updatedAt": "2023-10-09T08:35:45.902Z"
    },
    ...
  ]
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```
