import { sweetAlert } from "./index.js";

const generateReceiptHTML = (paymentData) => {
	const generateStyles = () => `
					<style>
						body {
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
							line-height: 1.6;
							color: #333;
							max-width: 800px;
							margin: 0 auto;
							padding: 20px;
							background-color: #f5f5f5;
						}
						h1 {
							color: #2c3e50;
							border-bottom: 2px solid #3498db;
							padding-bottom: 10px;
						}
						.info-grid {
							display: grid;
							grid-template-columns: auto 1fr;
							gap: 15px;
							margin-top: 20px;
						}
						.info-label {
							font-weight: 600;
							display: flex;
							align-items: center;
							color: #2980b9;
						}
						.info-value {
							background-color: #ffffff;
							padding: 8px 12px;
							border-radius: 4px;
							box-shadow: 0 1px 3px rgba(0,0,0,0.1);
						}
						@media print {
							body { max-width: 100%; background-color: #ffffff; }
							.info-value { box-shadow: none; }
						}
					</style>
				`;

	const formatLabel = (key) => {
		return key
			.split("_")
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(" ");
	};

	const generateContent = (paymentData) => {
		const relevantFields = Object.keys(paymentData).filter((key) => !key.includes("vendor"));

		return relevantFields
			.map(
				(key) => `
					<div class="info-label">${formatLabel(key)}:</div>
					<div class="info-value">${paymentData[key]}</div>
				`
			)
			.join("");
	};

	return `
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Rent24 Receipt - ${paymentData.payment_id}</title>
						${generateStyles()}
						<script>
							const printReceipt = () => {
								window.print();
								setTimeout(() => window.close(), 300);
							};

							document.addEventListener("DOMContentLoaded", printReceipt)
						</script>
					</head>
					<body>
						<h1>Rent24 - Payment Receipt</h1>
						<div class="info-grid">${generateContent(paymentData)}</div>

					</body>
					</html>
				`;
};

export const printPaymentReceipt = (paymentData) => {
	const printWindow = window.open("", "_blank");

	if (!printWindow) {
		sweetAlert({
			title: "Unable to open new window",
			text: "Please check your popup blocker settings.",
			icon: "error",
		});

		return;
	}

	printWindow.document.write(generateReceiptHTML(paymentData));
	printWindow.document.close();
};
