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

### `POST`  /workouts

> Authentication: Required

| **Parameters** |  |
| -------------- | -------------- |
| **Name**       | **Description** |
| `body *required` | Workout object with the minimal info. |

````json
{
  "name": "Workout name",
  "description": "A sample description"
}

````

| **Responses** |  |
| -------------- | -------------- |
| **Code**       | **Description** |
| `201` | Workout created. | 
```json 
{
  "_id": "workout_id"
}
``` 
|  |  |
| -------------- | -------------- |
| `500` | Internal server error. | 

### `GET`  /workouts

> Authentication: Required
