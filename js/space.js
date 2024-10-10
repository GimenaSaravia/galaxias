document.getElementById("btnBuscar").addEventListener("click", function() {
    let query = document.getElementById("inputBuscar").value.trim();
    
    if (query === "") {
        alert("Busca una imagen!");
        return;
    }

    let url = `https://images-api.nasa.gov/search?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let contenedor = document.getElementById("contenedor");
            contenedor.querySelectorAll('.col-md-4').forEach(tarjeta => {
                if (!tarjeta.classList.contains('plantilla-tarjeta')) {
                    tarjeta.remove(); // Eliminar todas las tarjetas existentes, menos la plantilla
                }
            });

            let items = data.collection.items;

            if (items.length === 0) {
                contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
                return;
            }

            // Iterar sobre los resultados
            items.forEach(item => {
                let imageUrl = item.links ? item.links[0].href : 'placeholder.jpg';
                let title = item.data[0].title || 'Sin título';
                let description = item.data[0].description || 'Sin descripción';
                let date = item.data[0].date_created || 'Fecha no disponible';

                // Clonar la tarjeta de plantilla
                let tarjeta = document.querySelector(".plantilla-tarjeta").cloneNode(true);
                tarjeta.classList.remove("d-none", "plantilla-tarjeta");

                // Actualizar los datos de la tarjeta
                tarjeta.querySelector(".card-img-top").src = imageUrl;
                tarjeta.querySelector(".card-title").textContent = title;
                tarjeta.querySelector(".card-text").textContent = description;
                tarjeta.querySelector("small").textContent = `Fecha: ${date}`;

                // Agregar la tarjeta al contenedor
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
        });
});
