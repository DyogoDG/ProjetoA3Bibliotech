package br.com.unicuritiba.bibliotech.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EstoqueLivro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long estoque_id;
	@ManyToOne
	@JoinColumn(name = "id")
	private Livro livro;
	@ManyToOne
	@JoinColumn(name = "biblioteca_id")
	private Biblioteca biblioteca;
	
	public long getEstoque_id() {
		return estoque_id;
	}
	public void setEstoque_id(long estoque_id) {
		this.estoque_id = estoque_id;
	}
	public Livro getLivro() {
		return livro;
	}
	public void setLivro(Livro livro) {
		this.livro = livro;
	}
	public Biblioteca getBiblioteca() {
		return biblioteca;
	}
	public void setBiblioteca(Biblioteca biblioteca) {
		this.biblioteca = biblioteca;
	}

}
