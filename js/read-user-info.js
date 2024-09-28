import { callApi, select, sweetAlert } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const user_id = new URLSearchParams(window.location.search).get("user_id");

const formatLabel = (key) => {
	return key
		.split("_")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
};

const createInfoField = (key, value) => `
					<div class="info-label">${formatLabel(key)}:</div>
					<div class="info-value">${value}</div>
				`;

const changeStatusFormHtml = `
										<div class="col-sm-6 m-b30">
											<label class="font-semibold text-[18px]">Change User Status</label>
											<select name="new_status" class="selectpicker form-control">
											<option value="vendor">Vendor</option>
											<option value="user">User</option>
											<option value="admin">Admin</option>
											</select>
										</div>

									<button type="submit" class="btn btn-primary mt-2" id="submit-btn">Update</button>
`;

const fetchDisplayUserDetails = async () => {
	const { data, error } = await callApi("backend/readUserInfo.php", {
		query: { user_id },
	});

	if (error) {
		console.error("Fetch error:", error);
		sweetAlert({ icon: "error", text: "An error occurred while fetching transaction details." });
		return;
	}

	if (!data.success) {
		sweetAlert({ icon: "error", text: data.message });
		return;
	}

	const htmlContent = Object.entries(data.data)
		.map(([key, value]) => createInfoField(key, value))
		.join("");

	select("#info-grid").insertAdjacentHTML("beforeend", htmlContent);

	const changeStatusForm = select("#change-status-form");

	changeStatusForm.insertAdjacentHTML("beforeend", changeStatusFormHtml);

	changeStatusForm.elements[0].value = data.data.privilege;

	const onSubmit = async (event) => {
		event.preventDefault();

		const formDataObject = Object.fromEntries(new FormData(event.target));

		const { data, error } = await callApi("backend/changeUserStatus.php", {
			method: "POST",
			body: {
				...formDataObject,
				user_id,
			},
		});

		if (error) {
			console.error("Fetch error:", error);
			sweetAlert({ icon: "error", text: "An error occurred while changing user status." });
			return;
		}

		if (!data.success) {
			sweetAlert({ icon: "error", text: data.message });
			return;
		}

		sweetAlert({ icon: "success", text: data.message });

		window.location.href = "admin-user-list.html";
	};

	changeStatusForm.addEventListener("submit", onSubmit);
};

fetchDisplayUserDetails();

userStore.subscribe(({ userInfo }) => {
	changeStatusForm.addEventListener("submit", handleSubmit(userInfo.user.user_id));
});
