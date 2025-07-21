
async function loadSidebar() {
    const sidebarElement = document.querySelector('#sidebar');
    const response = await fetch('./sidebar.html');
    const sidebarHTML = await response.text();
    sidebarElement.innerHTML = sidebarHTML;
}

document.addEventListener('DOMContentLoaded', loadSidebar);