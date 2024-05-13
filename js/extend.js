function loadHTML(file, header) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(header).innerHTML = html;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
loadHTML('unique/header_2.html', 'header');





function loadHTML(file, header2) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(header2).innerHTML = html;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
loadHTML('unique/adminheader.html', 'header2');