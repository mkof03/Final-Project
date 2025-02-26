document.getElementById('darkModeToggle').addEventListener('click', () => {
    const root = document.documentElement;
    const darkModeButton = document.getElementById('darkModeToggle');

    if (root.getAttribute('data-bs-theme') === 'dark') {
        root.setAttribute('data-bs-theme', 'light');
        darkModeButton.innerHTML = '🌙';
    } else {
        root.setAttribute('data-bs-theme', 'dark');
        darkModeButton.innerHTML = '☀️';
    }
});
