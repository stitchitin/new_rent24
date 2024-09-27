import { callApi, select } from "./lib/index.js";
import { userStore } from "./store/userStore.js";

const createNotificationListItem = (notificationInfo) => `
								<li>
									<div class="timeline-panel">
										<div class="media me-2 media-success">
											${notificationInfo.subject
												.split(" ")
												.map((word) => word[0])
												.join("")}
										</div
										<div class="media-body">
											<h5 class="mb-1">${notificationInfo.subject}</h5>
											<p>${notificationInfo.details}</p>
											<small class="d-block">${notificationInfo.created_at}</small>
										</div>
										<a href="javascript:void(0);" class="btn btn-danger btn-xs sharp"
											><i class="fa fa-trash"></i
										></a>
									</div>
								</li>
	`;

export const fetchAndDisplayNotifications = async (userId) => {
	const { data } = await callApi("backend/notificationHistory.php", {
		query: { user_id: userId },
	});

	if (!data.success) {
		console.error("Failed to get notifications:", data.message);

		return;
	}

	const htmlContentForAll = data.data
		.map((notificationInfo) => createNotificationListItem(notificationInfo))
		.join("");

	const htmlContentForUnread = data.data
		.filter((notificationInfo) => notificationInfo.status === "Unread")
		.map((notificationInfo) => createNotificationListItem(notificationInfo))
		.join("");

	select("#notification-list").insertAdjacentHTML("beforeend", htmlContentForAll);
	select("#unread-notification-list").insertAdjacentHTML("beforeend", htmlContentForUnread);
};

userStore.subscribe(({ userInfo }) => fetchAndDisplayNotifications(userInfo.user.user_id));
