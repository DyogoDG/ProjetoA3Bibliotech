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

const urlLivros = 'http://localhost:8080/livros';

fetch(urlLivros)
    .then(response => response.json())
    .then(livros => {
        const livroSelect = document.getElementById('estoqueLivro');
        livros.forEach(livro => {
            const option = document.createElement('option');
            option.value = livro.id;
            option.text = livro.nome;
            livroSelect.appendChild(option);
        });
    });
    
fetch(urlLivros)
    .then(response => response.json())
    .then(livros => {
        const livroSelect = document.getElementById('estoqueLivroEditar');
        livros.forEach(livro => {
            const option = document.createElement('option');
            option.value = livro.id;
            option.text = livro.nome;
            livroSelect.appendChild(option);
        });
    });
    
const urlBibliotecas = 'http://localhost:8080/bibliotecas';

fetch(urlBibliotecas)
    .then(response => response.json())
    .then(bibliotecas => {
        const bibliotecaSelect = document.getElementById('estoqueBiblioteca');
        bibliotecas.forEach(biblioteca => {
            const option = document.createElement('option');
            option.value = biblioteca.biblioteca_id;
            option.text = biblioteca.nome;
            bibliotecaSelect.appendChild(option);
        });
    });
    
fetch(urlBibliotecas)
    .then(response => response.json())
    .then(bibliotecas => {
        const bibliotecaSelect = document.getElementById('estoqueBibliotecaEditar');
        bibliotecas.forEach(biblioteca => {
            const option = document.createElement('option');
            option.value = biblioteca.biblioteca_id;
            option.text = biblioteca.nome;
            bibliotecaSelect.appendChild(option);
        });
    });

/* FUNÇÕES PARA CONSULTAR, CADASTRAR, EDITAR E DELETAR ESTOQUE */
function getEstoque(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function listaTabelaEstoque(){	
	data = getEstoque("http://localhost:8080/estoquelivros")
    estoqueLivros = JSON.parse(data);
    const tbody = document.getElementById("tbodyEstoqueLivro")

	for(let i = 0; i < this.estoqueLivros.length; i++) {  		      
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome_livro = tr.insertCell();
        let td_editora_livro = tr.insertCell();
        let td_categoria_livro = tr.insertCell();
        let td_nome_biblioteca = tr.insertCell();
        let td_acao = tr.insertCell();

        td_id.innerText = this.estoqueLivros[i].estoque_id;
        td_nome_livro.innerText = this.estoqueLivros[i].livro.nome;
        td_editora_livro.innerText = this.estoqueLivros[i].livro.editora;
        td_categoria_livro.innerText = this.estoqueLivros[i].livro.categoria.nome;
        td_nome_biblioteca.innerText = this.estoqueLivros[i].biblioteca.nome;
        
        let btnEditar = document.createElement('button');
        btnEditar.setAttribute('class','btn btn-warning');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#editarModal');
        btnEditar.setAttribute('onclick','preparaEdicaoEstoque('+ JSON.stringify(this.estoqueLivros[i]) +')');
        btnEditar.appendChild(document.createTextNode('Editar'));
        td_acao.appendChild(btnEditar);        
        let btnExcluir = document.createElement('button');
        btnExcluir.setAttribute('class','btn btn-danger');
        btnExcluir.setAttribute('onclick','deletarEstoque('+ this.estoqueLivros[i].estoque_id +')');
        btnExcluir.appendChild(document.createTextNode('Excluir'));
        td_acao.appendChild(btnExcluir);        
	}	
}
 
function deletarEstoque(id){
	console.log(id)
	if(confirm('Deseja realmente excluir esse livro do estoque?')) {
		let urlAPI = "http://localhost:8080/estoquelivros/";
		let request = new XMLHttpRequest();
		request.open("DELETE", urlAPI+id);
		request.setRequestHeader("Content-type", "application/json");
		request.send();
		location.reload();
	}
}

function cadastrarEstoque(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/estoquelivros"
	let idLivroEstoque = document.getElementById("estoqueLivro").value
	let idBibliotecaEstoque = document.getElementById("estoqueBiblioteca").value
	console.log(idLivroEstoque)
	console.log(idBibliotecaEstoque)
	
	body = {
		"livro" : {
			"id" : idLivroEstoque
			},
		"biblioteca" : {
			"biblioteca_id" : idBibliotecaEstoque
		}
	}
	
	let request = new XMLHttpRequest()
	request.open("POST", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();	
}

function preparaEdicaoEstoque(estoqueLivros) {
	document.getElementById('idEstoqueEditar').value = estoqueLivros.estoque_id;
    document.getElementById('estoqueLivroEditar').value = estoqueLivros.livro.id;
    document.getElementById('estoqueBibliotecaEditar').value = estoqueLivros.biblioteca.biblioteca_id;
}

function editarEstoque(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/estoquelivros"
	let idEstoque = document.getElementById("idEstoqueEditar").value
	let idLivroEstoque = document.getElementById("estoqueLivroEditar").value
	let idBibliotecaEstoque = document.getElementById("estoqueBibliotecaEditar").value
	console.log(idEstoque)
	console.log(idLivroEstoque)
	console.log(idBibliotecaEstoque)

	body = {
		"estoque_id" : idEstoque,
		"livro" : {
			"id" : idLivroEstoque
			},
		"biblioteca" : {
			"biblioteca_id" : idBibliotecaEstoque
		}
	}
	
	let request = new XMLHttpRequest()
	request.open("PUT", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}
 
listaTabelaEstoque()