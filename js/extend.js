const fetchHeaderAndAppendToHtml = () => {
	fetch("unique/header.html")
		.then((response) => response.text())
		.then((headerHtml) => {
			document.getElementById("header").insertAdjacentHTML("beforeend", headerHtml);
		})
		.catch((error) => console.error("Error loading HTML:", error));
};

// Load header and footer
fetchHeaderAndAppendToHtml();
