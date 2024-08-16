# API Docs

Here is the documentation for the "Register" API endpoint:

---

## Register Endpoint

### URL

`/backend/register.php`

### Method

`POST`

### Description

Registers a new user with a username, email, and password.

### Request Headers

- `Content-Type: application/json`

### Request Body

The request body should be a JSON object containing the following fields:

- `username` (string, required): The desired username for the new user.
- `email` (string, required): The email address of the new user.
- `password` (string, required): The password for the new user.

#### Example Request Body

```json
{
    "username": "exampleUser",
    "email": "example@example.com",
    "password": "examplePassword"
}
```

### Response

The response will be a JSON object indicating the success or failure of the registration process.

#### Success Response

If the registration is successful, the response will contain:

- `success` (boolean): `true`
- `message` (string): Success message.

#### Example Success Response

```json
{
    "success": true,
    "message": "User registered successfully."
}
```

#### Error Responses

If the registration fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. Missing required fields:

    ```json
    {
        "success": false,
        "message": "Missing required fields."
    }
    ```

2. Invalid email format:

    ```json
    {
        "success": false,
        "message": "Invalid email format."
    }
    ```

3. Invalid request method (not POST):

    ```json
    {
        "success": false,
        "message": "Invalid request method."
    }
    ```

### Additional Notes

- All input data is sanitized to avoid code injection and spam.
- The email is validated to ensure it follows the proper format.
- Passwords are hashed using `password_hash` for security before storing them in the database.
- The database connection is closed after the operation is complete.

---

====================================================================================================

"Login" API endpoint:

---

## Login Endpoint

### URL

`/backend/login.php`

### Method

`POST`

### Description

Authenticates a user using an identifier (username or email) and password.

### Request Headers

- `Content-Type: application/json`

### Request Body

The request body should be a JSON object containing the following fields:

- `identifier` (string, required): The username or email of the user.
- `password` (string, required): The password of the user.

#### Example Request Body

```json
{
    "identifier": "exampleUser",
    "password": "examplePassword"
}
```

### Response

The response will be a JSON object indicating the success or failure of the login attempt.

#### Success Response

If the login is successful, the response will contain the appropriate user details and a success message. (Note: The exact structure of a successful response may vary based on implementation.)

#### Example Success Response

```json
{
    "success": true,
    "message": "Login successful.",
    "userData": {
        "username": "exampleUser",
        "email": "example@example.com",
        // additional user data as needed
    }
}
```

#### Error Responses

If the login fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. Missing required fields:

    ```json
    {
        "success": false,
        "message": "Missing required fields."
    }
    ```

2. Invalid request method (not POST):

    ```json
    {
        "success": false,
        "message": "Invalid request method. Use POST."
    }
    ```

### Additional Notes

- All input data is sanitized to avoid code injection and spam.
- The database connection is closed after the operation is complete.

---

===================================================================================

Here is the documentation for the "Get All Categories" API endpoint:

---

## Get All Categories Endpoint

### URL

`/backend/getAllCategories.php`

### a

`GET`

### Description

Fetches all categories from the database.

### Request Headers

- `Content-Type: application/json`

### Request Parameters

None.

### Response

The response will be a JSON object indicating the success or failure of the request, along with the category details if available.

#### Success Response

If categories are found, the response will contain:

- `success` (boolean): `true`
- `categories` (array): An array of category objects
  - `category_id` (int): The category ID
  - `category_name` (string): The category name
  - `add_date` (string): The date the category was added

#### Example Success Response

```json
{
    "success": true,
    "categories": [
        {
            "category_id": 1,
            "category_name": "Electronics",
            "add_date": "2023-01-01"
        },
        {
            "category_id": 2,
            "category_name": "Books",
            "add_date": "2023-01-05"
        }
    ]
}
```

#### Error Responses

If the request fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. No categories found:

    ```json
    {
        "success": false,
        "message": "No categories found."
    }
    ```

2. Database error:

    ```json
    {
        "success": false,
        "message": "Database error."
    }
    ```

### Additional Notes

- The database connection is closed after the operation is complete.
- If no categories are found, an appropriate message is returned.

---

================================================================================

Here is the documentation for the "Update Vendor" API endpoint:

---

## Update Vendor Endpoint

### URL

`/backend/updateVendor.php`

### Method

`POST`

### Description

Updates the vendor's information based on the provided user ID, profile picture, and other details.

### Request Headers

- `Content-Type: application/json`

### Request Parameters

The request body should include the following fields:

