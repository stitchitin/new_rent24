import { callApi, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const handleSubmit = (userId) => async (event) => {
	event.preventDefault();

	const formDataObject = Object.fromEntries(new FormData(event.target));

	const { data, error } = await callApi("backend/sendMessage.php", {
		method: "POST",
		body: {
			...formDataObject,
			user_id: userId,
		},
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while sending support." });
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
	select("#supportForm").addEventListener("submit", handleSubmit(userInfo.user.user_id));
});
