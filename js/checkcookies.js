import { callApi, sweetAlert } from "./lib/index.js";
import { userStore, userStoreActions } from "./store/userStore.js";

// Function to get a cookie by name
const getCookie = (name) => {
	const nameEQ = name + "=";

	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const trimmedCookie = cookie.trim();

		if (!trimmedCookie.startsWith(nameEQ)) continue;

		return trimmedCookie.substring(nameEQ.length);
	}

	return null;
};

// Store user cookie in variable
const userCookie = getCookie("user");

// Check if the "user" cookie is set
const checkUserCookie = () => {
	if (!userCookie) {
		// If the cookie is not set, redirect to the login page
		window.location.href = "login.html"; // Change to your login page
	}
};

// Execute the check on page load
checkUserCookie();

// Function to delete all cookies
const deleteAllCookies = () => {
	// Function to set a cookie with an expiration in the past to delete it
	const deleteCookie = (name) => {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	};

	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		const cookieName = cookie[0].trim();
		deleteCookie(cookieName); // Delete each cookie
	}
};

// Function to handle logout
const logout = () => {
	// Clear all cookies to ensure a clean logout
	deleteAllCookies();
	// Redirect to the login page (or home page, depending on your design)
	window.location.href = "login.html"; // Adjust to your login page
};

// Attach the logout function to all logout buttons
const everyLogoutButtons = document.querySelectorAll("[data-id=logout]");

everyLogoutButtons.forEach((btn) => btn.addEventListener("click", logout));

// Get user information and store in the user store
userStoreActions.getUserInformation(userCookie);

// Function to fetch user information and update necessary elements
const fetchUserAndUpdateElements = async (userInfo) => {
	const vendor = userInfo.vendor;
	const user = userInfo.user; // User information from the API

	// Update the UI with user information (example)
	document.getElementById("userInfoUsername").innerText = user.username;
	document.getElementById("userInfoP").innerText = user.privilege;

	const profilePicElement1 = document.getElementById("profilePic1");
	profilePicElement1.src = vendor.profile_pic;

	if (window.location.pathname.endsWith("edit-profile.html")) {
		document.getElementById("userInfoId").value = user.user_id;
		const profilePicElement2 = document.getElementById("profilePic2");
		profilePicElement2.src = vendor.profile_pic;
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
		const profilePicElement2 = document.getElementById("profilePic2");
		profilePicElement2.src = vendor.profile_pic;
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
		const profilePicElement2 = document.getElementById("profilePic2");
		profilePicElement2.src = vendor.profile_pic;
		document.getElementById("firstname1").innerText = vendor.firstname;
		document.getElementById("lastname1").innerText = vendor.lastname;
		document.getElementById("userInfoPrivilege").innerText = user.privilege;
		document.getElementById("phone_number").innerText = vendor.phone_number;
		document.getElementById("userInfoemail").innerText = user.email;
		document.getElementById("userlocalgovt").innerText = vendor.localgovt;
	}
};

// Call the function to fetch user information on page load
userStore.subscribe(({ userInfo }) => fetchUserAndUpdateElements(userInfo));

// Page Protection and hiding of vendor menu from regular user
const protectPagesAndHideVendorMenu = async (userInfo) => {
	const vendorMenu = document.getElementById("vendorMenu");

	const inaccessiblePages = ["additem.html", "user.html"];

	if (userInfo.user.privilege !== "vendor") {
		vendorMenu.style.display = "none";
	}

	inaccessiblePages.forEach((page) => {
		if (userInfo.user.privilege !== "vendor" && window.location.pathname.endsWith(page)) {
			sweetAlert("You are not authorized to view this page!");

			document.body.style.display = "none";

			window.location.href = "404.html";
		}
	});
};

// Call function on page load
userStore.subscribe(({ userInfo }) => protectPagesAndHideVendorMenu(userInfo));
