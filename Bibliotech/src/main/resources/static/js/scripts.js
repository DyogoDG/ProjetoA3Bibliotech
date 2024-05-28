/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

const urlCategorias = 'http://localhost:8080/categorias';

fetch(urlCategorias)
    .then(response => response.json())
    .then(categorias => {
        const categoriaSelect = document.getElementById('categoria_id');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.text = categoria.nome;
            categoriaSelect.appendChild(option);
        });
    });

function redirectCadastroLivro() {
  // Simulate successful submission (replace with your logic)
  if (true) { // Change this to check for actual success
    window.location.href = "index.html"; // Replace with your actual index URL
    return false; // Prevent default form submission
  }
  return true; // Allow default form submission if not successful
}

function redirectCadastroBiblioteca() {
    // Simulate successful submission (replace with your logic)
    if (true) { // Change this to check for actual success
      window.location.href = "index.html"; // Replace with your actual index URL
      return false; // Prevent default form submission
    }
    return true; // Allow default form submission if not successful
}

function redirectCadastroCategoria() {
    // Simulate successful submission (replace with your logic)
    if (true) { // Change this to check for actual success
      window.location.href = "index.html"; // Replace with your actual index URL
      return false; // Prevent default form submission
    }
    return true; // Allow default form submission if not successful
}

function getLivro(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}


document.addEventListener("DOMContentLoaded", function listaTabelaLivro(){   
console.log("rodou a func")

    data = getLivro("http://localhost:8080/livros")
    livros = JSON.parse(data);
    
    console.log(livros)

    const tbody = document.getElementById("tbodyLivro")


    for(let i = 0; i < this.livros.length; i++) {
        
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_editora = tr.insertCell();
        let td_categoria = tr.insertCell();
        let td_acao = tr.insertCell();

        td_id.innerText = this.livros[i].id;
        td_nome.innerText = this.livros[i].nome;
        td_editora.innerText = this.livros[i].editora;
        td_categoria.innerText = this.livros[i].categoria;
        td_categoria.innerText = this.livros[i].categoria;

    }
 });

