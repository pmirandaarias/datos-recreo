document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('tbody tr');
  const searchInput = document.getElementById('searchInput');
  const clearButton = document.getElementById('clearSearch');

  // Verificar que los elementos existen
  if (!searchInput) {
    console.error('No se encontró el elemento searchInput');
    return;
  }

  if (!clearButton) {
    console.error('No se encontró el elemento clearSearch');
    return;
  }

  console.log('Buscador inicializado correctamente');

  // Función para normalizar texto (remover acentos y convertir a minúsculas)
  function normalizeText(text) {
    return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  }

  // Función para mostrar/ocultar el botón de borrar
  function toggleClearButton() {
    if (searchInput.value.trim() !== '') {
      clearButton.style.display = 'block';
    } else {
      clearButton.style.display = 'none';
    }
  }

  // Funcionalidad de selección de filas (tu código original)
  rows.forEach(row => {
    row.addEventListener('click', function() {
      // Destacar la fila seleccionada (solo filas que no sean de categoría)
      if (!this.classList.contains('category-row')) {
        rows.forEach(r => r.style.backgroundColor = '');
        this.style.backgroundColor = '#D0EDED';
      }
    });
  });

  // Función para filtrar la tabla
  function filterTable() {
    const searchTerm = normalizeText(searchInput.value.trim());
    console.log('Búsqueda:', searchTerm);

    let currentCategory = null;
    let categoryHasVisibleRows = false;

    rows.forEach(row => {
      if (row.classList.contains('category-row')) {
        // Si encontramos una nueva categoría, primero procesamos la anterior
        if (currentCategory) {
          currentCategory.style.display = categoryHasVisibleRows ? '' : 'none';
        }

        // Configuramos la nueva categoría
        currentCategory = row;
        categoryHasVisibleRows = false;
      } else {
        // Es una fila de contenido
        const rowText = normalizeText(row.textContent);

        if (searchTerm === '' || rowText.includes(searchTerm)) {
          row.style.display = '';
          categoryHasVisibleRows = true;
        } else {
          row.style.display = 'none';
        }
      }
    });

    // Procesar la última categoría
    if (currentCategory) {
      currentCategory.style.display = categoryHasVisibleRows ? '' : 'none';
    }

    // Actualizar la visibilidad del botón borrar
    toggleClearButton();
  }

  // Función para limpiar la búsqueda
  function clearSearch() {
    searchInput.value = '';
    filterTable();
    searchInput.focus();
  }

  // Event listeners
  searchInput.addEventListener('input', filterTable);
  searchInput.addEventListener('keyup', filterTable);
  clearButton.addEventListener('click', clearSearch);
});
