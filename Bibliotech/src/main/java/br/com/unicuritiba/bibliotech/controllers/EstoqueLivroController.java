package br.com.unicuritiba.bibliotech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.unicuritiba.bibliotech.models.EstoqueLivro;
import br.com.unicuritiba.bibliotech.repositories.EstoqueLivroRepository;

@RestController
@RequestMapping("/estoquelivros")
public class EstoqueLivroController {
	
	@Autowired
	private EstoqueLivroRepository estoqueLivroRepository;
	
	@CrossOrigin
	@GetMapping
	public List<EstoqueLivro> listarEstoque() {
		List<EstoqueLivro> estoqueLivros = estoqueLivroRepository.findAll();
		return estoqueLivros;		
	}

	@CrossOrigin
    @PostMapping
    public EstoqueLivro cadastrarEstoque(@RequestBody EstoqueLivro estoqueLivro) {
        return estoqueLivroRepository.save(estoqueLivro);
    }
	
	@CrossOrigin
	@PostMapping(consumes = "application/x-www-form-urlencoded")
	public EstoqueLivro cadastrarEstoqueJS(EstoqueLivro estoqueLivro) {
		return estoqueLivroRepository.save(estoqueLivro);
	}
	
	@CrossOrigin
    @PutMapping
    public void atualizarEstoque(@RequestBody EstoqueLivro estoqueLivro) {
		estoqueLivroRepository.save(estoqueLivro);
    }
	
	@CrossOrigin
    @DeleteMapping("/{estoque_id}")
    public void deletarEstoque(@PathVariable("estoque_id") Long estoque_id) {
		estoqueLivroRepository.deleteById(estoque_id);
    }
	
}
