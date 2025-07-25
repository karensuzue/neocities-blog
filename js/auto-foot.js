function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Loads 'last update' in footer automatically
document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('last-updated')
    if (element) {
        const lastModified = new Date(document.lastModified);
        element.textContent = `Last updated: ${formatDate(lastModified)}`
    }
});