// Function to get a cookie by name
function getCookie(name) {
	const nameEQ = name + "=";
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i].trim();
		if (cookie.startsWith(nameEQ)) {
			return cookie.substring(nameEQ.length);
		}
	}
	return null;
}

// Check if the "user" cookie is set
function checkUserCookie() {
	const userCookie = getCookie("user");
	if (!userCookie) {
		// If the cookie is not set, redirect to the login page
		window.location.href = "login.html"; // Change to your login page
	}
}

// Execute the check on page load
document.addEventListener("DOMContentLoaded", checkUserCookie);

// Function to set a cookie with an expiration in the past to delete it
function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to delete all cookies
function deleteAllCookies() {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		const cookieName = cookie[0].trim();
		deleteCookie(cookieName); // Delete each cookie
	}
}

// Function to handle logout
function logout() {
	// Clear all cookies to ensure a clean logout
	deleteAllCookies();
	// Redirect to the login page (or home page, depending on your design)
	window.location.href = "login.html"; // Adjust to your login page
}

// Attach the logout function to the logout buttons
document.addEventListener("DOMContentLoaded", () => {
	const logoutButtons = document.querySelectorAll("[data-id=logout]");

	if (!logoutButtons) return;

	logoutButtons.forEach((btn) => btn.addEventListener("click", logout));
});

// Function to fetch user information by email
export function fetchUserByEmail(email) {
	// Define the endpoint URL, including the email parameter in the GET request
	const endpoint = `backend/user_files.php?email=${email}`;

	// Use fetch to send the GET request
	fetch(endpoint, {
		method: "GET", // GET request to the endpoint
		headers: {
			"Content-Type": "application/json", // Expecting JSON response
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json(); // Parse the JSON response
		})
		.then((data) => {
			if (data.success) {
				// Handle the success case
				const vendor = data.vendor;
				const user = data.user; // User information from the API

				// Update the UI with user information (example)
				document.getElementById("userInfoUsername").innerText = user.username;
				document.getElementById("userInfoP").innerText = user.privilege;

				const profilePicElement1 = document.getElementById("profilePic1");
				profilePicElement1.src = vendor.profile_pic;

				if (window.location.pathname.endsWith("edit-profile.html")) {
					document.getElementById("userInfoId").value = user.user_id;
					const profilePicElement = document.getElementById("profilePic2");
					profilePicElement.src = vendor.profile_pic;
					document.getElementById("firstname1").innerText = vendor.firstname;
					document.getElementById("lastname1").innerText = vendor.lastname;
					document.getElementById("firstname").value = vendor.firstname;
					document.getElementById("lastname").value = vendor.lastname;
					document.getElementById("address").value = vendor.address;
					document.getElementById("nin").value = vendor.nin;
					document.getElementById("sex").value = vendor.sex;
					document.getElementById("birth").value = vendor.birth;
					document.getElementById("phone_number").value = vendor.phone_number;
					document.getElementById("state").value = vendor.state;
					document.getElementById("city").value = vendor.city;
					document.getElementById("lga").value = vendor.localgovt;
				}

				if (window.location.pathname.endsWith("user-profile.html")) {
					const profilePicElement = document.getElementById("profilePic2");
					profilePicElement.src = vendor.profile_pic;
					document.getElementById("firstname1").innerText = vendor.firstname;
					document.getElementById("lastname1").innerText = vendor.lastname;
					document.getElementById("userInfoPrivilege").innerText = user.privilege;
					document.getElementById("phone_number").innerText = vendor.phone_number;
					document.getElementById("userInfoemail").innerText = user.email;
					document.getElementById("userlocalgovt").innerText = vendor.localgovt;
				}

				if (window.location.pathname.endsWith("additem.html")) {
					document.getElementById("userInfoId").value = user.user_id;
				}
				if (window.location.pathname.endsWith("user.html")) {
					const profilePicElement = document.getElementById("profilePic2");
					profilePicElement.src = vendor.profile_pic;
					document.getElementById("firstname1").innerText = vendor.firstname;
					document.getElementById("lastname1").innerText = vendor.lastname;
					document.getElementById("userInfoPrivilege").innerText = user.privilege;
					document.getElementById("phone_number").innerText = vendor.phone_number;
					document.getElementById("userInfoemail").innerText = user.email;
					document.getElementById("userlocalgovt").innerText = vendor.localgovt;
				}
			} else {
				// Handle error messages from the API
				console.error("API Error:", data.message); // Log the error message
				alert("Error fetching user data: " + data.message); // Display an error message
			}
		})
		.catch((error) => {
			console.error("Fetch error:", error); // Handle fetch errors
			// alert("An error occurred while fetching user information.");
		});
}
var userCookie = getCookie("user");
export const user = userCookie ? JSON.parse(userCookie) : null;

document.addEventListener("DOMContentLoaded", function () {
	const email = user.email; // Replace with the email you want to fetch
	fetchUserByEmail(email); // Call the function with the email
});
