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

const limparFormulario = () => {
	document.getElementById('enderecoBiblioteca').value = "";
	document.getElementById('bairroBiblioteca').value = "";
	document.getElementById('cidadeBiblioteca').value = "";
	document.getElementById('estadoBiblioteca').value = "";
}

const preencherFormulario = (endereco) => {
	document.getElementById('enderecoBiblioteca').value = endereco.logradouro;
	document.getElementById('bairroBiblioteca').value = endereco.bairro;
	document.getElementById('cidadeBiblioteca').value = endereco.localidade;
	document.getElementById('estadoBiblioteca').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCEP = async () => {
	limparFormulario();
	
	const cep = document.getElementById("cepBiblioteca").value;
	const url = "http://viacep.com.br/ws/"+ cep +"/json/";
	if (cepValido(cep)) {
		const dados = await fetch(url);
		const endereco = await dados.json();
		if (endereco.hasOwnProperty("erro")) {
			alert("CEP não encontrado");
		} else {
			preencherFormulario(endereco);
		}		
	} else {
		alert("CEP incorreto!");
	}

}

document.getElementById("cepBiblioteca").addEventListener("focusout", pesquisarCEP);

/* FUNÇÕES PARA CONSULTAR, CADASTRAR, EDITAR E DELETAR LIVROS */
function getBiblioteca(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function listaTabelaBiblioteca(){	
	data = getBiblioteca("http://localhost:8080/bibliotecas")
    bibliotecas = JSON.parse(data);
    const tbody = document.getElementById("tbodyBiblioteca")

	for(let i = 0; i < this.bibliotecas.length; i++) {  		      
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_endereco = tr.insertCell();
        let td_numero = tr.insertCell();
        let td_bairro = tr.insertCell();
        let td_cidade = tr.insertCell();
        let td_estado = tr.insertCell();
        let td_cep = tr.insertCell();
        let td_telefone = tr.insertCell();
        let td_acao = tr.insertCell();

        td_id.innerText = this.bibliotecas[i].biblioteca_id;
        td_nome.innerText = this.bibliotecas[i].nome;
        td_endereco.innerText = this.bibliotecas[i].endereco;
        td_numero.innerText = this.bibliotecas[i].numero;
        td_bairro.innerText = this.bibliotecas[i].bairro;
        td_cidade.innerText = this.bibliotecas[i].cidade;
        td_estado.innerText = this.bibliotecas[i].estado;
        td_cep.innerText = this.bibliotecas[i].cep;
        td_telefone.innerText = this.bibliotecas[i].telefone;
        
        let btnEditar = document.createElement('button');
        btnEditar.setAttribute('class','btn btn-warning');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#editarModal');
        btnEditar.setAttribute('onclick','preparaEdicaoBiblioteca('+ JSON.stringify(this.bibliotecas[i]) +')');
        btnEditar.appendChild(document.createTextNode('Editar'));
        td_acao.appendChild(btnEditar);        
        let btnExcluir = document.createElement('button');
        btnExcluir.setAttribute('class','btn btn-danger');
        btnExcluir.setAttribute('onclick','deletarBiblioteca('+ this.bibliotecas[i].biblioteca_id +')');
        btnExcluir.appendChild(document.createTextNode('Excluir'));
        td_acao.appendChild(btnExcluir);        
	}	
}

function deletarBiblioteca(biblioteca_id){
	if(confirm('Deseja realmente excluir essa biblioteca?')) {
		let urlAPI = "http://localhost:8080/bibliotecas/";
		let request = new XMLHttpRequest();
		request.open("DELETE", urlAPI+biblioteca_id);
		request.setRequestHeader("Content-type", "application/json");
		request.send();
		location.reload();
	}
}

function cadastrarBiblioteca(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/bibliotecas"
	let nomeBiblioteca = document.getElementById("nomeBiblioteca").value
	let cepBiblioteca = document.getElementById("cepBiblioteca").value
	let enderecoBiblioteca = document.getElementById("enderecoBiblioteca").value
	let numeroEnderecoBiblioteca = document.getElementById("numeroEnderecoBiblioteca").value
	let bairroBiblioteca = document.getElementById("bairroBiblioteca").value
	let cidadeBiblioteca = document.getElementById("cidadeBiblioteca").value
	let estadoBiblioteca = document.getElementById("estadoBiblioteca").value
	let telefoneBiblioteca = document.getElementById("telefoneBiblioteca").value
	
	body = {
		"nome" : nomeBiblioteca,
		"endereco" : enderecoBiblioteca,
		"numero" : numeroEnderecoBiblioteca,
		"bairro" : bairroBiblioteca,
		"cidade" : cidadeBiblioteca,
		"estado" : estadoBiblioteca,
		"cep" : cepBiblioteca,
		"telefone" : telefoneBiblioteca
	}
	
	let request = new XMLHttpRequest()
	request.open("POST", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}

function preparaEdicaoBiblioteca(bibliotecas) {
	document.getElementById('idBibliotecaEditar').value = bibliotecas.biblioteca_id;
    document.getElementById('nomeBibliotecaEditar').value = bibliotecas.nome;
    document.getElementById('cepBibliotecaEditar').value = bibliotecas.cep;
    document.getElementById('enderecoBibliotecaEditar').value = bibliotecas.endereco;
    document.getElementById('numeroBibliotecaEditar').value = bibliotecas.numero;
    document.getElementById('bairroBibliotecaEditar').value = bibliotecas.bairro;
    document.getElementById('cidadeBibliotecaEditar').value = bibliotecas.cidade;
    document.getElementById('estadoBibliotecaEditar').value = bibliotecas.estado;
    document.getElementById('telefoneBibliotecaEditar').value = bibliotecas.telefone;
}

function editarBiblioteca(){	
	event.preventDefault()	
	let urlAPI = "http://localhost:8080/bibliotecas"
	let idBiblioteca = document.getElementById("idBibliotecaEditar").value
	let nomeBiblioteca = document.getElementById("nomeBibliotecaEditar").value
	let cepBiblioteca = document.getElementById("cepBibliotecaEditar").value
	let enderecoBiblioteca = document.getElementById("enderecoBibliotecaEditar").value
	let numeroEnderecoBiblioteca = document.getElementById("numeroBibliotecaEditar").value
	let bairroBiblioteca = document.getElementById("bairroBibliotecaEditar").value
	let cidadeBiblioteca = document.getElementById("cidadeBibliotecaEditar").value
	let estadoBiblioteca = document.getElementById("estadoBibliotecaEditar").value
	let telefoneBiblioteca = document.getElementById("telefoneBibliotecaEditar").value
	
	
	body = {
		"biblioteca_id" : idBiblioteca,
		"nome" : nomeBiblioteca,
		"endereco" : enderecoBiblioteca,
		"numero" : numeroEnderecoBiblioteca,
		"bairro" : bairroBiblioteca,
		"cidade" : cidadeBiblioteca,
		"estado" : estadoBiblioteca,
		"cep" : cepBiblioteca,
		"telefone" : telefoneBiblioteca
	}
	
	let request = new XMLHttpRequest()
	request.open("PUT", urlAPI, true)
	request.setRequestHeader("Content-type", "application/json")
	request.send(JSON.stringify(body))
	location.reload();
}

listaTabelaBiblioteca();