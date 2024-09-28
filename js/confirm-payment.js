import { callApi, select, sweetAlert } from "./lib/index.js";

const transaction_id = new URLSearchParams(window.location.search).get("transaction_id");

const formatLabel = (key) => {
	return key
		.split("_")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
};

const createInfoField = (key, value) => `
					<div class="info-label">${formatLabel(key)}:</div>
					<div class="info-value">${value}</div>
				`;

const confirmPayment = async () => {
	const { data, error } = await callApi("backend/submitPayment.php", {
		method: "POST",
		body: { transaction_id },
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while confirming payment." });
		return;
	}

	if (!data.success) {
		sweetAlert({ icon: "error", text: data.message });
		return;
	}

	sweetAlert({ icon: "success", text: data.message });

	window.location.href = "admin-transaction-history.html";
};

const fetchDisplayTransactionDetails = async () => {
	const { data, error } = await callApi("backend/processPayment.php", {
		query: { transaction_id },
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while fetching transaction details." });
		return;
	}

	if (!data.success) {
		sweetAlert({ icon: "error", text: data.message });
		return;
	}

	const htmlContent = Object.entries(data.data)
		.map(([key, value]) => createInfoField(key, value))
		.join("");

	select("#info-grid").insertAdjacentHTML(
		"beforeend",
		`
		${htmlContent}

		<button id="confirm-btn" type="button" class="btn btn-primary mt-4">
			Confirm Payment
		</button>
		`
	);

	select("#confirm-btn").addEventListener("click", confirmPayment);
};

fetchDisplayTransactionDetails();
