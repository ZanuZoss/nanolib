document.addEventListener("DOMContentLoaded", () => {
    const mainDiv = document.getElementById("main");
    const featuredDiv = document.getElementById("featured");
    const recentDiv = document.getElementById("recent");

    const mainBtn = document.getElementById("mainpage-btn");
    const featuredBtn = document.getElementById("featured-btn");
    const recentBtn = document.getElementById("recent-btn");
    const searchBtn = document.getElementById("search-btn");

    const buttons = [mainBtn, featuredBtn, recentBtn, searchBtn];

    mainDiv.classList.add("active");
    mainBtn.classList.add("selected"); // Highlight the default button

    mainBtn.addEventListener("click", () => {
        showSection(mainDiv, mainBtn);
    });

    featuredBtn.addEventListener("click", () => {
        showSection(featuredDiv, featuredBtn);
    });

    recentBtn.addEventListener("click", () => {
        showSection(recentDiv, recentBtn);
    });

    searchBtn.addEventListener("click", () => {
        alert("Search functionality is not implemented yet!");
        highlightButton(searchBtn);
    });

    function showSection(section, button) {
        mainDiv.classList.remove("active");
        featuredDiv.classList.remove("active");
        recentDiv.classList.remove("active");

        section.classList.add("active");
        highlightButton(button);
    }

    function highlightButton(selectedButton) {
        buttons.forEach((btn) => btn.classList.remove("selected")); // Remove highlight from all buttons
        selectedButton.classList.add("selected"); // Highlight the selected button
    }

    // Fetch and render themes for both tabs
    fetch('themes.json')
        .then(response => response.json())
        .then(themes => {
            // Featured
            const featuredContainer = document.querySelector('#featured .theme-preview-container');
            featuredContainer.innerHTML = '';
            themes.filter(theme => theme.featured).forEach((theme, index) => {
                const preview = createThemePreview(theme, index);
                featuredContainer.appendChild(preview);
            });

            // Recents
            const recentContainer = document.querySelector('#recent .theme-preview-container');
            recentContainer.innerHTML = '';
            // Sort by id descending for recents (assuming higher id = newer)
            themes
                .filter(theme => theme.recent)
                .sort((a, b) => Number(b.id) - Number(a.id))
                .forEach((theme, index) => {
                    const preview = createThemePreview(theme, index);
                    recentContainer.appendChild(preview);
                });

            // Today's Featured
            const todaysFeaturedTheme = themes.find(theme => theme.todays_featured);
            if (todaysFeaturedTheme) {
                const rside = document.getElementById('todays-featured');
                rside.innerHTML = `
                    <div class="todays-featured-overlay" style="cursor:pointer;">
                        <img 
                            src="Assets/todaysfeatured.png" 
                            alt="Today's Featured Theme" 
                            class="todays-featured-img"
                            id="todays-featured-img"
                        />
                        <div class="todays-featured-info-overlay">
                        <img src="${todaysFeaturedTheme.screenshots && todaysFeaturedTheme.screenshots[0] ? todaysFeaturedTheme.screenshots[0] : todaysFeaturedTheme.image}" 
                                 alt="Screenshot" class="todays-featured-screenshot" />
                            <div class="todays-featured-name">${todaysFeaturedTheme.name}</div>
                            <div class="todays-featured-author">by ${todaysFeaturedTheme.author}</div>
                            <div class="todays-featured-ipod">${todaysFeaturedTheme.ipod}</div>
                            <div class="todays-featured-desc">${todaysFeaturedTheme.description}</div>
                        </div>
                    </div>
                `;
                rside.querySelector('.todays-featured-overlay').addEventListener('click', () => {
                    window.location.href = `/theme.html?id=${todaysFeaturedTheme.id}`;
                });
            }

            // Add event listeners for "View More" buttons (works for both tabs)
            document.querySelectorAll('.view-more-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const themeId = e.target.getAttribute('data-id');
                    window.location.href = `/theme.html?id=${themeId}`;
                });
            });
        });

    function createThemePreview(theme, index) {
        const preview = document.createElement('div');
        preview.className = 'theme-preview';
        preview.style.backgroundColor = (index % 2 === 0) ? "#EBEBEB" : "#F5F5F5";
        preview.innerHTML = `
            <img src="${theme.image}" alt="${theme.name}" class="theme-img" />
            <div class="theme-info">
                <div class="theme-name-author">
                    <span class="theme-name">${theme.name}</span>
                    <span class="theme-author"> by ${theme.author || "Unknown"}</span>
                </div>
                <div class="theme-desc">${theme.description}</div>
                <div class="theme-ipod">${theme.ipod}</div>
            </div>
            <img src="Assets/ViewMore.png" alt="View More" class="view-more-btn" data-id="${theme.id}" />
        `;
        return preview;
    }
});