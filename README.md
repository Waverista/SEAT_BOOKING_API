# API Specification

### Overview

The SEATTBOOKING API allows users to manage routes, buses, trips, and reservations in a transportation system. Authentication is required for most endpoints using a bearer token.

### Base URL

```
{{url}} (e.g., http://localhost:5000)
```

### Authentication

- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer {{token}}`
- **Endpoints to Obtain Token**:
  - **Register**: `/auth/register`
  - **Login**: `/auth/login`

### Endpoints

#### 1. Routes Management

##### Add Route

- **Method**: POST
- **Endpoint**: `{{url}}routes`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "startPoint": "Matara",
    "endPoint": "Colombo",
    "distance": 115,
    "estimatedTime": "3h 30m",
    "fare": 500
  }
  ```
- **Response**:
  - **201 Created**: Route successfully added.
  - **Example**:
    ```json
    {
      "message": "Route added successfully",
      "route": {
        "id": "676583141f582a5afbeb803c",
        "startPoint": "Matara",
        "endPoint": "Colombo",
        "distance": 115,
        "estimatedTime": "3h 30m",
        "fare": 500
      }
    }
    ```

##### Get One Route

- **Method**: GET
- **Endpoint**: `{{url}}routes/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Details of the route.
  - **Example**:
    ```json
    {
      "id": "676583141f582a5afbeb803c",
      "startPoint": "Matara",
      "endPoint": "Colombo",
      "distance": 115,
      "estimatedTime": "3h 30m",
      "fare": 500
    }
    ```

##### Update Route

- **Method**: PUT
- **Endpoint**: `{{url}}routes/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "startPoint": "Station A",
    "endPoint": "Station C",
    "distance": 20,
    "estimatedTime": "30 minutes",
    "fare": 70
  }
  ```
- **Response**:
  - **200 OK**: Route successfully updated.

##### Delete Route

- **Method**: DELETE
- **Endpoint**: `{{url}}routes/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Route successfully deleted.

##### Get All Routes

- **Method**: GET
- **Endpoint**: `{{url}}routes`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: List of all routes.

#### 2. Bus Management

##### Add Bus

- **Method**: POST
- **Endpoint**: `{{url}}buses`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "busNumber": "B123",
    "operator": "6765bb5122d494393cd637d4",
    "route": "6765bb2c22d494393cd637d1",
    "capacity": 40,
    "trips": [
      {
        "date": "2024-12-25T10:00:00Z",
        "startTime": "10:00 AM",
        "arrivalTime": "02:00 PM",
        "bookedSeats": [1, 2, 3, 4]
      }
    ]
  }
  ```
- **Response**:
  - **201 Created**: Bus successfully added.

##### Update Bus

- **Method**: PUT
- **Endpoint**: `{{url}}buses/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "busNumber": "B123-Updated",
    "operator": "60c72b2f5f1b2c001c8a4d0f",
    "route": "60c72b2f5f1b2c001c8a4d0e",
    "capacity": 45,
    "trips": [
      {
        "date": "2024-12-25T10:00:00Z",
        "startTime": "10:00 AM",
        "arrivalTime": "02:00 PM",
        "bookedSeats": [1, 2, 3, 4, 5]
      }
    ]
  }
  ```
- **Response**:
  - **200 OK**: Bus successfully updated.

##### Delete Bus

- **Method**: DELETE
- **Endpoint**: `{{url}}buses/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Bus successfully deleted.

##### Get All Buses

- **Method**: GET
- **Endpoint**: `{{url}}buses`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: List of all buses.

##### Get One Bus

- **Method**: GET
- **Endpoint**: `{{url}}buses/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Details of the bus.

#### 3. Trip Management

##### Add Trip

- **Method**: POST
- **Endpoint**: `{{url}}buses/:busId/trips`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "date": "2024-12-25T10:00:00Z",
    "startTime": "10:00 AM",
    "arrivalTime": "2:00 PM",
    "bookedSeats": [1, 2, 3]
  }
  ```
- **Response**:
  - **201 Created**: Trip successfully added.

##### Update Trip

- **Method**: PUT
- **Endpoint**: `{{url}}buses/:busId/trips/:tripId`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "date": "2024-12-25T11:00:00Z",
    "startTime": "11:00 AM",
    "arrivalTime": "3:00 PM",
    "bookedSeats": [1, 3, 5]
  }
  ```
- **Response**:
  - **200 OK**: Trip successfully updated.

##### Delete Trip

- **Method**: DELETE
- **Endpoint**: `{{url}}buses/:busId/trips/:tripId`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Trip successfully deleted.

#### 4. Reservation Management

##### Add Reservation

- **Method**: POST
- **Endpoint**: `{{url}}reservations`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "busId": "6765bb7e22d494393cd637d6",
    "tripId": "6765bb7e22d494393cd637d7",
    "seatNumber": 6
  }
  ```
- **Response**:
  - **201 Created**: Reservation successfully added.

##### Update Reservation

- **Method**: PUT
- **Endpoint**: `{{url}}reservations/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Request Body**:
  ```json
  {
    "seatNumber": 7,
    "paymentStatus": "completed"
  }
  ```
- **Response**:
  - **200 OK**: Reservation successfully updated.

##### Get One Reservation

- **Method**: GET
- **Endpoint**: `{{url}}reservations/:id`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Details of the reservation.
 
 ##### Get One Reservation

- **Method**: GET
- **Endpoint**: `{{url}}reservations`
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Response**:
  - **200 OK**: Details of the all reservations.



