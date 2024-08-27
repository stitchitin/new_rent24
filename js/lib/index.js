export { callApi } from "https://esm.run/@zayne-labs/callapi@0.6.0";

export * as dateFns from "https://esm.run/date-fns@3.6.0";

import "https://esm.run/sweetalert2@11";
import { default as Swal } from "https://esm.run/sweetalert2@11";

// /* Tailwind via
//  * LINK - https://twind.style/installation#twind-cdn
//  */
// import "https://cdn.tailwindcss.com";

export const sweetAlert = (value) => Swal.fire(value);

export * from "./utils.js";

export * from "./typeof.js";

export { printPaymentReceipt } from "./printReceipt.js";

export * from "./createStore/index.js";
