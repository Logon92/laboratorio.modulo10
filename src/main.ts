import Axios from "axios";

interface characters {
    id: string;
    nombre: string;
    apodo: string;
    especialidad: string;
    habilidades: string[];
    amigo: string;
    imagen: string; // ahora tratamos imagen como string (webp en base64 o ruta)
}

// Función para traer personajes
const Personajes = (): Promise<characters[]> => {
    return new Promise((resolve) => {
        Axios.get('http://localhost:3000/personajes').then((response) => {
            resolve(response.data);
        });
    });
};

// Elementos del DOM
const searchInput = document.getElementById('search') as HTMLInputElement;
const cleanButton = document.querySelector('button.btn-success') as HTMLButtonElement;
const resultsContainer = document.getElementById('results') as HTMLDivElement;

let allCharacters: characters[] = []; // guardamos los personajes globalmente

function renderCharacters(characters: characters[]): void {
    resultsContainer.innerHTML = '';

    if (characters.length === 0) {
        resultsContainer.innerHTML = '<p class="alert alert-danger">No se encontraron personajes.</p>';
        return;
    }

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row'; // Bootstrap row para las columnas

    characters.forEach(character => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-4 mb-4'; // Responsive: 12 en móvil, 4 en escritorio

        colDiv.innerHTML = `
            <div class="card h-100">
                <img src="http://localhost:3000/${character.imagen}" class="card-img-top" alt="${character.nombre}">
                <div class="card-body">
                    <p class="card-title"><b>Nombre:</b> ${character.nombre}</p>
                    <p class="card-text"><b>Especialidad:</b> ${character.especialidad}</p>
                    <p class="card-text"><b>Habilidades:</b> ${character.habilidades.join(', ')}</p>
                </div>
            </div>
        `;

        rowDiv.appendChild(colDiv);
    });

    resultsContainer.appendChild(rowDiv);
}

// Función para filtrar personajes
function filterCharacters() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        renderCharacters(allCharacters);
        return;
    }

    const filtered = allCharacters.filter(personaje =>
        personaje.nombre.toLowerCase().includes(query) ||
        personaje.apodo.toLowerCase().includes(query) ||
        personaje.especialidad.toLowerCase().includes(query) ||
        personaje.habilidades.some(hab => hab.toLowerCase().includes(query))
    );

    renderCharacters(filtered);
}

// Función para limpiar la búsqueda
function cleanSearch() {
    searchInput.value = '';
    renderCharacters(allCharacters);
}

// Evento: Buscar mientras escribe
searchInput.addEventListener('input', filterCharacters);

// Evento: Limpiar al hacer click en el botón
cleanButton.addEventListener('click', cleanSearch);

// Al cargar la página, mostrar todos los personajes
window.addEventListener('DOMContentLoaded', async () => {
    allCharacters = await Personajes();
    renderCharacters(allCharacters);
});