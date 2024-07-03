
# API DOCS

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

### Method

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
- `itemName` (string, required): The name of the rental item.
- `description` (string, required): A description of the rental item.
- `price` (float, required): The price of the rental item.
- `availability` (string, required): The availability status of the rental item.
- `vendor_id` (int, required): The ID of the vendor adding the item.
- `video` (string, optional): A video URL for the rental item.
- `number_of_items` (int, required): The number of items available for rent.
- `images` (file, required): An image file for the rental item.
- `item_location` (string, required): The location of the rental item.

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
