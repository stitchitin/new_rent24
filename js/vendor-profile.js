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
												<td class="py-2 text-end">
													<div class="dropdown text-sans-serif">
														<button
															class="btn btn-primary tp-btn-light sharp"
															type="button"
															id="order-dropdown-0"
															data-bs-toggle="dropdown"
															data-boundary="viewport"
															aria-haspopup="true"
															aria-expanded="false"
														>
															<span>
																<svg
																	width="22"
																	height="22"
																	viewBox="0 0 22 22"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M8.47908 4.58333C8.47908 3.19 9.60659 2.0625 10.9999 2.0625C12.3933 2.0625 13.5208 3.19 13.5208 4.58333C13.5208 5.97667 12.3933 7.10417 10.9999 7.10417C9.60658 7.10417 8.47908 5.97667 8.47908 4.58333ZM12.1458 4.58333C12.1458 3.95083 11.6324 3.4375 10.9999 3.4375C10.3674 3.4375 9.85408 3.95083 9.85408 4.58333C9.85408 5.21583 10.3674 5.72917 10.9999 5.72917C11.6324 5.72917 12.1458 5.21583 12.1458 4.58333Z"
																		fill="var(--primary)"
																	/>
																	<path
																		d="M8.47908 17.4163C8.47908 16.023 9.60659 14.8955 10.9999 14.8955C12.3933 14.8955 13.5208 16.023 13.5208 17.4163C13.5208 18.8097 12.3933 19.9372 10.9999 19.9372C9.60658 19.9372 8.47908 18.8097 8.47908 17.4163ZM12.1458 17.4163C12.1458 16.7838 11.6324 16.2705 10.9999 16.2705C10.3674 16.2705 9.85408 16.7838 9.85408 17.4163C9.85408 18.0488 10.3674 18.5622 10.9999 18.5622C11.6324 18.5622 12.1458 18.0488 12.1458 17.4163Z"
																		fill="var(--primary)"
																	/>
																	<path
																		d="M8.47908 11.0003C8.47908 9.60699 9.60659 8.47949 10.9999 8.47949C12.3933 8.47949 13.5208 9.60699 13.5208 11.0003C13.5208 12.3937 12.3933 13.5212 10.9999 13.5212C9.60658 13.5212 8.47908 12.3937 8.47908 11.0003ZM12.1458 11.0003C12.1458 10.3678 11.6324 9.85449 10.9999 9.85449C10.3674 9.85449 9.85408 10.3678 9.85408 11.0003C9.85408 11.6328 10.3674 12.1462 10.9999 12.1462C11.6324 12.1462 12.1458 11.6328 12.1458 11.0003Z"
																		fill="var(--primary)"
																	/>
																</svg>
															</span>
														</button>
														<div
															class="dropdown-menu dropdown-menu-end border py-0"
															aria-labelledby="order-dropdown-0"
														>
															<div class="py-2">
																<a class="dropdown-item" href="javascript:void(0);"
																	>Completed</a
																>
																<a class="dropdown-item" href="javascript:void(0);"
																	>Processing</a
																>
																<a class="dropdown-item" href="javascript:void(0);"
																	>On Hold</a
																>
																<a class="dropdown-item" href="javascript:void(0);"
																	>Pending</a
																>
																<div class="dropdown-divider"></div>
																<a
																	class="dropdown-item text-danger"
																	href="javascript:void(0);"
																	>Delete</a
																>
															</div>
														</div>
													</div>
												</td>
											</tr>`;

const fetchVendorTransactions = async (userInfo) => {
	const { data } = await callApi("backend/rentalsTransaction.php", {
		query: { vendor_id: userInfo.user.vendor_id },
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

userStore.subscribe(({ userInfo }) => fetchVendorTransactions(userInfo));