- `user_id` (int, required): The user ID of the vendor.
- `profile_pic` (file, optional): The profile picture file to be uploaded.
- `phone_number` (string, optional): The phone number of the vendor.
- `state` (string, optional): The state where the vendor is located.
- `address` (string, optional): The address of the vendor.
- `localgovt` (string, optional): The local government area.
- `city` (string, optional): The city.
- `sex` (string, optional): The sex of the vendor.
- `birth` (string, optional): The birth date of the vendor.
- `nin` (string, optional): The National Identification Number.
- `firstname` (string, optional): The first name of the vendor.
- `lastname` (string, optional): The last name of the vendor.

#### Example Request Body (Form Data)

```plaintext
user_id: 1
profile_pic: (file)
phone_number: 1234567890
state: State
address: 123 Main St
localgovt: Local Govt
city: City
sex: M
birth: 1990-01-01
nin: 123456789
firstname: John
lastname: Doe
```

### Response

The response will be a JSON object indicating the success or failure of the request.

#### Success Response

If the vendor information is updated successfully, the response will contain:

- `success` (boolean): `true`
- `message` (string): Success message.

#### Example Success Response

```json
{
    "success": true,
    "message": "Vendor information has been updated successfully."
}
```

#### Error Responses

If the request fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. Missing required fields or file upload error:

    ```json
    {
        "success": false,
        "message": "Missing required fields or file upload error."
    }
    ```

2. Invalid request method (not POST):

    ```json
    {
        "success": false,
        "message": "Invalid request method."
    }
    ```

3. Database error:

    ```json
    {
        "success": false,
        "message": "Database error."
    }
    ```

4. Failed to create upload directory:

    ```json
    {
        "success": false,
        "message": "Failed to create upload directory."
    }
    ```

5. Upload directory is not writable:

    ```json
    {
        "success": false,
        "message": "Upload directory is not writable."
    }
    ```

6. Failed to upload profile picture:

    ```json
    {
        "success": false,
        "message": "Failed to upload profile picture."
    }
    ```

### Additional Notes

- The profile picture path is converted to a URL.
- The database connection is closed after the operation is complete.
- The profile picture file is uploaded to a specific directory on the server.

---

====================================================================================

Here is the documentation for the "Add Rental Item" API endpoint:

---

## Add Rental Item Endpoint

### URL

`/backend/addRentalItem.php`

### Method

`POST`

### Description

Adds a new rental item along with an image and other relevant details.

### Request Headers

- `Content-Type: application/json`

### Request Parameters

The request body should include the following fields:

- `category` (string, required): The category of the rental item.
- `ItemName` (string, required): The name of the rental item.
- `Description` (string, required): A description of the rental item.
- `Price` (float, required): The price of the rental item.
- `Availability` (string, required): The availability status of the rental item.
- `vendor_id` (int, required): The ID of the vendor adding the item.
- `Video` (string, optional): A video URL for the rental item.
- `number_of_items` (int, required): The number of items available for rent.
- `images` (file, required): An image file for the rental item.
- `location` (string, required): The location of the rental item.

#### Example Request Body (Form Data)

```plaintext
category: Electronics
itemName: Projector
description: High-quality projector for rent
price: 50.00
availability: Available
vendor_id: 123
video: http://example.com/video.mp4
number_of_items: 5
images: (file)
item_location: New York
```

### Response

The response will be a JSON object indicating the success or failure of the request.

#### Success Response

If the rental item is added successfully, the response will contain:

- `success` (boolean): `true`
- `message` (string): Success message.

#### Example Success Response

```json
{
    "success": true,
    "message": "Rental item and image added successfully."
}
```

#### Error Responses

If the request fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. Missing required fields or file upload error:

    ```json
    {
        "success": false,
        "message": "Missing required fields or file upload error."
    }
    ```

2. Invalid request method (not POST):

    ```json
    {
        "success": false,
        "message": "Invalid request method."
    }
    ```

3. No file uploaded or invalid file upload:

    ```json
    {
        "success": false,
        "message": "No file uploaded or invalid file upload."
    }
    ```

4. Failed to create upload directory:

    ```json
    {
        "success": false,
        "message": "Failed to create upload directory."
    }
    ```

5. Upload directory is not writable:

    ```json
    {
        "success": false,
        "message": "Upload directory is not writable."
    }
    ```

6. Failed to upload image:

    ```json
    {
        "success": false,
        "message": "Failed to upload image."
    }
    ```

7. Failed to add rental item:

    ```json
    {
        "success": false,
        "message": "Failed to add rental item."
    }
    ```

8. Failed to add image path:

    ```json
    {
        "success": false,
        "message": "Failed to add image path."
    }
    ```

### Additional Notes

