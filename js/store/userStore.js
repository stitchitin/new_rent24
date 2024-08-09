import { callApi, createStore } from "../lib/index.js";

const userStore = createStore((get, set) => ({
	userInfo: null,

	actions: {
		getUserInformation: async (userCookie) => {
			const user = userCookie ? JSON.parse(userCookie) : null;

			/**
			 * @import { UserInfo } from "./global.d"
			 *
			 * @type {{ data: UserInfo }}
			 */
			const { data, error } = await callApi("backend/user_files.php", {
				query: { email: user?.email },
				// cancelRedundantRequests: false,
			});

			if (error) {
				console.error(error.errorData); // Log the error message

				return;
			}

			if (!data.success) {
				// Handle error messages from the API
				console.error("API Error:", data.message); // Log the error message

				sweetAlert({ icon: "error", text: `Error fetching user data: ${data.message}` }); // Display an error message

				return;
			}

			set({ userInfo: data });
		},
	},
}));

const userStoreActions = userStore.getState().actions;

export { userStore, userStoreActions };
