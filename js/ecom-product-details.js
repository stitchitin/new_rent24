import { callApi, dateFns, select, sweetAlert, waitUntil } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

/**
 * @import { SuccessData } from "./global.d"
 *
 * @type { SuccessData["data"] }
 */
let productItem;

const fetchAndDisplayDetails = async () => {
	const item_id = new URLSearchParams(window.location.search).get("item_id");

	/**
	 *  @type {{ data: SuccessData, error: { errorData: { success:boolean,message:string }} }}
	 */
	const { data } = await callApi("backend/getItemById.php", {
		query: item_id && { item_id },
	});

	if (!data.success) {
		select("#product-details-container").insertAdjacentElement(
			"beforeend",
			"<p>No details provided.</p>"
		);

		console.error("Error fetching details:", data.message);

		return;
	}

	productItem = data.data;

	select("input[name=quantity]")?.setAttribute("max", productItem.number_of_items);

	select("#product-images-container").insertAdjacentHTML(
		"beforeend",
		`<div class="tab-content" id="myTabContent">
				<div
				 class="tab-pane fade show active"
				 id="home-tab-pane"
				 role="tabpanel"
				 aria-labelledby="home-tab"
				 tabindex="0"
				>
				 <img class="img-fluid rounded" src=${productItem.images[0]} alt="" />
				</div>
				<div
				 class="tab-pane fade"
				 id="profile-tab-pane"
				 role="tabpanel"
				 aria-labelledby="profile-tab"
				 tabindex="0"
				>
				 <img class="img-fluid rounded" src=${productItem.images[1]} alt="" />
				</div>
				<div
				 class="tab-pane fade"
				 id="contact-tab-pane"
				 role="tabpanel"
				 aria-labelledby="contact-tab"
				 tabindex="0"
				>
				 <img class="img-fluid rounded" src=${productItem.images[2]} alt="" />
				</div>
				<div
				 class="tab-pane fade"
				 id="end-tab-pane"
				 role="tabpanel"
				 aria-labelledby="end-tab"
				 tabindex="0"
				>
				 <img class="img-fluid rounded" src=${productItem.images[3]} alt="" />
				</div>
			  </div>
			  <ul class="nav nav-tabs product-detail" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
				 <button
				  class="nav-link active"
				  id="home-tab"
				  data-bs-toggle="tab"
				  data-bs-target="#home-tab-pane"
				  type="button"
				  role="tab"
				  aria-controls="home-tab-pane"
				  aria-selected="true"
				 >
				  <img
					class="img-fluid me-2 rounded"
					src=${productItem.images[0]}
					alt=""
					width="80"
				  />
				 </button>
				</li>
				<li class="nav-item" role="presentation">
				 <button
				  class="nav-link"
				  id="profile-tab"
				  data-bs-toggle="tab"
				  data-bs-target="#profile-tab-pane"
				  type="button"
				  role="tab"
				  aria-controls="profile-tab-pane"
				  aria-selected="false"
				 >
				  <img
					class="img-fluid me-2 rounded"
					src=${productItem.images[1]}
					alt=""
					width="80"
				  />
				 </button>
				</li>
				<li class="nav-item" role="presentation">
				 <button
				  class="nav-link"
				  id="contact-tab"
				  data-bs-toggle="tab"
				  data-bs-target="#contact-tab-pane"
				  type="button"
				  role="tab"
				  aria-controls="contact-tab-pane"
				  aria-selected="false"
				 >
				  <img
					class="img-fluid me-2 rounded"
					src=${productItem.images[2]}
					alt=""
					width="80"
				  />
				 </button>
				</li>
				<li class="nav-item" role="presentation">
				 <button
				  class="nav-link"
				  id="end-tab"
				  data-bs-toggle="tab"
				  data-bs-target="#end-tab-pane"
				  type="button"
				  role="tab"
				  aria-controls="end-tab-pane"
				  aria-selected="false"
				 >
				  <img
					class="img-fluid rounded"
					src=${productItem.images[3]}
					alt=""
					width="80"
				  />
				 </button>
				</li>
			  </ul>
			 </div>`
	);

	select("#product-details").insertAdjacentHTML(
		"beforeend",
		`<h4>${productItem.ItemName}</h4>
		<div class="d-table mb-2">
			<p class="price float-start d-block">&#8358; ${new Intl.NumberFormat("en-US").format(
				productItem.Price
			)}</p>
		</div>

		<p>
			Availability:
			<span class="item">
				${productItem.Availability} <i class="fa fa-shopping-basket"></i></span>
		</p>

		<p>Vendor: <span class="item">${productItem.vendor_firstname}</span></p>

		<p>Number of items: <span class="item">${productItem.number_of_items}</span></p>

		<div class="text-content">
			<h3> Description </h3>
			<p>
				${productItem.Description ?? "No description provided"}
			</p>
		</div>`
	);

	select("#rent-button").insertAdjacentHTML(
		"beforeend",
		`<a
			class="btn btn-primary"
			href="javascript:void(0);"
			data-bs-toggle="modal"
			data-bs-target="#exampleModalpopover"
			>
			<i class="me-2" style="font-size: 20px"></i>Rent
			</a>
		`
	);
};

fetchAndDisplayDetails();

const handlePaymentFormSubmit = (userInfo) => async (event) => {
	event.preventDefault();

	const user = userInfo?.user;

	const formObject = Object.fromEntries(new FormData(event.target));

	try {
		const formattedStartDate = dateFns.format(new Date(formObject.startDate), "yyyy-MM-dd");
		const formattedEndDate = dateFns.format(new Date(formObject.endDate), "yyyy-MM-dd");

		Reflect.set(formObject, "startDate", formattedStartDate);
		Reflect.set(formObject, "endDate", formattedEndDate);
	} catch (error) {
		sweetAlert({ icon: "info", text: "Please select a valid date" });
		return;
	}

	formObject.quantity === ""
		? Reflect.set(formObject, "quantity", 1)
		: Reflect.set(formObject, "quantity", Number(formObject.quantity));

	const paymentId = `PAY-${crypto.randomUUID().slice(0, 10)}`;

	const { user_id, email } = user;

	const totalPrice = productItem.Price * formObject.quantity;

	const { data } = await callApi("backend/rentItem.php", {
		method: "POST",
		body: {
			...formObject,
			paymentId,
			vendorId: productItem.vendor_id,
			itemId: productItem.ItemID,
			userId: user_id,
			totalPrice,
		},
	});

	event.target.reset();

	select("#close-btn").click();

	if (!data.success) {
		sweetAlert({ icon: "error", text: `Error adding product: ${data.message}` });

		console.error("Error adding product:", data.message);

		return;
	}

	const handler = PaystackPop.setup({
		key: "pk_test_184f668934e96a5ee9f57ed22de795bc0379a2b4",
		email,
		amount: totalPrice * 100,
		ref: paymentId,

		onClose: () => {
			sweetAlert("Payment window closed");
		},

		callback: (response) => {
			sweetAlert({ icon: "success", text: `Payment complete! Reference: ${response.reference}` });

			callApi("backend/callbackrentItem.php", {
				method: "POST",
				body: {
					email,
					amount: totalPrice,
					callbackUrl: "https://www.google.com",
					metadata: "cancel-page.html",
					paymentId,
				},

				onResponse: async () => {
					await waitUntil(500);

					window.location.href = "user-profile.html";
				},
			});
		},
	});

	handler.openIframe();
};

userStore.subscribe(({ userInfo }) => {
	select("#product-form").addEventListener("submit", (event) =>
		handlePaymentFormSubmit(userInfo)(event)
	);
});
