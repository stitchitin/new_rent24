import { callApi, sweetAlert } from "./lib/index.js";
import { select } from "./lib/utils.js";
import { userStore } from "./store/userStore.js";

const onSubmit = async (event, userEmail) => {
	event.preventDefault();

	const formData = new FormData(event.target);

	if (formData.get("newPassword") !== formData.get("confirmPassword")) {
		sweetAlert({ icon: "error", text: "The new password doesn't match the confirmation password" });
		return;
	}

	formData.delete("confirmPassword");

	const { data, error } = await callApi("backend/changePassword.php", {
		method: "POST",
		body: { ...Object.fromEntries(formData), identifier: userEmail },
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while updating vendor information." });
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
	select("#changePasswordForm").addEventListener("submit", (event) => {
		onSubmit(event, userInfo.user.email);
	});
});
