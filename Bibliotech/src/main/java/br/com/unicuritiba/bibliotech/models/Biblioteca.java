package br.com.unicuritiba.bibliotech.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Biblioteca {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long biblioteca_id;
	private String nome;
	private String telefone;
	private String endereco;

	public long getId() {
		return biblioteca_id;
	}

	public void setId(long biblioteca_id) {
		this.biblioteca_id = biblioteca_id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

}