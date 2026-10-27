document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('character-search');
    const characterList = document.getElementById('characters-list');
    const listItems = characterList.getElementsByTagName('li');
    const noResultsMessage = document.getElementById('no-results');

    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        let found = false;

        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            // Obtener el texto del enlace (nombre del personaje)
            const name = listItem.querySelector('.char-link').textContent.toLowerCase();
            
            if (name.includes(filter)) {
                listItem.style.display = ''; // Muestra el elemento de la lista
                found = true;
            } else {
                listItem.style.display = 'none'; // Oculta el elemento de la lista
            }
        }

        // Muestra u oculta el mensaje de "no resultados"
        if (!found) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    });
});