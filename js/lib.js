import { createFetchClient } from "https://esm.run/@zayne-labs/callapi@0.4.3";

export const callApi = createFetchClient({
	cancelRedundantRequests: false,
});

export * as dateFns from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

import "https://cdn.jsdelivr.net/npm/sweetalert2@11";
export { default as Swal } from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

export const sweetAlert = Swal.fire.bind(Swal);
