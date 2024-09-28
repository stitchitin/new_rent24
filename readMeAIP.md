# API Docs

Here is the documentation for the "Register" API endpoint:

---
# Table of Content
- [API Documentation for `sendMessage` API](#api-documentation-for-sendMessage-api)

## Register Endpoint

### URL

`/backend/register.php`

### Method

`POST`

### Description

Registers a new user with a username, email, and password.

### Request Headers

-  `Content-Type: application/json`

### Request Body

The request body should be a JSON object containing the following fields:

-  `username` (string, required): The desired username for the new user.
-  `email` (string, required): The email address of the new user.
-  `password` (string, required): The password for the new user.

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

-  `success` (boolean): `true`
-  `message` (string): Success message.

#### Example Success Response

```json
{
	"success": true,
	"message": "User registered successfully."
}
```

#### Error Responses

If the registration fails, the response will contain:

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  All input data is sanitized to avoid code injection and spam.
-  The email is validated to ensure it follows the proper format.
-  Passwords are hashed using `password_hash` for security before storing them in the database.
-  The database connection is closed after the operation is complete.

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

-  `Content-Type: application/json`

### Request Body

The request body should be a JSON object containing the following fields:

-  `identifier` (string, required): The username or email of the user.
-  `password` (string, required): The password of the user.

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
		"email": "example@example.com"
		// additional user data as needed
	}
}
```

#### Error Responses

If the login fails, the response will contain:

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  All input data is sanitized to avoid code injection and spam.
-  The database connection is closed after the operation is complete.

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

-  `Content-Type: application/json`

### Request Parameters

None.

### Response

The response will be a JSON object indicating the success or failure of the request, along with the category details if available.

#### Success Response

If categories are found, the response will contain:

-  `success` (boolean): `true`
-  `categories` (array): An array of category objects
   -  `category_id` (int): The category ID
   -  `category_name` (string): The category name
   -  `add_date` (string): The date the category was added

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

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  The database connection is closed after the operation is complete.
-  If no categories are found, an appropriate message is returned.

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

-  `Content-Type: application/json`

### Request Parameters

The request body should include the following fields:

-  `user_id` (int, required): The user ID of the vendor.
-  `profile_pic` (file, optional): The profile picture file to be uploaded.
-  `phone_number` (string, optional): The phone number of the vendor.
-  `state` (string, optional): The state where the vendor is located.
-  `address` (string, optional): The address of the vendor.
-  `localgovt` (string, optional): The local government area.
-  `city` (string, optional): The city.
-  `sex` (string, optional): The sex of the vendor.
-  `birth` (string, optional): The birth date of the vendor.
-  `nin` (string, optional): The National Identification Number.
-  `firstname` (string, optional): The first name of the vendor.
-  `lastname` (string, optional): The last name of the vendor.

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

-  `success` (boolean): `true`
-  `message` (string): Success message.

#### Example Success Response

```json
{
	"success": true,
	"message": "Vendor information has been updated successfully."
}
```

#### Error Responses

If the request fails, the response will contain:

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  The profile picture path is converted to a URL.
-  The database connection is closed after the operation is complete.
-  The profile picture file is uploaded to a specific directory on the server.

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

-  `Content-Type: application/json`

### Request Parameters

The request body should include the following fields:

-  `category` (string, required): The category of the rental item.
-  `ItemName` (string, required): The name of the rental item.
-  `Description` (string, required): A description of the rental item.
-  `Price` (float, required): The price of the rental item.
-  `Availability` (string, required): The availability status of the rental item.
-  `vendor_id` (int, required): The ID of the vendor adding the item.
-  `Video` (string, optional): A video URL for the rental item.
-  `number_of_items` (int, required): The number of items available for rent.
-  `images` (file, required): An image file for the rental item.
-  `location` (string, required): The location of the rental item.

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

-  `success` (boolean): `true`
-  `message` (string): Success message.

#### Example Success Response

```json
{
	"success": true,
	"message": "Rental item and image added successfully."
}
```

#### Error Responses

If the request fails, the response will contain:

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  The profile picture path is converted to a URL.
-  The database connection is closed after the operation is complete.
-  The profile picture file is uploaded to a specific directory on the server.
-  The function checks if a unique identifier (slogo) already exists before adding the item.
-  The rental item is added first, and then the image path is added to the database.

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

-  `Content-Type: application/json`

### Request Parameters

The request parameters should be provided as query parameters in the URL:

-  `page` (int, optional): The page number for pagination (default is 1).
-  `category_id` (int, optional): The ID of the category to filter items by.

#### Example Request URL

-  Retrieve all items (page 1):

   ```
   /backend/getRentalItems.php?page=1
   ```

-  Retrieve items from a specific category (page 1):

   ```
   /backend/getRentalItems.php?page=1&category_id=5
   ```

### Response

The response will be a JSON object indicating the success or failure of the request, along with the rental items data if successful.

#### Success Response

If rental items are retrieved successfully, the response will contain:

-  `success` (boolean): `true`
-  `data` (array): An array of rental items, each containing:
   -  `ItemName` (string): The name of the item.
   -  `category` (string): The category of the item.
   -  `Description` (string): The description of the item.
   -  `Price` (float): The price of the item.
   -  `Availability` (string): The availability status of the item.
   -  `user_id` (int): The ID of the vendor.
   -  `Video` (string): The video URL for the item.
   -  `number_of_items` (int): The number of items available.
   -  `location` (string): The location of the item.
   -  `slogo` (string): The unique identifier for the item.
   -  `images` (array): An array of image paths for the item.

#### Example Success Response

```json
{
	"success": true,
	"data": [
		{
			"ItemName": "Projector",
			"category": "Electronics",
			"Description": "High-quality projector for rent",
			"Price": 50.0,
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

-  `success` (boolean): `false`
-  `message` (string): Error message explaining the reason for the failure.

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

-  The function supports pagination, with 20 items per page.
-  When retrieving rental items by category, the category ID must be provided.
-  The database connection is closed after the operation is complete.
-  The function ensures that each rental item is returned with its associated images.

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

-  `paymentId` (string, required): Unique identifier for the payment.
-  `startDate` (string, required): Start date of the rental period (format: YYYY-MM-DD).
-  `endDate` (string, required): End date of the rental period (format: YYYY-MM-DD).
-  `quantity` (integer, required): Quantity of items to rent.
-  `itemId` (integer, required): ID of the item being rented.
-  `userId` (integer, required): ID of the user renting the item.
-  `vendorId` (integer, required): ID of the vendor providing the item.
-  `totalPrice` (number, required): Total price of the rental transaction.

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
	"totalPrice": 150.0
}
```

#### Response

The API returns a JSON response indicating the success or failure of the operation:

-  `success` (boolean): Indicates whether the operation was successful.
-  `message` (string): A message providing additional information about the operation.

##### Success Response Example

```json
{
	"success": true,
	"message": "Item rented successfully."
}
```

##### Error Response Examples

-  Missing required fields:

```json
{
	"success": false,
	"message": "Missing required fields."
}
```

-  Invalid date format:

```json
{
	"success": false,
	"message": "Invalid date format."
}
```

-  Failed to rent item (database error, etc.):

```json
{
	"success": false,
	"message": "Failed to rent item."
}
```

#### Error Codes

-  `400 Bad Request`: Missing required fields, invalid input format.
-  `500 Internal Server Error`: Server-side errors, such as database failures.

#### Notes

-  Dates (`startDate` and `endDate`) must be provided in `YYYY-MM-DD` format.
-  Prices (`totalPrice`) should be provided as a floating-point number.

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
fetch("http://example.com/backend/rentitem.php", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		paymentId: "PAY123456789",
		startDate: "2024-07-05",
		endDate: "2024-07-10",
		quantity: 2,
		itemId: 123,
		userId: 456,
		vendorId: 789,
		totalPrice: 150.0,
	}),
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error("Error:", error));
```

# Rentals Transaction API Documentation

## Overview

The `backend/rentalsTransaction.php` provides endpoints to retrieve rental transaction details based on user or vendor IDs. The API supports pagination and returns data in JSON format.

## Base URL

```
http://yourdomain.com/backend/rentalsTransaction.php
```

## HTTP Methods

-  `GET` - Retrieve rental transaction data.

## Endpoints

### 1. Get Rental Transactions by User ID

Retrieve rental transactions for a specific user.

**Endpoint:**

```
GET /backend/rentalsTransaction.php?user_id={user_id}
```

**Query Parameters:**

-  `user_id` (optional): The ID of the user whose transactions you want to retrieve.
-  `page` (optional): The page number for pagination (default is `1`).

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

-  `vendor_id` (optional): The ID of the vendor whose transactions you want to retrieve.
-  `page` (optional): The page number for pagination (default is `1`).

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

-  `page` (optional): The page number for pagination (default is `1`).

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

-  **Pagination**: If you want to retrieve the next set of transactions, increment the `page` parameter in the request.
-  **Handling Responses**: Always check the `success` field in the response to ensure the request was successful.
-  **Error Handling**: Ensure proper error handling on the frontend by checking the `message` field in case of an error response.

This documentation should now provide the frontend developer with the necessary details to work with the `rentalsTransaction` API.

Certainly! Below is the comprehensive API documentation for the `backend/updateRentalItem.php` endpoint. This documentation is tailored for frontend developers to understand how to interact with the API to update existing rental items.

---

## **API Documentation: Update Rental Item**

### **Endpoint Overview**

-  **Endpoint URL:** `/rent24ng/backend/updateRentalItem.php`
-  **Method:** `POST`
-  **Content-Type:** `multipart/form-data`
-  **Response Format:** `application/json`

### **Description**

This API endpoint allows clients to update an existing rental item's details, including its category, name, description, pricing, availability, vendor information, location, and associated images.

### **Authentication**

_Note: If your API requires authentication (e.g., via tokens or sessions), include details here. If not, you can omit this section._

### **Request Parameters**

The API expects the following parameters to be sent via a `POST` request. Ensure that the form encoding type is set to `multipart/form-data` to handle file uploads.

The `item_id` parameter will be sent via a `GET` request

| Parameter         | Type      | Required | Description                                              |
| ----------------- | --------- | -------- | -------------------------------------------------------- |
| `item_id`         | `integer` | **Yes**  | The unique ID of the rental item to be updated.          |
| `category`        | `string`  | **Yes**  | The category of the rental item (e.g., Electronics).     |
| `ItemName`        | `string`  | **Yes**  | The name of the rental item.                             |
| `Description`     | `string`  | **Yes**  | A detailed description of the rental item.               |
| `Price`           | `float`   | **Yes**  | The price of the rental item.                            |
| `Availability`    | `string`  | **Yes**  | The availability status (e.g., "In Stock", "Available"). |
| `vendor_id`       | `integer` | **Yes**  | The ID of the vendor updating the item.                  |
| `Video`           | `string`  | **No**   | A URL to a video related to the rental item (optional).  |
| `number_of_items` | `integer` | **Yes**  | The number of items available for rent.                  |
| `location`        | `string`  | **Yes**  | The location of the rental item (e.g., "Lagos").         |
| `images`          | `file[]`  | **No**   | Image files related to the rental item (optional).       |

### **Parameter Details**

1. **`item_id`**

   -  **Description:** The unique identifier for the rental item you wish to update.
   -  **Example:** `456`

2. **`category`**

   -  **Description:** The category under which the rental item falls.
   -  **Example:** `"Electronics"`

3. **`ItemName`**

   -  **Description:** The name of the rental item.
   -  **Example:** `"Projector"`

4. **`Description`**

   -  **Description:** A detailed description of the rental item.
   -  **Example:** `"Updated HD Projector for events"`

5. **`Price`**

   -  **Description:** The rental price of the item.
   -  **Example:** `12000.00`

6. **`Availability`**

   -  **Description:** Current availability status of the item.
   -  **Example:** `"Available"`

7. **`vendor_id`**

   -  **Description:** The ID of the vendor performing the update.
   -  **Example:** `123`

8. **`Video`**

   -  **Description:** (Optional) A URL to a video showcasing the rental item.
   -  **Example:** `"http://example.com/updated_video.mp4"`

9. **`number_of_items`**

   -  **Description:** The number of units available for rent.
   -  **Example:** `3`

10.   **`location`**

      -  **Description:** The location where the rental item is available.
      -  **Example:** `"Abuja"`

11.   **`images`**
      -  **Description:** (Optional) One or more image files representing the rental item.
      -  **Example:** Multiple image files selected via a file input.

### **Request Example**

#### **HTML Form Example**

Here's an example of how to create an HTML form to interact with the `updateRentalItem.php` endpoint:

```html
<form action="/rent24ng/backend/updateRentalItem.php" method="post" enctype="multipart/form-data">
	<input type="hidden" name="item_id" value="456" />

	<label for="category">Category:</label>
	<input type="text" name="category" id="category" value="Electronics" required />

	<label for="ItemName">Item Name:</label>
	<input type="text" name="ItemName" id="ItemName" value="Projector" required />

	<label for="Description">Description:</label>
	<textarea name="Description" id="Description" required>Updated HD Projector for events</textarea>

	<label for="Price">Price:</label>
	<input type="number" name="Price" id="Price" value="12000" step="0.01" required />

	<label for="Availability">Availability:</label>
	<input type="text" name="Availability" id="Availability" value="Available" required />

	<label for="vendor_id">Vendor ID:</label>
	<input type="number" name="vendor_id" id="vendor_id" value="123" required />

	<label for="Video">Video URL (optional):</label>
	<input type="url" name="Video" id="Video" value="http://example.com/updated_video.mp4" />

	<label for="number_of_items">Number of Items:</label>
	<input type="number" name="number_of_items" id="number_of_items" value="3" required />

	<label for="location">Location:</label>
	<input type="text" name="location" id="location" value="Abuja" required />

	<label for="images">Upload Images (optional):</label>
	<input type="file" name="images[]" id="images" multiple />

	<button type="submit">Update Rental Item</button>
</form>
```

#### **cURL Example**

Alternatively, you can use `cURL` to send a `POST` request with the required parameters:

```bash
curl -X POST https://your-domain.com/rent24ng/backend/updateRentalItem.php \
  -F "item_id=456" \
  -F "category=Electronics" \
  -F "ItemName=Projector" \
  -F "Description=Updated HD Projector for events" \
  -F "Price=12000.00" \
  -F "Availability=Available" \
  -F "vendor_id=123" \
  -F "Video=http://example.com/updated_video.mp4" \
  -F "number_of_items=3" \
  -F "location=Abuja" \
  -F "images[]=@/path/to/image1.jpg" \
  -F "images[]=@/path/to/image2.jpg"
```

### **Response Structure**

The API will respond with a JSON object indicating the success or failure of the operation.

#### **Success Response**

```json
{
	"success": true,
	"message": "Rental item updated successfully."
}
```

#### **Failure Responses**

1. **Missing Required Fields or File Upload Error**

   ```json
   {
   	"success": false,
   	"message": "Missing required fields or file upload error."
   }
   ```

2. **Rental Item Not Found**

   ```json
   {
   	"success": false,
   	"message": "Rental item not found."
   }
   ```

3. **Failed to Create Upload Directory**

   ```json
   {
   	"success": false,
   	"message": "Failed to create upload directory."
   }
   ```

4. **Upload Directory Not Writable**

   ```json
   {
   	"success": false,
   	"message": "Upload directory is not writable."
   }
   ```

5. **Failed to Move Uploaded File**

   ```json
   {
   	"success": false,
   	"message": "Failed to upload image: image_name.jpg"
   }
   ```

6. **Failed to Update Image Path**

   ```json
   {
   	"success": false,
   	"message": "Failed to update image path: /rent24ng/backend/inc/uploads/rental_items/unique_image_name.jpg"
   }
   ```

7. **Failed to Update Rental Item**

   ```json
   {
   	"success": false,
   	"message": "Failed to update rental item."
   }
   ```

### **Example Response Handling**

#### **JavaScript Example Using Fetch API**

Here's how you might handle the response in a frontend application using JavaScript:

```javascript
const formData = new FormData(formElement); // Assume formElement is your form

fetch("/rent24ng/backend/updateRentalItem.php", {
	method: "POST",
	body: formData,
})
	.then((response) => response.json())
	.then((data) => {
		if (data.success) {
			// Handle success (e.g., notify the user, redirect, etc.)
			console.log(data.message);
		} else {
			// Handle failure (e.g., display error message)
			console.error(data.message);
		}
	})
	.catch((error) => {
		console.error("Error:", error);
	});
```

### **Error Handling**

-  **Invalid Request Method:** If the request method is not `POST`, the API will return an error message indicating an invalid request method.

   ```json
   {
   	"success": false,
   	"message": "Invalid request method."
   }
   ```

-  **Server Errors:** In case of server-side issues (e.g., database connection failures), ensure that appropriate error messages are returned to assist in debugging.

### **General Notes**

1. **File Uploads:**

   -  The `images` parameter is optional. If provided, ensure that the frontend allows multiple file uploads.
   -  The backend will handle moving the uploaded files to the designated directory and updating the database with the image paths.
   -  Ensure that the frontend enforces any file size or type restrictions as per the backend requirements.

2. **Data Validation:**

   -  While the backend performs sanitization and validation, it is good practice for the frontend to also validate user inputs to enhance user experience and reduce server load.

3. **Security Considerations:**

   -  Ensure that appropriate authentication and authorization mechanisms are in place to prevent unauthorized updates.
   -  Validate and sanitize all inputs to protect against SQL injection, XSS, and other common vulnerabilities.

4. **Concurrency:**

   -  If multiple updates can occur simultaneously, ensure that the backend handles concurrency appropriately to prevent data inconsistencies.

5. **Response Times:**

   -  Optimize the backend to ensure quick response times, especially when handling file uploads.

6. **Testing:**
   -  Thoroughly test the API with various input scenarios, including edge cases like large file uploads, missing fields, and invalid data types.

### **Summary**

-  **Endpoint:** `/rent24ng/backend/updateRentalItem.php`
-  **Method:** `POST`
-  **Content-Type:** `multipart/form-data`
-  **Parameters:** `item_id`, `category`, `ItemName`, `Description`, `Price`, `Availability`, `vendor_id`, `Video` (optional), `number_of_items`, `location`, `images` (optional)
-  **Response:** JSON indicating success or failure with a relevant message.
-  **Usage:** Update existing rental items by providing the necessary fields and optionally uploading new images.

---

Here's the updated API documentation for the `updateVendor` endpoint, including the new fields for a frontend developer:

---

## **API Documentation: Update Vendor**

### **Endpoint**

`POST /backend/updateVendor.php`

### **Description**

Updates vendor information, including profile picture and additional fields such as bank details.

### **Request Method**

`POST`

### **Request Parameters**

#### **Form Data**

-  **`user_id`** (integer, required): The unique identifier of the vendor to update.
-  **`phone_number`** (string, optional): The vendor's phone number.
-  **`state`** (string, optional): The vendor's state.
-  **`address`** (string, optional): The vendor's address.
-  **`localgovt`** (string, optional): The vendor's local government area.
-  **`city`** (string, optional): The vendor's city.
-  **`sex`** (string, optional): The vendor's sex.
-  **`birth`** (string, optional): The vendor's birthdate.
-  **`nin`** (string, optional): The vendor's National Identification Number (NIN).
-  **`firstname`** (string, optional): The vendor's first name.
-  **`lastname`** (string, optional): The vendor's last name.
-  **`bank_name`** (string, optional): The name of the bank.
-  **`account_name`** (string, optional): The account holder's name.
-  **`account_number`** (string, optional): The bank account number.
-  **`profile_pic`** (file, optional): The vendor's profile picture.

### **Request Example**

**cURL Example:**

```bash
curl -X POST http://yourdomain.com/backend/updateVendor.php \
  -F "user_id=123" \
  -F "phone_number=1234567890" \
  -F "state=California" \
  -F "address=123 Main St" \
  -F "localgovt=Central" \
  -F "city=Los Angeles" \
  -F "sex=Male" \
  -F "birth=1990-01-01" \
  -F "nin=AB1234567" \
  -F "firstname=John" \
  -F "lastname=Doe" \
  -F "bank_name=Bank of America" \
  -F "account_name=John Doe" \
  -F "account_number=987654321" \
  -F "profile_pic=@/path/to/profile_pic.jpg"
```

### **Response**

#### **Success Response**

```json
{
	"success": true,
	"message": "Vendor information has been updated successfully."
}
```

#### **Error Responses**

-  **Missing Required Fields**

   ```json
   {
   	"success": false,
   	"message": "Missing required fields or file upload error."
   }
   ```

-  **Invalid Request Method**

   ```json
   {
   	"success": false,
   	"message": "Invalid request method."
   }
   ```

-  **Upload Directory Issues**

   ```json
   {
   	"success": false,
   	"message": "Failed to create upload directory."
   }
   ```

-  **File Upload Error**

   ```json
   {
   	"success": false,
   	"message": "Failed to upload profile picture."
   }
   ```

-  **Database Update Failure**
   ```json
   {
   	"success": false,
   	"message": "Failed to update vendor information."
   }
   ```

### **Notes**

-  The `profile_pic` field should be a valid file upload with a valid image file.
-  All other fields are optional and can be omitted if not being updated.
-  The `user_id` is required to identify which vendor to update.

---

This documentation should help the frontend developer understand how to interact with the `updateVendor` API endpoint and handle the request and response correctly.

Here is the API documentation for the frontend team to use when integrating the `transactionHistory` endpoint into their frontend code:

---

### API Documentation: Transaction History

**Endpoint**: `/backend/transactionHistoryAPI.php`

**Request Method**: `GET`

**Description**: This endpoint returns the transaction history for a given user. It supports pagination for displaying transactions in chunks.

#### Parameters:

1. **user_id** (required)

   -  **Type**: `integer`
   -  **Description**: The unique ID of the user whose transaction history you want to retrieve.

2. **page** (optional)
   -  **Type**: `integer`
   -  **Default**: `1`
   -  **Description**: The page number for paginated transaction results. Each page contains 20 transactions.

#### Example Request:

```http
GET /backend/transactionHistoryAPI.php?user_id=123&page=1
```

#### Example Response:

```json
{
	"success": true,
	"data": [
		{
			"transaction_id": 1,
			"transaction_amount": 5000.0,
			"status": "Credited",
			"time": "2024-08-28 14:35:00"
		},
		{
			"transaction_id": 2,
			"transaction_amount": 2000.0,
			"status": "Debited",
			"time": "2024-08-27 10:15:45"
		},
		{
			"transaction_id": 3,
			"transaction_amount": 1000.0,
			"status": "Request",
			"time": "2024-08-25 12:45:30"
		}
	]
}
```

#### Response Parameters:

-  **success**:

   -  **Type**: `boolean`
   -  **Description**: Indicates whether the request was successful or not.

-  **data**:
   -  **Type**: `array`
   -  **Description**: Contains the list of transactions for the user.

Each object in the `data` array represents a single transaction and includes:

-  **transaction_id**:

   -  **Type**: `integer`
   -  **Description**: The unique ID of the transaction.

-  **transaction_amount**:

   -  **Type**: `decimal(10, 2)`
   -  **Description**: The amount involved in the transaction.

-  **status**:

   -  **Type**: `string`
   -  **Description**: The status of the transaction. Possible values are:
      -  `"Credited"`: When money has been added to the user.
      -  `"Debited"`: When money has been deducted from the user.
      -  `"Request"`: When a withdrawal request is made.

-  **time**:
   -  **Type**: `timestamp`
   -  **Description**: The timestamp when the transaction was created.

#### Error Response:

If an error occurs, the response will be:

```json
{
	"success": false,
	"message": "Error message describing the issue."
}
```

#### Example Error Responses:

1. **Missing user_id**:

```json
{
	"success": false,
	"message": "user_id is required."
}
```

2. **Invalid Request Method**:

```json
{
	"success": false,
	"message": "Invalid request method."
}
```

---

### Notes for Frontend Developers:

-  Ensure you send the correct `user_id` as a query parameter when making the API call.
-  If pagination is needed, increment the `page` parameter to load more transaction records.
-  Handle the error responses gracefully in the UI (e.g., show an error message if `user_id` is missing or the API fails).
-  Use the `success` field to check if the request was successful before displaying transaction data.

---

### API Documentation for `requestWithdraw` Endpoint

**Base URL**: `http://localhost/rent24ng/backend/requestWithdraw.php`

### Endpoint: Request Withdrawal

This API endpoint allows a user to request a withdrawal. The system will verify if the user's main balance is sufficient and then log the request as a transaction. A notification will also be sent to the admin when a withdrawal request is made.

---

### **Method: POST**

-  **URL**: `/requestWithdrawal.php`
-  **Description**: Submit a withdrawal request by the user.
-  **Headers**:
   -  `Content-Type: application/json`
-  **Request Body** (JSON):
   ```json
   {
     "user_id": <integer>,         // The ID of the user requesting the withdrawal
     "request_amount": <decimal>   // The amount the user wants to withdraw
   }
   ```

#### Example Request:

```json
{
	"user_id": 1,
	"request_amount": 100.0
}
```

#### Success Response:

-  **Code**: `200 OK`
-  **Response Body**:
   ```json
   {
   	"success": true,
   	"message": "Withdrawal request submitted successfully."
   }
   ```

#### Error Responses:

-  **Code**: `400 Bad Request`

   -  **Response Body** (if any required field is missing):
      ```json
      {
      	"success": false,
      	"message": "Both user_id and request_amount are required."
      }
      ```

-  **Code**: `400 Bad Request`
   -  **Response Body** (if insufficient balance):
      ```json
      {
      	"success": false,
      	"message": "Insufficient balance to request withdrawal."
      }
      ```

---

### **Method: GET**

-  **URL**: `/requestWithdraw.php`
-  **Description**: Retrieve withdrawal request history for a user by their user ID.
-  **Headers**:
   -  `Content-Type: application/json`
-  **Request Parameters** (Query String):
   -  `user_id` (integer) – **Required**: The user ID of the person whose transaction history is being retrieved.

#### Example Request:

```url
http://localhost/rent24ng/backend/requestWithdraw.php?user_id=1
```

#### Success Response:

-  **Code**: `200 OK`
-  **Response Body**:
   ```json
   {
   	"success": true,
   	"data": [
   		{
   			"transaction_id": 1,
   			"transaction_amount": 100.0,
   			"status": "Request",
   			"time": "2024-09-01 10:30:00"
   		},
   		{
   			"transaction_id": 2,
   			"transaction_amount": 50.0,
   			"status": "Request",
   			"time": "2024-09-02 11:45:00"
   		}
   	]
   }
   ```

#### Error Responses:

-  **Code**: `400 Bad Request`
   -  **Response Body**:
      ```json
      {
      	"success": false,
      	"message": "user_id is required."
      }
      ```

### Admin Notification

-  Whenever a user submits a withdrawal request, a notification will be sent to all users with **admin** privileges.

---

### Error Codes

-  `200 OK`: Successful operation
-  `400 Bad Request`: Missing or invalid input
-  `500 Internal Server Error`: An error occurred on the server while processing the request

---

### Notes for Frontend Developer:

-  Ensure you handle both POST and GET requests in your UI to support users submitting requests and viewing their withdrawal history.
-  Notify users if their balance is insufficient based on the error response.
-  Admins should have a notification system in place to handle withdrawal requests efficiently.

Here’s an API documentation for the frontend developer based on the `notificationHistory` method:

---

### **API Documentation: Notification History**

#### **Endpoint**: `/backend/notificationHistory.php`

#### **Method**: `GET`

#### **Description**:

This API fetches the notification history for a given user, ordered by notification status, with unread notifications listed first. It returns a JSON object containing the notifications for that user.

---

### **Request Format**

#### **URL**:

`http://<your-domain>/backend/notificationHistory.php`

#### **Query Parameters**:

| Parameter | Type | Required | Description                                                  |
| --------- | ---- | -------- | ------------------------------------------------------------ |
| user_id   | int  | Yes      | The ID of the user whose notifications you want to retrieve. |

#### **Example Request**:

```http
GET http://localhost/rent24ng/backend/notificationHistory.php?user_id=1
```

---

### **Response Format**

#### **Success Response**:

-  **Status Code**: `200 OK`
-  **Content-Type**: `application/json`

The API returns a JSON object with the following structure:

```json
{
	"success": true,
	"data": [
		{
			"id": 12,
			"subject": "Withdrawal Request",
			"details": "User Chima Amos has requested a withdrawal of 500.",
			"status": "Unread",
			"created_at": "2024-09-20 15:41:08"
		},
		{
			"id": 11,
			"subject": "Withdrawal Request",
			"details": "User Chima Amos has requested a withdrawal of 457.",
			"status": "Unread",
			"created_at": "2024-09-20 15:31:47"
		},
		{
			"id": 1,
			"subject": "Payment Received",
			"details": "You have received a payment of 4,500.00.",
			"status": "Read",
			"created_at": "2024-08-27 15:49:30"
		}
	]
}
```

#### **Response Fields**:

| Field      | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| success    | bool   | Indicates whether the request was successful or not. |
| data       | array  | An array of notifications belonging to the user.     |
| id         | int    | The unique ID of the notification.                   |
| subject    | string | The subject of the notification.                     |
| details    | string | Detailed information about the notification.         |
| status     | string | The status of the notification (`Read` or `Unread`). |
| created_at | string | The timestamp when the notification was created.     |

#### **Error Response**:

-  **Status Code**: `400 Bad Request`
-  **Content-Type**: `application/json`

If the `user_id` is missing or invalid, the API will return an error message:

```json
{
	"success": false,
	"message": "user_id is required."
}
```

If the request method is not `GET`:

```json
{
	"success": false,
	"message": "Invalid request method. Only GET is allowed."
}
```

---

### **How to Test with Postman**

1. **Request Type**: `GET`
2. **URL**: `http://localhost/rent24ng/backend/notificationHistory.php?user_id=1`
3. **Send the request**: Click "Send" in Postman.
4. **View Response**: Postman will display the response in JSON format. You should see a list of notifications related to the user with unread notifications first.

---

### **Notes for Frontend Implementation**:

-  **Unread notifications** should be displayed at the top.
-  Based on the notification status (`Read` or `Unread`), you can style or highlight the unread ones.
-  If no notifications are available or the `user_id` is invalid, display an appropriate error message to the user.

---

###

### ---------------------------------------------------------

### API Documentation for Change Password

**Endpoint:** `backend/changePassword.php`

---

### **Description:**

This API allows users to change their password by providing their identifier (username or email), current password, and new password. It will authenticate the user based on the provided credentials and update the password if the current one is correct.

---

### **HTTP Method:**

`POST`

---

### **Request Parameters:**

All parameters are passed in the body as **JSON**.

1. **identifier** (string, required)

   -  The unique identifier for the user. This can be either the username or email.

   **Example:** `"john_doe"` or `"johndoe@example.com"`

2. **current_password** (string, required)

   -  The current password of the user.

3. **new_password** (string, required)
   -  The new password the user wants to set. This should be a strong password.

---

### **Request Example:**

```json
{
	"identifier": "john_doe",
	"currentPassword": "OldPassword123",
	"newPassword": "NewPassword456"
}
```

---

### **Response:**

#### **Success (200 OK):**

```json
{
	"success": true,
	"message": "Password changed successfully."
}
```

#### **Error Responses:**

1. **Invalid Current Password:**

   -  Status Code: `400`
   -  Response:
      ```json
      {
      	"success": false,
      	"message": "Incorrect current password."
      }
      ```

2. **User Not Found:**

   -  Status Code: `404`
   -  Response:
      ```json
      {
      	"success": false,
      	"message": "User not found."
      }
      ```

3. **Validation Error (e.g., missing fields):**
   -  Status Code: `422`
   -  Response:
      ```json
      {
      	"success": false,
      	"message": "All fields are required."
      }
      ```

---

### **Testing with Postman:**

1. **Method:** `POST`
2. **URL:** `http://yourdomain.com/backend/changePassword.php`
3. **Headers:**
   -  `Content-Type: application/json`
4. **Body:**
   -  Select **raw** and **JSON** format in Postman, and input the JSON request as shown in the request example.

---



## API Documentation for `sendMessage` API

#### **Endpoint URL**:
```
POST http://localhost/backend/sendMessage.php
```

#### **Purpose**:
This API allows users to send messages. The message will be stored in the `message` table and also sent to the admin's email.

---

### **Request Method**:
`POST`

---

### **Request Headers**:
| Key            | Value              |
|----------------|--------------------|
| Content-Type   | application/json   |

---

### **Request Body (JSON)**:
| Parameter | Type     | Description                                | Required |
|-----------|----------|--------------------------------------------|----------|
| user_id   | Integer  | The ID of the user sending the message      | Yes      |
| subject   | String   | The subject of the message                  | Yes      |
| message   | String   | The message content                        | Yes      |

#### **Example**:
```json
{
  "user_id": 1,
  "subject": "Support Request",
  "message": "I need help with my account."
}
```

---

### **Response Format**:
The API will return a JSON object containing either success or failure messages.

#### **Success Response**:
```json
{
  "success": true,
  "message": "Message sent and email delivered to admin."
}
```

#### **Failure Response**:
```json
{
  "success": false,
  "message": "user_id, subject, and message are required."
}
```

#### **Invalid Method Response**:
If the request method is not `POST`, you will get:
```json
{
  "success": false,
  "message": "Invalid request method."
}
```

---

### **Example Usage**:

#### **1. Request**:
- **Method**: `POST`
- **URL**: `http://localhost/backend/sendMessage.php`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
```json
{
  "user_id": 1,
  "subject": "Account Issue",
  "message": "I need assistance with resetting my password."
}
```

#### **2. Response**:
```json
{
  "success": true,
  "message": "Message sent and email delivered to admin."
}
```

---

### **Error Scenarios**:
- **Missing Required Fields**: The `user_id`, `subject`, and `message` fields are mandatory. If any of them is missing, the API will return an error response.
- **Invalid Request Method**: If a request method other than `POST` is used, the API will reject the request.

### **Notes for Frontend**:
- Ensure that `user_id`, `subject`, and `message` are sent as part of the request body.
- Handle the success or failure responses appropriately in the frontend to notify the user about the status of their message.


Here’s the API documentation for the `readNotification` endpoint that you can provide to the frontend developer:

---

# **API Documentation for `readNotification`**

## **Endpoint Overview**

This API marks a notification as read based on the `notification_id` provided. The frontend will call this endpoint when the user views a notification, updating its status from "Unread" to "Read".

---

## **Endpoint URL**

```
POST /backend/readNotification.php
```

## **Request Method**

`POST`

---

## **Request Headers**

| Key           | Value                |
|---------------|----------------------|
| Content-Type  | application/json     |

---

## **Request Body**

The request body should be sent as raw JSON. The following fields are required:

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| `notification_id`| int    | The ID of the notification to mark as read|

### **Sample Request Body**

```json
{
  "notification_id": 5
}
```

---

## **Response**

### **Success Response**

If the request is successful and the notification is marked as read, the API will return a success response:

```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

### **Error Responses**

If the request fails for any reason (e.g., missing `notification_id`), the API will return an appropriate error message:

1. **Missing `notification_id`:**

```json
{
  "success": false,
  "message": "notification_id is required."
}
```

2. **Invalid Request Method (if method is not `POST`):**

```json
{
  "success": false,
  "message": "Invalid request method. Only POST is allowed."
}
```

3. **Database Error (if any issues occur while updating the notification):**

```json
{
  "success": false,
  "message": "Failed to update notification status."
}
```

---

## **Usage Example**

- When a user clicks on a notification in the frontend, send a `POST` request with the notification's ID in the body to mark it as read.

### **Frontend Steps**
1. **Send POST Request**: Use the above `POST` request format to mark a notification as read.
2. **Handle Response**: Based on the success or failure response, update the notification's status in the user interface.
3. **Error Handling**: Ensure to handle errors, like missing `notification_id` or invalid request methods, by displaying appropriate messages.

---

Here’s the API documentation for the `AdminTransactionHistory` endpoint to guide the frontend developer:

---

# **API Documentation for `AdminTransactionHistory`**

## **Endpoint Overview**

This API retrieves the admin's view of transaction history with pagination. It includes user transaction details, along with their associated bank details, and provides an action link for transactions with a "Request" status.

---

## **Endpoint URL**

```
GET /backend/AdminTransactionHistory.php
```

## **Request Method**

`GET`

---

## **Request Headers**

| Key           | Value                |
|---------------|----------------------|
| Content-Type  | application/json     |

---

## **Request Parameters**

| Parameter  | Type   | Required | Description                                          |
|------------|--------|----------|------------------------------------------------------|
| `page`     | int    | No       | Page number for paginating results (default: 1)      |

### **Sample Request URL**

```bash
GET /backend/adminTransactionHistory.php?page=2
```

---

## **Response**

### **Success Response**

If the request is successful and transactions are retrieved, the API will return a JSON response with the transaction data.

**Sample Response:**

```json
{
    "success": true,
    "data": [
        {
            "transaction_id": 101,
            "user_id": 12,
            "transaction_amount": 5000,
            "status": "Debited",
            "time": "2024-09-26 14:30:45",
            "bank_details": {
                "bank_name": "First Bank",
                "account_name": "John Doe",
                "account_number": "1234567890"
            },
            "action": null
        },
        {
            "transaction_id": 102,
            "user_id": 15,
            "transaction_amount": 8000,
            "status": "Request",
            "time": "2024-09-26 15:00:12",
            "bank_details": {
                "bank_name": "GTBank",
                "account_name": "Jane Smith",
                "account_number": "0987654321"
            },
            "action": "http://localhost/rent24ng/new_rent24/backend/processPayment.php?transaction_id=102"
        }
    ]
}
```

### **Response Fields**

| Field                  | Type     | Description                                                            |
|------------------------|----------|------------------------------------------------------------------------|
| `transaction_id`        | int      | Unique ID of the transaction                                            |
| `user_id`               | int      | User ID associated with the transaction                                 |
| `transaction_amount`    | float    | Amount involved in the transaction                                      |
| `status`                | string   | Current status of the transaction (e.g., "Completed", "Request")        |
| `time`                  | string   | Timestamp of when the transaction occurred                              |
| `bank_details`          | object   | Object containing the bank details of the user involved in the transaction|
| `bank_name`             | string   | Name of the user's bank                                                 |
| `account_name`          | string   | Account holder's name                                                   |
| `account_number`        | string   | User's account number                                                   |
| `action`                | string   | Action URL for processing the transaction (only for "Request" status)   |

---

## **Error Responses**

If the request fails for any reason, an appropriate error message will be returned.

1. **Missing page parameter (default to page 1):**

```json
{
    "success": true,
    "data": [ ... ]
}
```

2. **Invalid Request Method (if method is not `GET`):**

```json
{
    "success": false,
    "message": "Invalid request method. Only GET is allowed."
}
```

3. **Database Error (if the query fails):**

```json
{
    "success": false,
    "message": "Failed to retrieve transaction history."
}
```

---

## **Usage Example**

- To retrieve the first page of transactions:
  ```bash
  GET /backend/AdminTransactionHistory.php?page=1
  ```

- For paginated transactions, increment the `page` parameter:
  ```bash
  GET /backend/AdminTransactionHistory.php?page=2
  ```

---

## **Frontend Steps**
1. **Send GET Request**: Use the above URL to request transaction data from the server.
2. **Paginate**: Make sure to pass the `page` parameter to retrieve the desired transactions.
3. **Handle Response**: Process the returned JSON data and update the admin interface to display transaction history.
4. **Action Link**: For transactions with status "Request," the `action` field contains a URL to process the payment, which can be linked directly to the admin dashboard for interaction.

---

