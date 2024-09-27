import { callApi, printPaymentReceipt, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const displayAccountDetails = (vendorInfo) => {
	const { MainBalance, BankName, AccountName, AccountNumber } = vendorInfo;

	select("#mainBalance").textContent = MainBalance;
	select("#bankName").textContent = BankName ?? "Not Provided";
	select("#accountName").textContent = AccountName ?? "Not Provided";
	select("#accountNumber").textContent = AccountNumber ?? "Not Provided";
};

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
																	${rentalItem.ItemName}
																	</h4>
																	<p>Location: <span class="item">${rentalItem.location} </span></p>
																	<p>Price: <i class="fa fa-check-circle text-success"></i> &#8358; ${Number(
																		rentalItem.Price
																	).toLocaleString()}</p>
																	<p>Number of items: <span class="item">${rentalItem.number_of_items}</span></p>
																	<p>Availability: <span class="item">${rentalItem.Availability}</span></p>
																	<div class="flex gap-2 mt-4">
																		<a
																			href="additem.html?item_id=${rentalItem.ItemID}"
																			class="btn btn-primary shadow btn-xs sharp me-1"
																			><i class="fas fa-pencil-alt"></i
																		></a>
																		<p>Edit Product Details</p>
																	</div>
																</div>
														</div>
											</div>
						</div>`;

const fetchAndDisplayVendorProducts = async (userId) => {
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
		.filter((rentalItem) => rentalItem.user_id === userId)
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
												<td class="py-2">&#8358; ${itemInfo.total_price.toLocaleString()}</td>
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

const fetchVendorRentingData = async (userId) => {
	const { data } = await callApi("backend/rentalsTransaction.php", {
		query: { vendor_id: userId },
	});

	if (!data.success) {
		sweetAlert({
			title: "Something went wrong",
			text: data.message,
			icon: "error",
		});
		return;
	}

	const tableBody = select("#table-body");

	if (data.data.length === 0) {
		tableBody.insertAdjacentHTML(
			"beforeend",
			`<tr>
				<td>
					<strong>No renting data found</strong>
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
					<strong>No renting data found</strong>
				</td>
			</tr>`
		);

		return;
	}

	const htmlContent = mainData
		.map((itemInfo) => createItemDetailsRow(itemInfo))
		.toReversed()
		.join("");

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

const createTransactionEntry = (transactionInfo) => `<div class="d-flex align-items-center student">
											<div class="icon-box bg-primary me-2">
												<svg
													width="20"
													height="20"
													viewBox="0 0 25 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M24 1.85315C24.0075 1.76443 24.0075 1.67522 24 1.58649L23.88 1.33315C23.88 1.33315 23.88 1.23982 23.8133 1.19982L23.7467 1.13315L23.5333 0.95982C23.475 0.90049 23.4075 0.850965 23.3333 0.813154L23.1067 0.733154H22.84H1.24H0.973333L0.746667 0.826487C0.672327 0.85818 0.604514 0.903389 0.546667 0.95982L0.333333 1.13315C0.333333 1.13315 0.333333 1.13315 0.333333 1.19982C0.333333 1.26649 0.333333 1.29315 0.266667 1.33315L0.146667 1.58649C0.13912 1.67522 0.13912 1.76443 0.146667 1.85315L0 1.99982V17.9998C0 18.3534 0.140476 18.6926 0.390524 18.9426C0.640573 19.1927 0.979711 19.3332 1.33333 19.3332H13.3333C13.687 19.3332 14.0261 19.1927 14.2761 18.9426C14.5262 18.6926 14.6667 18.3534 14.6667 17.9998C14.6667 17.6462 14.5262 17.3071 14.2761 17.057C14.0261 16.807 13.687 16.6665 13.3333 16.6665H2.66667V4.66649L11.2 11.0665C11.4308 11.2396 11.7115 11.3332 12 11.3332C12.2885 11.3332 12.5692 11.2396 12.8 11.0665L21.3333 4.66649V16.6665H18.6667C18.313 16.6665 17.9739 16.807 17.7239 17.057C17.4738 17.3071 17.3333 17.6462 17.3333 17.9998C17.3333 18.3534 17.4738 18.6926 17.7239 18.9426C17.9739 19.1927 18.313 19.3332 18.6667 19.3332H22.6667C23.0203 19.3332 23.3594 19.1927 23.6095 18.9426C23.8595 18.6926 24 18.3534 24 17.9998V1.99982C24 1.99982 24 1.90649 24 1.85315ZM12 8.33315L5.33333 3.33315H18.6667L12 8.33315Z"
														fill="#FCFCFC"
													/>
												</svg>
											</div>
											<div class="user-info">
												<h6 class="name"><a href="user-profile.html">Rent24</a></h6>
												<span class="fs-14 font-w400 text-wrap">${transactionInfo.status}</span>
											</div>
											<div class="ms-auto text-center">
												<span class="d-block">${transactionInfo.time}</span>
												<b>₦ ${transactionInfo.transaction_amount}</b>
											</div>
										</div>`;

const fetchAndDisplayTransactionHistory = async (userId) => {
	const { data } = await callApi("backend/transactionHistoryAPI.php", {
		query: { user_id: userId },
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
		select("#transaction-body").insertAdjacentHTML(
			"beforeend",
			`<p>
				<strong>No transaction history found</strong>
			</p>`
		);

		return;
	}

	const htmlContent = data.data
		.map((transactionInfo) => createTransactionEntry(transactionInfo))
		.join("");

	select("#transaction-body").replaceChildren();

	select("#transaction-body").insertAdjacentHTML("beforeend", htmlContent);
};

const toggleLoader = (action) => {
	if (action === "disable") {
		select("#submit-btn").setAttribute("disabled", true);
		select("#submit-btn").classList.add("disabled");
		select("#submit-btn").insertAdjacentHTML("beforeend", '<span class="button-loader"></span>');
	}

	if (action === "enable") {
		select("#submit-btn").classList.remove("disabled");
		select("#submit-btn").removeAttribute("disabled");
		select("#submit-btn .button-loader").remove();
	}
};

const handleWithdrawalRequest = (userId, vendorInfo) => async (event) => {
	event.preventDefault();

	toggleLoader("disable");

	const formObject = Object.fromEntries(new FormData(event.target));

	if (Number(formObject.request_amount) <= 0) {
		toggleLoader("enable");
		sweetAlert({ icon: "error", text: "Withdrawal amount must be above zero" });
		return;
	}

	const { data } = await callApi("backend/requestWithdrawal.php", {
		method: "POST",
		body: {
			...formObject,
			user_id: userId,
		},
	});

	if (!data.success) {
		toggleLoader("enable");

		sweetAlert({ icon: "error", text: `Withdrawal request failed: ${data.message}` });

		console.error("Withdrawal request failed:", data.message);

		return;
	}

	event.target.reset();

	toggleLoader("enable");

	select("#close-btn").click();

	sweetAlert({ icon: "success", text: data.message });

	displayAccountDetails(vendorInfo);
	fetchAndDisplayTransactionHistory(userId);
};

userStore.subscribe(({ userInfo }) => {
	fetchVendorRentingData(userInfo.user.user_id);
	fetchAndDisplayVendorProducts(userInfo.user.user_id);
	displayAccountDetails(userInfo.vendor);
	fetchAndDisplayTransactionHistory(userInfo.user.user_id);

	select("#withdrawal-form").addEventListener(
		"submit",
		handleWithdrawalRequest(userInfo.user.user_id, userInfo.vendor)
	);
});
