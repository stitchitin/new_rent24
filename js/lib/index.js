import { createFetchClient } from "https://esm.run/@zayne-labs/callapi@1.5.1";

export const callApi = createFetchClient();

export * as dateFns from "https://esm.run/date-fns@3.6.0";

import "https://esm.run/sweetalert2@11";
import { default as Swal } from "https://esm.run/sweetalert2@11";

export const sweetAlert = (value) => Swal.fire(value);

export * from "./utils.js";

export * from "./typeof.js";

export { printPaymentReceipt } from "./printReceipt.js";

export * from "./createStore/index.js";

import "https://cdn.twind.style";
