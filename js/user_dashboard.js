import { callApi, select } from "./lib/index.js";

const appendCategoriesToList = async () => {
	const { data } = await callApi("backend/getAllCategories.php");

	if (!data.success) {
		console.error("Failed to fetch categories:", data.message);
		return;
	}

	data.categories.forEach((category) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `?category_id=${category.category_id}`;
		a.textContent = category.category_name;
		li.append(a);
		select("#category").append(li);
	});
};

appendCategoriesToList();

const fetchAndDisplayCategories = async () => {
	// Get query parameters from the URL
	const category_id = new URLSearchParams(window.location.search).get("category_id");

	const { data, error } = await callApi("backend/getRentalItems.php", {
		query: category_id && { category_id },
	});

	if (error) {
		console.error("Error fetching categories:", error);
		return;
	}

	if (!data.success) {
		select("#category").insertAdjacentHTML("beforeend", "<p>No categories found.</p>");

		return;
	}

	const nairaSymbol = "&#8358;";

	data.data.forEach((category) => {
		const categoryElement = document.createElement("div");
		categoryElement.className = "col-lg-12 col-xl-6 col-xxl-4";
		categoryElement.insertAdjacentHTML(
			"beforeend",
			`
																<div class="card">
																				<div class="card-body">
																								<div class="row m-b-30">
																												<div class="col-md-5 col-xxl-12">
																																<div class="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
																																				<div class="new-arrivals-img-contnent">
																																								<img class="img-fluid" src="${category.images[0]}" alt="">
																																				</div>
																																</div>
																												</div>
																												<div class="col-md-7 col-xxl-12">
																																<div class="new-arrival-content position-relative">
																																				<h4>
																																				<a href="ecom-product-detail.html?item_id=${category.ItemID}">${category.ItemName}</a>
																																				</h4>
																																				<p>Location: <span class="item">${category.location} </span></p>
																																				<p>Price: <i class="fa fa-check-circle text-success"></i> ${nairaSymbol} ${category.Price}</p>
																																				<p>Number of items: <span class="item">${category.number_of_items}</span></p>
																																				<p>Availability: <span class="item">${category.Availability}</span></p>
																																</div>
																												</div></div>
																				</div>
																</div>
												`
		);

		select("#category").append(categoryElement);
	});
};

fetchAndDisplayCategories();
