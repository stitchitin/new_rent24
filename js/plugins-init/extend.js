function loadHTML(file, header) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(header).innerHTML = html;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
loadHTML('unique/header.html', 'header');