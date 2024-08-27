import { callApi, sweetAlert } from "./lib/index.js";
import { select } from "./lib/utils.js";
import { userStore } from "./store/userStore.js";

const onSubmit = (event) => {
	const formData = new FormData(event.target);

	const { data, error } = callApi("backend/updateVendor.php", {
		method: "POST",
		body: formData,
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
};

select("#profileForm").addEventListener("submit", onSubmit);

const populateLateForm = async (userInfo) => {
	const vendorInformation = userInfo.vendor;
	const formInputsArray = Array.from(select("#profileForm").elements);

	// prettier-ignore
	const requiredFormInputs = formInputsArray.filter((formInput) =>Object.keys(vendorInformation).includes(formInput.name) && formInput.name !== "profile_pic");

	for (const requiredFormInput of requiredFormInputs) {
		const inputValue = vendorInformation[requiredFormInput.name];

		requiredFormInput.value = inputValue;
	}
};

userStore.subscribe(({ userInfo }) => populateLateForm(userInfo));
