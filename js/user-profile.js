import { callApi, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createItemDetailsRow = (itemInfo) => `<tr>
														<td class="py-2">
															<div class="form-check custom-checkbox checkbox-success">
																<input type="checkbox" class="form-check-input" id="checkbox" />
																<label class="form-check-label" for="checkbox"></label>
															</div>
														</td>
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
														<td>&#8358;${new Intl.NumberFormat("en-US").format(itemInfo.total_price)}</td>
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

	const htmlContent = data.data
		.map((itemInfo) => createItemDetailsRow(itemInfo))
		.toReversed()
		.join("");

	select("#table-body").insertAdjacentHTML("beforeend", htmlContent);
};

userStore.subscribe(({ userInfo }) => fetchUserTransactions(userInfo));
