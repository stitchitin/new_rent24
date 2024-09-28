import { callApi, sweetAlert } from "./lib/index.js";
import { select } from "./lib/utils.js";
import { userStore } from "./store/userStore.js";

const handleSubmit = (userEmail) => async (event) => {
	event.preventDefault();

	const formDataObject = Object.fromEntries(new FormData(event.target));

	if (formDataObject.newPassword !== formDataObject.confirmPassword) {
		sweetAlert({ icon: "error", text: "The new password doesn't match the confirmation password" });
		return;
	}

	Reflect.deleteProperty(formDataObject, "confirmPassword");

	const { data, error } = await callApi("backend/changePassword.php", {
		method: "POST",
		body: { ...formDataObject, identifier: userEmail },
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while changing user password." });
		return;
	}

	if (!data.success) {
		sweetAlert({ icon: "error", text: data.message });
		return;
	}

	sweetAlert({ icon: "success", text: data.message });

	setTimeout(() => {
		window.location.href = "user-profile.html";
	}, 1000);
};

userStore.subscribe(({ userInfo }) => {
	select("#changePasswordForm").addEventListener("submit", handleSubmit(userInfo.user.email));
});
