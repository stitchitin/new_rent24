import { callApi, printPaymentReceipt, select } from "./lib/index.js";

const createTransactionRow = (transactionInfo) => `<tr data-transaction-id="${
	transactionInfo.transaction_id
}">
														<td><strong>${transactionInfo.transaction_id}</strong></td>
														<td>&#8358;${Number(transactionInfo.transaction_amount).toLocaleString()}</td>
														<td>${transactionInfo.time}</td>
														<td>${transactionInfo.bank_details.bank_name}</td>
														<td>${transactionInfo.bank_details.account_name}</td>
														<td>${transactionInfo.bank_details.account_number}</td>
														<td>
															${transactionInfo.status}
														</td>
														<td>
															${
																transactionInfo.action !== null
																	? `<a
																		href="confirm-payment.html?transaction_id=${transactionInfo.transaction_id}"
																	>
																		Confirm payment
																	</a>`
																	: `<button
																		data-id="print-btn"
																		class="btn btn-success shadow btn-xs sharp"
																	>
																		<i class="fa fa-print"></i>
																	</button>`
															}


														</td>
													</tr>
													`;

const fetchAndDisplayTransactions = async () => {
	const { data } = await callApi("backend/adminTransactionHistory.php");

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
	}

	const htmlContent = data.data.map((transactionInfo) => createTransactionRow(transactionInfo)).join("");

	const tableBody = select("#table-body");

	tableBody.insertAdjacentHTML("beforeend", htmlContent);

	for (const transactionInfo of data.data) {
		if (transactionInfo.action !== null) continue;

		const printBtn = select(
			`[data-transaction-id="${transactionInfo.transaction_id}"] [data-id="print-btn"]`,
			tableBody
		);

		const transactionData = data.data.find(
			(item) => item.transaction_id === transactionInfo.transaction_id
		);

		printBtn.addEventListener("click", () => printPaymentReceipt(transactionData));
	}
};

fetchAndDisplayTransactions();
