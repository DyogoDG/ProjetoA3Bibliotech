package br.com.unicuritiba.bibliotech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.unicuritiba.bibliotech.models.Categoria;
import br.com.unicuritiba.bibliotech.models.Livro;
import br.com.unicuritiba.bibliotech.repositories.LivroRepository;

@RestController
@RequestMapping("/livros")
public class LivroController {

	@Autowired
	private LivroRepository livroRepository;
	/*
	@Autowired
	private RestTemplate restTemplate;
	
	@GetMapping("/categorias")
	public List<Categoria> getCaterogiras(){
		String url = "http://localhost:8080/categorias";
		return restTemplate.getForObject(url, List.class, Categoria.class);
	}
	*/
	
	@CrossOrigin
    @GetMapping
    public List<Livro> listarLivros() {
        List<Livro> livros = livroRepository.findAll();
        return livros;
    }
	
	@CrossOrigin
    @PostMapping
    public Livro cadastrarLivros(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }
	
	@CrossOrigin
	@PostMapping(consumes = "application/x-www-form-urlencoded")
	public Livro cadastrarLivrosJS(Livro livro) {
		return livroRepository.save(livro);
	}
	
	@CrossOrigin
    @PutMapping
    public void atualizarLivros(@RequestBody Livro livro) {
        livroRepository.save(livro);
    }
	
	@CrossOrigin
    @DeleteMapping("/{id}")
    public void deletarLivros(@PathVariable("id") Long id) {
        livroRepository.deleteById(id);
    }
}
