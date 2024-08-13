import { callApi, printPaymentReceipt, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createProductCard = (rentalItem) => `
						<div class="card-body w-[300px] shrink-0">
										<div class="m-b-30 space-y-[30px] w-full">
														<div class="col-md-5 col-xxl-12 w-full">
																		<div class="new-arrival-product mb-4 mb-xxl-4 mb-md-0 w-full">
																						<div class="new-arrivals-img-contnent w-full">
																										<img class="w-full h-[170px] object-cover" src="${rentalItem.images[0]}" alt="">
																						</div>
																		</div>
														</div>
														<div class="col-md-7 col-xxl-12">
																<div class="new-arrival-content position-relative">
																	<h4>
																	<a href="ecom-product-detail.html?item_id=${rentalItem.ItemID}">${rentalItem.ItemName}</a>
																	</h4>
																	<p>Location: <span class="item">${rentalItem.location} </span></p>
																	<p>Price: <i class="fa fa-check-circle text-success"></i> &#8358; ${rentalItem.Price}</p>
																	<p>Number of items: <span class="item">${rentalItem.number_of_items}</span></p>
																	<p>Availability: <span class="item">${rentalItem.Availability}</span></p>
																	<div class="flex gap-2 mt-4">
																		<a
																			href="add-item.html"
																			class="btn btn-primary shadow btn-xs sharp me-1"
																			><i class="fas fa-pencil-alt"></i
																		></a>
																		<p>Edit Product Details</p>
																	</div>
																</div>
														</div>
											</div>
						</div>`;

const fetchAndDisplayVendorProducts = async (userInfo) => {
	// Get query parameters from the URL if available
	const category_id = new URLSearchParams(window.location.search).get("category_id");

	const { data } = await callApi("backend/getRentalItems.php", {
		query: category_id && { category_id },
	});

	const vendorProductDiv = select("#vendor-products");

	if (!data.success) {
		vendorProductDiv.insertAdjacentHTML("beforeend", "<p>No rental items found.</p>");
		return;
	}

	const htmlContent = data.data
		.filter((rentalItem) => rentalItem.user_id === userInfo.user.user_id)
		.map((rentalItem) => createProductCard(rentalItem))
		.join("");

	vendorProductDiv.insertAdjacentHTML("beforeend", htmlContent);
};

const createItemDetailsRow = (itemInfo) => `<tr data-payment-id="${itemInfo.payment_id}">
												<td class="py-2"><strong>${itemInfo.payment_id}</strong></td>
												<td class="py-2">
														<strong>${itemInfo.user_firstname} ${itemInfo.user_lastname}</strong>
														<br>
														${itemInfo.user_phone_number}
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
													<button data-id="print-btn" class="btn btn-success shadow btn-xs sharp">
														<i class="fa fa-print"></i>
													</button>
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

userStore.subscribe(({ userInfo }) => {
	fetchVendorTransactions(userInfo);
	fetchAndDisplayVendorProducts(userInfo);
});
