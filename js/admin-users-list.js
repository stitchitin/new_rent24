import { callApi, select } from "./lib/index.js";

const createUserRow = (userInfo) => `<tr data-transaction-id="${userInfo.user_id}">
														<td>${userInfo.user_id}</td>
														<td><strong>${userInfo.username}</strong></td>
														<td>${userInfo.email}</td>
														<td>${userInfo.privilege}</td>
														<td>${userInfo.registration_date}</td>
														<td>
																<a
																		href="read-user-info.html?user_id=${userInfo.user_id}"
																	>
																		User info
																</a>
														</td>
													</tr>
													`;

const fetchUsersAndDisplay = async () => {
	const { data } = await callApi("backend/listOfUsers.php");

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
	}

	const htmlContent = data.data.map((transactionInfo) => createUserRow(transactionInfo)).join("");

	const tableBody = select("#table-body");

	tableBody.insertAdjacentHTML("beforeend", htmlContent);
};

fetchUsersAndDisplay();
