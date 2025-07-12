document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const themeId = params.get("id");

    fetch('themes.json')
        .then(response => response.json())
        .then(themes => {
            const theme = themes.find(t => t.id === themeId);
            if (!theme) {
                document.getElementById('theme-content').innerHTML = "<p>Theme not found.</p>";
                return;
            }

            document.getElementById('theme-title').textContent = theme.name;
document.title = theme.name + " - NanoLib";

            let screenshotsHtml = "";
            if (theme.screenshots && theme.screenshots.length) {
                screenshotsHtml = `
                    <div class="theme-screenshots">
                        <h3>Screenshots</h3>
                        <div class="screenshots-list">
                           ${theme.screenshots.map(url => `<a href="${url}" target="_blank"><img src="${url}" class="theme-screenshot" alt="Screenshot"></a>`).join('')}
                        </div>
                    </div>
                `;
            }

            let downloadsHtml = "";
            if (theme.downloads && theme.downloads.length) {
                downloadsHtml = `
                    <div class="theme-downloads">
                        <h3>Download Links</h3>
                        <ul>
                            ${theme.downloads.map(dl => `<li><a href="${dl.url}" target="_blank">${dl.title}</a></li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            document.getElementById('theme-content').innerHTML = `
                <div class="theme-detail">
                    <img src="${theme.image}" class="theme-img-large" alt="${theme.name}">
                    <div class="theme-detail-info">
                        <div class="theme-name-author">
                            <span class="theme-name">${theme.name}</span>
                            <span class="theme-author"> by ${theme.author || "Unknown"}</span>
                        </div>
                        <h3>Description</h3>
                        <div class="theme-desc">${theme.description}</div>
                        <h3>Compatible iPod</h3>
                        <div class="theme-ipod">- ${theme.ipod}</div>
                        <h3>Detailed Description</h3>
                        <div class="theme-long-desc">${theme.long_description || ""}</div>
                        ${screenshotsHtml}
                        ${downloadsHtml}
                    </div>
                </div>
            `;
        });
});