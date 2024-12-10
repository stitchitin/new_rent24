import { callApi, sweetAlert } from "./lib/index.js";
import { select } from "./lib/utils.js";
import { userStore } from "./store/userStore.js";

const handleSubmit = (userId) => async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);

	if (formData.get("profile_pic").name === "") {
		formData.delete("profile_pic");
	}

	const { data, error } = await callApi("backend/updateVendor.php", {
		method: "POST",
		body: formData,
		query: {
			user_id: userId,
		},
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

	sweetAlert({ icon: "success", text: "Vendor information has been updated successfully." });

	setTimeout(() => {
		window.location.href = "user-profile.html";
	}, 1000);
};

userStore.subscribe(({ userInfo }) => {
	select("#profileForm").addEventListener("submit", handleSubmit(userInfo.user.user_id));
});

const populateLateForm = async (vendorInfo) => {
	const profilePic = select("#profilePic2");
	vendorInfo.profile_pic && (profilePic.src = vendorInfo.profile_pic);

	const formInputsArray = Array.from(select("#profileForm").elements);

	// prettier-ignore
	const requiredFormInputs = formInputsArray.filter((formInput) =>Object.keys(vendorInfo).includes(formInput.name) && formInput.name !== "profile_pic");

	for (const requiredFormInput of requiredFormInputs) {
		const inputValue = vendorInfo[requiredFormInput.name];

		requiredFormInput.value = inputValue;
	}
};

userStore.subscribe(({ userInfo }) => populateLateForm(userInfo.vendor));
