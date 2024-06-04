window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
    
    const datatablesSimpleCategoria = document.getElementById('datatablesSimpleCategoria');
    if (datatablesSimpleCategoria) {
        new simpleDatatables.DataTable(datatablesSimpleCategoria);
    }
    
    const datatablesSimpleBiblioteca = document.getElementById('datatablesSimpleBiblioteca');
    if (datatablesSimpleBiblioteca) {
        new simpleDatatables.DataTable(datatablesSimpleBiblioteca);
    }
    
    const datatablesSimpleEstoque = document.getElementById('datatablesSimpleEstoque');
    if (datatablesSimpleEstoque) {
        new simpleDatatables.DataTable(datatablesSimpleEstoque);
    }
});
