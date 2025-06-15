# 📋 Workouts API Documentation

This API provides a set of functionalities to manage workouts, exercises, and logs, allowing users to create, retrieve, update, and modify workouts.

## 🛠️ Technologies Used
- **Node.js** with **Express**
- **MongoDB** with **Mongoose** for data management
- Authentication via **JWT**

## 🔐 Authentication
JWT-based authentication is required to access the API endpoints. Make sure to include the authentication token in the request header:

```bash
Authorization: Bearer <your-token>
```

## 📄 Endpoints

### `POST` /workouts

> Authentication: Required

| **Parameters** |  |
| -------------- | -------------- |
| **Name**       | **Description** |
| `body` (required) | Workout object with the minimal info. |

````json
{
  "name": "Workout name",
  "description": "A sample description"
}

````

| **Responses** |  |  |
| -------------- | -------------- | -------------- |
| **Code**       | **Description** | **Response** |
| `201` | Workout created. | `{"_id": "mongo_id"}` |
| `500` | Internal server error. |

### `GET` /workouts

> Authentication: Required

| **URL Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `page` (optional) | Page number, default value: `1` | Number |
| `limit` (optional) | Number of results per page, default value: `10` | Number |
| `sortBy` (optional) | Field to sort results by, default value: `createdAt` | {field_name} |
| `sort` (optional) | Order of the results, default value: `createdAt` | `asc`, `desc` |
| `date` (optional) | Filter by a specific date. | Date |
| `search` (optional) | Search by workout name. | String |

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `500` | Internal server error. |
| `201` | Workout created. |


````json
[
    {
        "_id": "document_id",
        "userId": "user_mongo_id",
        "name": "string",
        "description": "string",
        "date": "date",
        "status": "string",
        "exercises": [],
        "createdAt": "date",
        "updatedAt": "date",
      },
]
````

### `GET` /workouts/:id

Retrieves a specific workout by its ID, including the details of its exercises.

> Authentication: Required


| **URL Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `id` (required) | The ID of the workout. | Mongo ID |

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `404` | Workout not found. |

| `200` | OK |

````json
{
    "_id": "document_id",
    "userId": "user_mongo_id",
    "name": "string",
    "description": "string",
    "date": "date",
    "status": "string",
    "exercises": [],
    "createdAt": "date",
    "updatedAt": "date",
}
````

### `POST` /workouts/{id}/exercises

Adds an exercise to the specified workout.

> Authentication: Required

| **URL Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `id` (required) | The ID of the workout. | Mongo ID |

| **Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `body` (required) | The ID of the workout. | Mongo ID |

````json
{
  "data": "exercise_mongo_id",
  "sets": 0,
  "reps": 0,
  "rest": {
    "min": 0,
    "max": 0
  },
  "rir": {
    "min": 0,
    "max": 0
  },
  "notes": "string"
}
````

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `200` | OK. |

````json
{
  "_id": "exercise-workout_mongo_id"
}
````

### `POST` /workouts/:id/exercises/:exerciseId/logs

Adds a log to an exercise within the workout.

> Authentication: Required

| **URL Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `id` (required) | The ID of the workout. | Mongo ID |
| `exerciseId` (required) | The ID of the exercise-workout. | Mongo ID |

| **Parameters** |  |
| -------------- | -------------- |
| **Name**       | **Description** |
| `body` (required) | Log object with the minimal info.|

````json
{
  "set": 4,
  "date": "string",
  "weight": 40,
  "reps": 8,
  "rir": {
    "min": 1,
    "max": 2
  },
  "time": 3000,
  "rest": 60
}
````

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `200` | OK. |

````json
{
  "_id": "log_mongo_id"
}
````

### `PATCH` /workouts/:id/status

Updates the status of a workout.

| **URL Parameters** |  |  | 
| -------------- | -------------- |  -------------- |
| **Name**       | **Description** |  **Admited values** |
| `id` (required) | The ID of the workout. | Mongo ID |

| **Parameters** |  |
| -------------- | -------------- |
| **Name**       | **Description** |
| `body` (required) | Log object with the minimal info.|

````json
{
  "status": "completed"
}
````

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `400` | Bad request: Invalid status. |
| `200` | OK. |

````json
{
  "_id": "workout_mongo_id"
}
````

## 📚 Data Models

<details><summary><a>Workout</a></summary>

````json
{
   "example"
}
````

</details>

<details><summary><a>Exercise</a></summary>

````json
{
   "example"
}
````

</details>

<details><summary><a>Log</a></summary>

````json
{
   "example"
}
````

</details>