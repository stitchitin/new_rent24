import { callApi, select } from "./lib/index.js";

const createNotificationListItem = (notificationInfo) => `
								<li class="timeline-panel">
										<div class="media me-2 media-success">
											${notificationInfo.subject
												.split(" ")
												.map((word) => word[0])
												.join("")}
										</div

									<div>
											<div class="ml-2">
												<h5 class="mb-1">${notificationInfo.subject}</h5>
												<p class="mb-1">${notificationInfo.details}</p>
												<small class="d-block ">${notificationInfo.created_at}</small>
											</div>
									</div>

										<a href="javascript:void(0);" class="btn ml-auto btn-danger btn-xs sharp"
											><i class="fa fa-trash"></i
										></a>
								</li>
	`;

const createNotificationIconItem = (notificationInfo) => `
								<li class="timeline-panel">
											<div class="media me-2 media-success">
												${notificationInfo.subject
													.split(" ")
													.map((word) => word[0])
													.join("")}
											</div

											<div>
												<div>
													<h5 class="mb-1">${notificationInfo.subject}</h5>
													<p class="mb-1">${notificationInfo.details}</p>
												</div>
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

	const unreadData = data.data.filter((notificationInfo) => notificationInfo.status === "Unread");

	if (window.location.pathname.endsWith("notification.html")) {
		for (const notificationInfo of unreadData) {
			callApi("backend/readNotification.php", {
				method: "POST",
				body: { notification_id: notificationInfo.id },
			});
		}

		const htmlContentForAll = data.data
			.map((notificationInfo) => createNotificationListItem(notificationInfo))
			.join("");

		select("#notification-list").insertAdjacentHTML("beforeend", htmlContentForAll);
	}

	const htmlContentForUnread = unreadData
		.map((notificationInfo) => createNotificationIconItem(notificationInfo))
		.join("");

	select("#unread-notification-list").insertAdjacentHTML("beforeend", htmlContentForUnread);
};