- The profile picture path is converted to a URL.
- The database connection is closed after the operation is complete.
- The profile picture file is uploaded to a specific directory on the server.
- The function checks if a unique identifier (slogo) already exists before adding the item.
- The rental item is added first, and then the image path is added to the database.

---

Here is the documentation for the "Get Rental Items" API endpoint:

---

## Get Rental Items Endpoint

### URL

`/backend/getRentalItems.php`

### Method

`GET`

### Description

Retrieves a paginated list of rental items, optionally filtered by category.

### Request Headers

- `Content-Type: application/json`

### Request Parameters

The request parameters should be provided as query parameters in the URL:

- `page` (int, optional): The page number for pagination (default is 1).
- `category_id` (int, optional): The ID of the category to filter items by.

#### Example Request URL

- Retrieve all items (page 1):

  ```
  /backend/getRentalItems.php?page=1
  ```

- Retrieve items from a specific category (page 1):

  ```
  /backend/getRentalItems.php?page=1&category_id=5
  ```

### Response

The response will be a JSON object indicating the success or failure of the request, along with the rental items data if successful.

#### Success Response

If rental items are retrieved successfully, the response will contain:

- `success` (boolean): `true`
- `data` (array): An array of rental items, each containing:
  - `ItemName` (string): The name of the item.
  - `category` (string): The category of the item.
  - `Description` (string): The description of the item.
  - `Price` (float): The price of the item.
  - `Availability` (string): The availability status of the item.
  - `user_id` (int): The ID of the vendor.
  - `Video` (string): The video URL for the item.
  - `number_of_items` (int): The number of items available.
  - `location` (string): The location of the item.
  - `slogo` (string): The unique identifier for the item.
  - `images` (array): An array of image paths for the item.

#### Example Success Response

```json
{
    "success": true,
    "data": [
        {
            "ItemName": "Projector",
            "category": "Electronics",
            "Description": "High-quality projector for rent",
            "Price": 50.00,
            "Availability": "Available",
            "user_id": 123,
            "Video": "http://example.com/video.mp4",
            "number_of_items": 5,
            "location": "New York",
            "slogo": "Projector-123",
            "images": [
                "/rent24ng/backend/inc/uploads/rental_items/image1.jpg",
                "/rent24ng/backend/inc/uploads/rental_items/image2.jpg"
            ]
        }
    ]
}
```

#### Error Responses

If the request fails, the response will contain:

- `success` (boolean): `false`
- `message` (string): Error message explaining the reason for the failure.

##### Example Error Responses

1. Invalid request method (not GET):

    ```json
    {
        "success": false,
        "message": "Invalid request method."
    }
    ```

2. Failed to retrieve rental items:

    ```json
    {
        "success": false,
        "message": "Failed to retrieve rental items."
    }
    ```

### Additional Notes

- The function supports pagination, with 20 items per page.
- When retrieving rental items by category, the category ID must be provided.
- The database connection is closed after the operation is complete.
- The function ensures that each rental item is returned with its associated images.

---

====================================================================================================

### API Documentation for `rentItem` Endpoint

#### Endpoint URL

```
POST /backend/rentitem.php
```

#### Description

This endpoint allows users to rent an item by providing necessary details.

#### Request Body

The request body should be sent as a JSON object with the following fields:

- `paymentId` (string, required): Unique identifier for the payment.
- `startDate` (string, required): Start date of the rental period (format: YYYY-MM-DD).
- `endDate` (string, required): End date of the rental period (format: YYYY-MM-DD).
- `quantity` (integer, required): Quantity of items to rent.
- `itemId` (integer, required): ID of the item being rented.
- `userId` (integer, required): ID of the user renting the item.
- `vendorId` (integer, required): ID of the vendor providing the item.
- `totalPrice` (number, required): Total price of the rental transaction.

#### Example Request

```json
{
    "paymentId": "PAY123456789",
    "startDate": "2024-07-05",
    "endDate": "2024-07-10",
    "quantity": 2,
    "itemId": 123,
    "userId": 456,
    "vendorId": 789,
    "totalPrice": 150.00
}
```

#### Response

The API returns a JSON response indicating the success or failure of the operation:

- `success` (boolean): Indicates whether the operation was successful.
- `message` (string): A message providing additional information about the operation.

##### Success Response Example

```json
{
    "success": true,
    "message": "Item rented successfully."
}
```

##### Error Response Examples

- Missing required fields:

```json
{
    "success": false,
    "message": "Missing required fields."
}
```

- Invalid date format:

```json
{
    "success": false,
    "message": "Invalid date format."
}
```

- Failed to rent item (database error, etc.):

```json
{
    "success": false,
    "message": "Failed to rent item."
}
```

