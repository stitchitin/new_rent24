import { select } from "./lib/utils.js";

const onSubmit = (event) => {
	const form = document.getElementById("updateForm");
	const formData = new FormData(event.target);

	fetch("backend/updateVendor.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				alert("Users information has been updated successfully.");
			} else {
				alert("Failed to update vendor information: " + data.message);
			}
		})
		.catch((error) => {
			console.error("Fetch error:", error);
			alert("An error occurred while updating vendor information.");
		});
};

select("#profileForm").addEventListener("submit", onSubmit);
