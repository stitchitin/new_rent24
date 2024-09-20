import { callApi, select } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const fetchAndDisplayCategories = async () => {
	const { data } = await callApi("backend/getAllCategories.php");

	if (!data.success) {
		console.error("Failed to fetch categories:", data.message);
		return;
	}

	const flexList = document.getElementById("category");

	data.categories.forEach((category) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `?category_id=${category.category_id}`;
		a.textContent = category.category_name;
		li.append(a);
		flexList.append(li);
	});
};

fetchAndDisplayCategories();

const createCard = (rentalItem) => `
																<div class="card col-lg-12 col-xl-6 col-xxl-4">
																				<div class="card-body">
																								<div class="row m-b-30">
																												<div class="col-md-5 col-xxl-12">
																																<div class="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
																																				<div class="new-arrivals-img-contnent">
																																								<img class="img-fluid" src="${rentalItem.images[0]}" alt="">
																																				</div>
																																</div>
																												</div>
																												<div class="col-md-7 col-xxl-12">
																																<div class="new-arrival-content position-relative">
																																				<h4>
																																				<a href="ecom-product-detail.html?item_id=${rentalItem.ItemID}">${rentalItem.ItemName}</a>
																																				</h4>
																																				<p>Location: <span class="item">${rentalItem.location} </span></p>
																																				<p>Price: <i class="fa fa-check-circle text-success"></i>&#8358;${rentalItem.Price.toLocaleString()}</p>
																																				<p>Number of items: <span class="item">${rentalItem.number_of_items}</span></p>
																																				<p>Availability: <span class="item">${rentalItem.Availability}</span></p>
																																</div>
																												</div></div>
																				</div>
																</div>
												`;

const fetchAndDisplayRentalItems = async (userInfo) => {
	// Get query parameters from the URL
	const category_id = new URLSearchParams(window.location.search).get("category_id");

	const { data } = await callApi("backend/getRentalItems.php", {
		query: category_id && { category_id },
	});

	const rentalsDiv = select("#rental-items");

	if (!data.success) {
		rentalsDiv.insertAdjacentHTML("beforeend", "<p>No rental items found.</p>");
		return;
	}

	const htmlContent = data.data
		.filter((rentalItem) => rentalItem.user_id !== userInfo.user.user_id)
		.map((rentalItem) => createCard(rentalItem))
		.join("");

	rentalsDiv.insertAdjacentHTML("beforeend", htmlContent);
};

// Fetch categories when the page loads
userStore.subscribe(({ userInfo }) => fetchAndDisplayRentalItems(userInfo));
