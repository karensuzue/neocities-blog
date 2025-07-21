// Navigating to a new page reloads everything.
// Use localStorage to remember and restore the scroll position of the sidebar.

// Find sidebar element
const sidebar = document.getElementById('sidebar')

// Save scroll position on link click
// Each link listens for click event
document.querySelectorAll('.sidebar a').forEach(link => {
    // Click event saves current scroll position under the key 'sidebar-scroll'
    link.addEventListener('click', () => {
        // localStorage is a dict
        localStorage.setItem('sidebar-scroll', sidebar.scrollTop);
    });
});

// Restore scroll position on load
window.addEventListener('DOMContentLoaded', () => {
    // Get previously saved scroll position, localStorage only stores strings
    const scrollPosStr = localStorage.getItem('sidebar-scroll')
    if (scrollPosStr !== null) {
        // Set scrollTop
        sidebar.scrollTop = parseInt(scrollPosStr, 10) // base 10
    }
});


