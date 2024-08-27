import { callApi, select, sweetAlert, waitUntil } from "./lib/index.js";

const item_id = new URLSearchParams(window.location.search).get("item_id");

const itemForm = select("#itemform");

const imageInput = select("#image");

item_id && imageInput.removeAttribute("required");

const validateAndSubmitForm = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);

	const { data, error } = await callApi(
		`backend/${item_id ? "updateRentalItem.php" : "addRentalItem.php"}`,
		{
			method: "POST",
			query: item_id && { item_id },
			body: formData,
		}
	);

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while updating vendor Item." });
		return;
	}

	if (!data.success) {
		sweetAlert({ icon: "error", text: data.message });
		return;
	}

	sweetAlert({ icon: "success", text: "Vendor Item has been updated successfully." });

	await waitUntil(1000);

	window.location.href = "vendor-profile.html";
};

itemForm.addEventListener("submit", validateAndSubmitForm);

const fetchCategoriesForSelectInput = async () => {
	const { data } = await callApi("backend/getAllCategories.php");

	if (!data.success) {
		console.error("Failed to fetch categories:", data.message);
		return;
	}

	const selectElement = select("#category");

	const optionsHtml = data.categories
		.map((category) => `<option value="${category.category_id}">${category.category_name}</option>`)
		.join("");

	selectElement.insertAdjacentHTML("beforeend", optionsHtml);

	// selectElement.selectpicker("refresh");
};

fetchCategoriesForSelectInput();

const populateLateForm = async () => {
	const { data } = await callApi("backend/getItemById.php", {
		query: { item_id },
	});

	if (!data.success) {
		sweetAlert("Failed to fetch existing product details");
		return;
	}

	const productItem = data.data;
	const allFormInputsArray = Array.from(itemForm.elements);

	// prettier-ignore
	const requiredFormInputs = allFormInputsArray.filter((formInput) =>Object.keys(productItem).includes(formInput.name) && formInput.name !== "images");

	for (const requiredFormInput of requiredFormInputs) {
		const inputValue = productItem[requiredFormInput.name];

		requiredFormInput.value = inputValue;
	}
};

item_id && populateLateForm();
