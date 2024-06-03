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
/* FUNÇÕES PARA CONSULTAR, CADASTRAR, EDITAR E DELETAR CATEGORIAS */
function getCategoria(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function listaTabelaCategoria(){	
	data = getCategoria("http://localhost:8080/categorias")
    categorias = JSON.parse(data);
    console.log(categorias);
    console.log(this.categorias.length);
    const tbody = document.getElementById("tbodyCategoria")

	for(let i = 0; i < this.categorias.length; i++) {  		      
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_acao = tr.insertCell();

        td_id.innerText = this.categorias[i].id;
        td_nome.innerText = this.categorias[i].nome;
        
        let btnEditar = document.createElement('button');
        btnEditar.setAttribute('class','btn btn-warning');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#editarModal');
        btnEditar.setAttribute('onclick','preparaEdicaoCategoria('+ JSON.stringify(this.categorias[i]) +')');
        btnEditar.appendChild(document.createTextNode('Editar'));
        td_acao.appendChild(btnEditar);        
        let btnExcluir = document.createElement('button');
        btnExcluir.setAttribute('class','btn btn-danger');
        btnExcluir.setAttribute('onclick','deletarCategoria('+ this.categorias[i].id +')');
        btnExcluir.appendChild(document.createTextNode('Excluir'));
        td_acao.appendChild(btnExcluir);        
	}	
}

function deletarCategoria(id){
	if(confirm('Deseja realmente excluir essa categoria?')) {
		let urlAPI = "http://localhost:8080/categorias/";
		let request = new XMLHttpRequest();
		request.open("DELETE", urlAPI+id);
		request.setRequestHeader("Content-type", "application/json");
		request.send();
		location.reload();
	}
}

function cadastrarCategoria(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/categorias"
	let nomeCategoria = document.getElementById("nomeCategoria").value
	
	body = {
		"nome" : nomeCategoria
	}
	
	let request = new XMLHttpRequest()
	request.open("POST", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}

function preparaEdicaoCategoria(categorias) {
	document.getElementById('idCategoriaEditar').value = categorias.id;
    document.getElementById('nomeCategoriaEditar').value = categorias.nome;
}

function editarCategoria(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/categorias"
	let idCategoria = document.getElementById("idCategoriaEditar").value
	let nomeCategoria = document.getElementById("nomeCategoriaEditar").value
	
	body = {
		"id" : idCategoria,
		"nome" : nomeCategoria
	}
	
	let request = new XMLHttpRequest()
	request.open("PUT", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}

listaTabelaCategoria()