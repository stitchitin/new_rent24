import { select, sweetAlert } from "./lib/index.js";
import { fetchAndDisplayNotifications } from "./notification.js";
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

// Get user information and put it in the user store
userStoreActions.getUserInformation(userCookie);

// Function to fetch user information and update necessary elements
const fetchUserAndUpdateElements = async (userInfo) => {
	const vendor = userInfo.vendor;
	const user = userInfo.user; // User information from the API

	// Update the UI with user information (example)
	select("#userInfoUsername").textContent = user.username;
	select("#userInfoP").textContent = user.privilege;

	const profilePicElement1 = select("#profilePic1");
	profilePicElement1.src = vendor.profile_pic;

	if (window.location.pathname.endsWith("settings.html")) {
		const profilePicElement2 = select("#profilePic2");
		profilePicElement2.src = vendor.profile_pic;
	}

	if (window.location.pathname.endsWith("user-profile.html")) {
		const profilePicElement2 = select("#profilePic2");
		profilePicElement2.src = vendor.profile_pic;
		select("#firstname1").textContent = vendor.firstname;
		select("#lastname1").textContent = vendor.lastname;
		select("#userInfoPrivilege").textContent = user.privilege;
		select("#phone_number").textContent = vendor.phone_number;
		select("#userInfoemail").textContent = user.email;
		select("#userlocalgovt").textContent = vendor.localgovt;
	}

	if (window.location.pathname.endsWith("additem.html")) {
		select("#userInfoId").value = user.user_id;
	}

	if (window.location.pathname.endsWith("vendor-profile.html")) {
		const profilePicElement2 = select("#profilePic2");
		profilePicElement2.src = vendor.profile_pic;
		select("#firstname1").textContent = vendor.firstname;
		select("#lastname1").textContent = vendor.lastname;
		select("#userInfoPrivilege").textContent = user.privilege;
		select("#phone_number").textContent = vendor.phone_number;
		select("#userInfoemail").textContent = user.email;
		select("#userlocalgovt").textContent = vendor.localgovt;
	}
};

// Page Protection and hiding of vendor menu from regular user
const protectPagesAndHideMenus = async (userPrivilege) => {
	const inaccessibleVendorPages = ["additem.html", "vendor-profile.html"];
	const inaccessibleAdminPages = [
		"admin-transaction-history.html",
		"admin-users-list.html",
		"confirm-payment.html",
		"read-user-info.html",
	];

	if (userPrivilege === "user") {
		select("#vendorMenu").remove();
	}

	if (userPrivilege !== "admin") {
		select("#adminMenu").remove();
	}

	for (const page of inaccessibleVendorPages) {
		if (userPrivilege === "user" && window.location.pathname.endsWith(page)) {
			sweetAlert({ icon: "error", text: "You are not authorized to view this page!" });

			document.body.remove();

			window.location.href = "404.html";
		}
	}

	for (const page of inaccessibleAdminPages) {
		if (userPrivilege !== "admin" && window.location.pathname.endsWith(page)) {
			sweetAlert({ icon: "error", text: "You are not authorized to view this page!" });

			document.body.remove();

			window.location.href = "404.html";
		}
	}
};

// Call the function to fetch user information, and protect pages and hide vendor menu on page load
userStore.subscribe(({ userInfo }) => {
	protectPagesAndHideMenus(userInfo.user.privilege);
	fetchUserAndUpdateElements(userInfo);
	fetchAndDisplayNotifications(userInfo.user.user_id);
});
