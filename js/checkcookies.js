
	// Function to get a cookie by name
	function getCookie(name) {
		const nameEQ = name + "=";
		const cookies = document.cookie.split(';');
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
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    // Function to delete all cookies
    function deleteAllCookies() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            const cookieName = cookie[0].trim();
            deleteCookie(cookieName); // Delete each cookie
        }
    }

        // Function to handle logout
    function logout() {
        // Clear all cookies to ensure a clean logout
        deleteAllCookies();
        // Redirect to the login page (or home page, depending on your design)
         window.location.href = 'login.html'; // Adjust to your login page
    }