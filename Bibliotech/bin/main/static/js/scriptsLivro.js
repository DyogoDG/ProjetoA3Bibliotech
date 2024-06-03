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
        const categoriaSelect = document.getElementById('categoriaLivro');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.text = categoria.nome;
            categoriaSelect.appendChild(option);
        });
    });
    
fetch(urlCategorias)
    .then(response => response.json())
    .then(categorias => {
        const categoriaSelect = document.getElementById('categoriaLivroEditar');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.text = categoria.nome;
            categoriaSelect.appendChild(option);
        });
    });

/* FUNÇÕES PARA CONSULTAR, CADASTRAR, EDITAR E DELETAR LIVROS */
function getLivro(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function listaTabelaLivro(){	
	data = getLivro("http://localhost:8080/livros")
    livros = JSON.parse(data);
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
        td_categoria.innerText = this.livros[i].categoria.nome;
        
        let btnEditar = document.createElement('button');
        btnEditar.setAttribute('class','btn btn-warning');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#editarModal');
        btnEditar.setAttribute('onclick','preparaEdicaoLivro('+ JSON.stringify(this.livros[i]) +')');
        btnEditar.appendChild(document.createTextNode('Editar'));
        td_acao.appendChild(btnEditar);        
        let btnExcluir = document.createElement('button');
        btnExcluir.setAttribute('class','btn btn-danger');
        btnExcluir.setAttribute('onclick','deletarLivro('+ this.livros[i].id +')');
        btnExcluir.appendChild(document.createTextNode('Excluir'));
        td_acao.appendChild(btnExcluir);        
	}	
}
 
function deletarLivro(id){
	if(confirm('Deseja realmente excluir esse livro?')) {
		let urlAPI = "http://localhost:8080/livros/";
		let request = new XMLHttpRequest();
		request.open("DELETE", urlAPI+id);
		request.setRequestHeader("Content-type", "application/json");
		request.send();
		location.reload();
	}
}

function cadastrarLivro(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/livros"
	let nomeLivro = document.getElementById("nomeLivro").value
	let editoraLivro = document.getElementById("editoraLivro").value
	let categoriaLivro = document.getElementById("categoriaLivro").value
	
	body = {
		"nome" : nomeLivro,
		"editora" : editoraLivro,
		"categoria" : {
			"id" : categoriaLivro
		}
	}
	
	let request = new XMLHttpRequest()
	request.open("POST", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}

function preparaEdicaoLivro(livros) {
	document.getElementById('idLivroEditar').value = livros.id;
    document.getElementById('nomeLivroEditar').value = livros.nome;
    document.getElementById('editoraLivroEditar').value = livros.editora;
    document.getElementById('categoriaLivroEditar').value = livros.categoria.id;
}

function editarLivro(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/livros"
	let idLivro = document.getElementById("idLivroEditar").value
	let nomeLivro = document.getElementById("nomeLivroEditar").value
	let editoraLivro = document.getElementById("editoraLivroEditar").value
	let categoriaLivro = document.getElementById("categoriaLivroEditar").value
	
	body = {
		"id" : idLivro,
		"nome" : nomeLivro,
		"editora" : editoraLivro,
		"categoria" : {
			"id" : categoriaLivro
		}
	}
	
	let request = new XMLHttpRequest()
	request.open("PUT", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}
 
listaTabelaLivro()