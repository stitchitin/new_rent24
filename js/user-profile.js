import { callApi, printPaymentReceipt, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createItemDetailsRow = (itemInfo) => `<tr data-payment-id="${itemInfo.payment_id}">
														<td><strong>${itemInfo.payment_id}</strong></td>
														<td>
															<strong>${itemInfo.vendor_firstname} ${itemInfo.vendor_lastname}</strong>
															<br>
															${itemInfo.vendor_phone_number}
														</td>
														<td>${itemInfo.ItemName}</td>
														<td class="text-center">${itemInfo.quantity}</td>
														<td>${itemInfo.start_date}</td>
														<td>${itemInfo.end_date}</td>
														<td>&#8358;${itemInfo.total_price.toLocaleString()}</td>
														<td>
															<span class="badge light badge-lg ${itemInfo.status === "Approved" ? "badge-success" : "badge-warning"}">
																${itemInfo.status}
																${
																	itemInfo.status === "Approved"
																		? '<i class="ms-1 fa fa-check"></i>'
																		: '<i class="ms-1 fas fa-stream"></i>'
																}
															</span>
														</td>
														<td>
															<button data-id="print-btn" class="btn btn-success shadow btn-xs sharp">
																<i class="fa fa-print"></i>
															</button>
														</td>
													</tr>
													`;

const fetchUserTransactions = async (userInfo) => {
	const { data } = await callApi("backend/rentalsTransaction.php", {
		query: { user_id: userInfo.user.user_id },
	});

	if (!data.success) {
		sweetAlert({
			title: "Something went wrong",
			text: data.message,
			icon: "error",
		});
		return;
	}

	if (data.data.length === 0) {
		select("#table-body").insertAdjacentHTML(
			"beforeend",
			`<tr>
				<td>
					<strong>No transaction data found</strong>
				</td>
			</tr>`
		);

		return;
	}

	const mainData = data.data.filter(
		(itemInfo) =>
			itemInfo.vendor_firstname !== itemInfo.user_firstname &&
			itemInfo.vendor_lastname !== itemInfo.user_lastname &&
			itemInfo.vendor_phone_number !== itemInfo.user_phone_number
	);

	if (mainData.length === 0) {
		select("#table-body").insertAdjacentHTML(
			"beforeend",
			`<tr>
				<td>
					<strong>No transaction data found</strong>
				</td>
			</tr>`
		);

		return;
	}

	const htmlContent = mainData
		.map((itemInfo) => createItemDetailsRow(itemInfo))
		.toReversed()
		.join("");

	const tableBody = select("#table-body");

	tableBody.insertAdjacentHTML("beforeend", htmlContent);

	for (const itemInfo of mainData) {
		const printBtn = select(
			`[data-payment-id="${itemInfo.payment_id}"] [data-id="print-btn"]`,
			tableBody
		);

		const paymentData = mainData.find((item) => item.payment_id === itemInfo.payment_id);

		printBtn.addEventListener("click", () => printPaymentReceipt(paymentData));
	}
};

userStore.subscribe(({ userInfo }) => fetchUserTransactions(userInfo));
