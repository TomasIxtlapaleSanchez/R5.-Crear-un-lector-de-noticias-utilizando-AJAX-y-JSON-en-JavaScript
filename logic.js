const API_KEY = "e073a3348d9020f1d374988f9dc9bf14";
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=es&country=us&apikey=${API_KEY}`;

const container = document.getElementById("noticias-container");
const refreshBtn = document.getElementById("refreshBtn");

function cargarNoticias() {
    container.innerHTML = `<p class="loading">Cargando noticias</p>`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";

            if (!data.articles || data.articles.length === 0) {
                container.innerHTML = "<p>No hay noticias</p>";
                return;
            }

            data.articles.forEach(article => {
                const card = `
                    <div class="news-card">
                        <h3>
                            <a href="${article.url}" target="_blank">
                                ${article.title}
                            </a>
                        </h3>
                        <p>${article.description || "Sin descripcion"}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(() => {
            container.innerHTML = `<p>Error. Intenta de nuevo.</p>`;
        });
}

// recargar noticias sin recargar el tab
refreshBtn.addEventListener("click", cargarNoticias);

// al inicio
cargarNoticias();
