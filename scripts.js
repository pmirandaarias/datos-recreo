document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('tbody tr');

  rows.forEach(row => {
    row.addEventListener('click', function() {
      // Destacar la fila seleccionada
      rows.forEach(r => r.style.backgroundColor = '');
      this.style.backgroundColor = '#D0EDED';
    });
  });
});
