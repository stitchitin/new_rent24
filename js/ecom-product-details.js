import { callApi } from "./lib.js";

const fetchDetails = async () => {
	const item_id = new URLSearchParams(window.location.search).get("item_id");

	const { data, error } = await callApi("backend/getItemById.php", {
		query: item_id && { item_id },
	});

	if (error) {
		console.error("Error fetching details:", error);
		return;
	}

	displayDetails(data);
};

document.addEventListener("DOMContentLoaded", fetchDetails);

const displayDetails = (data) => {
	const productImagesContainer = document.querySelector("#product-images-container");

	const productDetails = document.querySelector("#product-details");

	const rentButton = document.querySelector("#rent-button");

	if (!data.success) {
		detailsContainer.innerHTML = "<p>No details provided.</p>";

		return;
	}

	productImagesContainer.innerHTML = `<div class="tab-content" id="myTabContent">
												<div
													class="tab-pane fade show active"
													id="home-tab-pane"
													role="tabpanel"
													aria-labelledby="home-tab"
													tabindex="0"
												>
													<img class="img-fluid rounded" src=${data.data.images[0]} alt="" />
												</div>
												<div
													class="tab-pane fade"
													id="profile-tab-pane"
													role="tabpanel"
													aria-labelledby="profile-tab"
													tabindex="0"
												>
													<img class="img-fluid rounded" src=${data.data.images[1]} alt="" />
												</div>
												<div
													class="tab-pane fade"
													id="contact-tab-pane"
													role="tabpanel"
													aria-labelledby="contact-tab"
													tabindex="0"
												>
													<img class="img-fluid rounded" src=${data.data.images[2]} alt="" />
												</div>
												<div
													class="tab-pane fade"
													id="end-tab-pane"
													role="tabpanel"
													aria-labelledby="end-tab"
													tabindex="0"
												>
													<img class="img-fluid rounded" src=${data.data.images[3]} alt="" />
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
															src=${data.data.images[0]}
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
															src=${data.data.images[1]}
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
															src=${data.data.images[2]}
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
															src=${data.data.images[3]}
															alt=""
															width="80"
														/>
													</button>
												</li>
											</ul>
										</div>`;

	const nairaSymbol = "&#8358;";

	productDetails.innerHTML = `
													<h4>${data.data.ItemName}</h4>
													<div class="d-table mb-2">
														<p class="price float-start d-block">${nairaSymbol} ${data.data.Price}</p>
													</div>
													<p>
														Availability:
														<span class="item">
															${data.data.Availability} <i class="fa fa-shopping-basket"></i
														></span>
													</p>
													<p>Vendor: <span class="item">John</span></p>
													<p>Number of items: <span class="item">${data.data.number_of_items}</span></p>

													<div class="text-content">
														<h3> Description </h3>
														<p>
															${data.data.Description ?? "No description provided"}
														</p>
													</div>
													`;

	rentButton.innerHTML = `<a
										class="btn btn-primary"
										href="javascript:void(0);"
										data-bs-toggle="modal"
										data-bs-target="#exampleModalpopover"
										>
											<i class="me-2" style="font-size: 20px"></i>Rent
										</a>
								`;
};

const productForm = document.querySelector("#product-form");

/**
 *
 * @param {SubmitEvent} event
 */
const handleSubmit = async (event) => {
	event.preventDefault();

	console.log(event);
};

productForm.addEventListener("submit", handleSubmit);