#### Error Codes

- `400 Bad Request`: Missing required fields, invalid input format.
- `500 Internal Server Error`: Server-side errors, such as database failures.

#### Notes

- Dates (`startDate` and `endDate`) must be provided in `YYYY-MM-DD` format.
- Prices (`totalPrice`) should be provided as a floating-point number.

#### Example Usage

##### Using cURL

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "paymentId": "PAY123456789",
    "startDate": "2024-07-05",
    "endDate": "2024-07-10",
    "quantity": 2,
    "itemId": 123,
    "userId": 456,
    "vendorId": 789,
    "totalPrice": 150.00
}' http://example.com/backend/rentitem.php
```

##### Using JavaScript (Fetch API)

```javascript
fetch('http://example.com/backend/rentitem.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        paymentId: 'PAY123456789',
        startDate: '2024-07-05',
        endDate: '2024-07-10',
        quantity: 2,
        itemId: 123,
        userId: 456,
        vendorId: 789,
        totalPrice: 150.00,
    }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```




# Rentals Transaction API Documentation

## Overview
The `backend/rentalsTransaction.php` provides endpoints to retrieve rental transaction details based on user or vendor IDs. The API supports pagination and returns data in JSON format.

## Base URL
```
http://yourdomain.com/backend/rentalsTransaction.php
```

## HTTP Methods
- `GET` - Retrieve rental transaction data.

## Endpoints

### 1. Get Rental Transactions by User ID
Retrieve rental transactions for a specific user.

**Endpoint:**
```
GET /backend/rentalsTransaction.php?user_id={user_id}
```

**Query Parameters:**
- `user_id` (optional): The ID of the user whose transactions you want to retrieve.
- `page` (optional): The page number for pagination (default is `1`).

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "payment_id": "ABC123",
            "start_date": "2024-01-01",
            "end_date": "2024-01-07",
            "quantity": 2,
            "ItemName": "Camera",
            "user_firstname": "John",
            "user_lastname": "Doe",
            "vendor_firstname": "Alice",
            "vendor_lastname": "Smith",
            "total_price": "500.00",
            "status": "Approved"
        },
        ...
    ]
}
```

### 2. Get Rental Transactions by Vendor ID
Retrieve rental transactions for a specific vendor.

**Endpoint:**
```
GET /backend/rentalsTransaction.php?vendor_id={vendor_id}
```

**Query Parameters:**
- `vendor_id` (optional): The ID of the vendor whose transactions you want to retrieve.
- `page` (optional): The page number for pagination (default is `1`).

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "payment_id": "XYZ456",
            "start_date": "2024-02-01",
            "end_date": "2024-02-05",
            "quantity": 1,
            "ItemName": "Projector",
            "user_firstname": "Jane",
            "user_lastname": "Smith",
            "vendor_firstname": "Bob",
            "vendor_lastname": "Johnson",
            "total_price": "150.00",
            "status": "Pending"
        },
        ...
    ]
}
```

### 3. Get All Rental Transactions (Paginated)
Retrieve all rental transactions, with support for pagination.

**Endpoint:**
```
GET /backend/rentalsTransaction.php
```

**Query Parameters:**
- `page` (optional): The page number for pagination (default is `1`).

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "payment_id": "LMN789",
            "start_date": "2024-03-10",
            "end_date": "2024-03-15",
            "quantity": 3,
            "ItemName": "Sound System",
            "user_firstname": "Jake",
            "user_lastname": "White",
            "vendor_firstname": "Anna",
            "vendor_lastname": "Lee",
            "total_price": "300.00",
            "status": "Approved"
        },
        ...
    ]
}
```

## Error Handling

If an invalid request method is used or the request cannot be processed, the API will return an error response:

**Response:**
```json
{
    "success": false,
    "message": "Invalid request method."
}
```

## Example Requests

### 1. Retrieve Transactions for a User (User ID: 123)
```sh
GET /backend/rentalsTransaction.php?user_id=123
```

### 2. Retrieve Transactions for a Vendor (Vendor ID: 456)
```sh
GET /backend/rentalsTransaction.php?vendor_id=456
```

### 3. Retrieve All Transactions (Page 2)
```sh
GET /backend/rentalsTransaction.php?page=2
```

---

### Notes for the Frontend Developer:
- **Pagination**: If you want to retrieve the next set of transactions, increment the `page` parameter in the request.
- **Handling Responses**: Always check the `success` field in the response to ensure the request was successful.
- **Error Handling**: Ensure proper error handling on the frontend by checking the `message` field in case of an error response.

This documentation should now provide the frontend developer with the necessary details to work with the `rentalsTransaction` API.