import { callApi, select } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createItemDetailsRow = (itemInfo) => `<tr>
														<td>
															<div
																class="form-check custom-checkbox checkbox-success check-lg me-3"
															>
																<input
																	type="checkbox"
																	class="form-check-input"
																	id="customCheckBox2"
																	required=""
																/>
																<label
																	class="form-check-label"
																	for="customCheckBox2"
																></label>
															</div>
														</td>
														<td><strong>${itemInfo.payment_id}</strong></td>
														<td>${itemInfo.ItemName}</td>
														<td class="text-center">${itemInfo.quantity}</td>
														<td>${itemInfo.start_date}</td>
														<td>${itemInfo.end_date}</td>
														<td>${itemInfo.vendor_firstname} ${itemInfo.vendor_lastname}</td>
														<td>${itemInfo.total_price}</td>
														<td>${itemInfo.status}</td>

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
													</tr>`;

const fetchUserTransactions = async (userInfo) => {
	const { data } = await callApi("backend/rentalsTransaction.php", {
		query: { user_id: userInfo.user.user_id },
	});

	if (!data.success) {
		select("#table-body").insertAdjacentHTML(
			"beforeend",
			`<tr><td colspan="10">No transaction data found</td></tr>`
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
