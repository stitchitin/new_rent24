import { callApi, select } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createItemDetailsRow = (itemInfo) => `<tr class="btn-reveal-trigger">
												<td class="py-2">
													<div class="form-check custom-checkbox checkbox-success">
														<input type="checkbox" class="form-check-input" id="checkbox" />
														<label class="form-check-label" for="checkbox"></label>
													</div>
												</td>
												<td class="py-2"><strong>${itemInfo.payment_id}</strong></td>
												<td class="py-2">
													<h4>${itemInfo.user_firstname} ${itemInfo.user_lastname}</h4>
												</td>
												<td class="py-2">${itemInfo.ItemName}</td>
												<td class="py-2 text-center">${itemInfo.quantity}</td>
												<td class="py-2">${itemInfo.start_date}</td>
												<td class="py-2">${itemInfo.end_date}</td>
												<td class="py-2">${itemInfo.total_price}</td>
												<td class="py-2">
													<span class="badge light  badge-lg ${itemInfo.status === "Approved" ? "badge-success" : "badge-warning"}">
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
											</tr>`;

const fetchVendorTransactions = async (userInfo) => {
	const { data } = await callApi("backend/rentalsTransaction.php", {
		query: { vendor_id: userInfo.user.user_id },
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

userStore.subscribe(({ userInfo }) => fetchVendorTransactions(userInfo));
