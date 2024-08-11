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
														<td>${itemInfo.vendor_firstname} ${itemInfo.vendor_lastname}</td>
														<td>${itemInfo.ItemName}</td>
														<td class="text-center">${itemInfo.quantity}</td>
														<td>${itemInfo.start_date}</td>
														<td>${itemInfo.end_date}</td>
														<td>${itemInfo.total_price}</td>
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
															<div class="d-flex">
																<a
																	href="#"
																	class="btn btn-primary shadow btn-xs sharp me-1"
																	><i class="fas fa-pencil-alt"></i
																></a>
																<a href="#" class="btn btn-danger shadow btn-xs sharp"
																	><i class="fa fa-trash"></i
																></a>
															</div>
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

	let content = "";

	for (const itemInfo of data.data) {
		content += createItemDetailsRow(itemInfo);
	}

	select("#table-body").insertAdjacentHTML("beforeend", content);
};

userStore.subscribe(({ userInfo }) => fetchUserTransactions(userInfo));
