import { callApi } from "./lib.js";
import { user } from "./checkcookies.js";

console.log(user);

const fetchDetails = async () => {
	const item_id = new URLSearchParams(window.location.search).get("item_id");

	const { data, error } = await callApi("backend/getItemById.php", {
		query: item_id && { item_id },
	});

	if (error) {
		console.error("Error fetching details:", error);
		return;
	}

	// displayDetails(data);
};

fetchDetails();

const displayDetails = (data) => {
	const detailsContainer = document.querySelector("#detail-container");
	const productImagesContainer = document.querySelector("#product-images-container");

	if (!data.success) {
		detailsContainer.innerHTML = "<p>No details provided.</p>";

		return;
	}

	const nairaSymbol = "&#8358;";

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
													<img class="img-fluid rounded" src="images/Rectangle 37.png" alt="" />
												</div>
												<div
													class="tab-pane fade"
													id="end-tab-pane"
													role="tabpanel"
													aria-labelledby="end-tab"
													tabindex="0"
												>
													<img class="img-fluid rounded" src="images/Rectangle 37.png" alt="" />
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
															src="images/uni.jpg"
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
															src="images/uni.jpg"
															alt=""
															width="80"
														/>
													</button>
												</li>
											</ul>
										</div>`;
};
