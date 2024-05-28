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

import br.com.unicuritiba.bibliotech.models.Categoria;
import br.com.unicuritiba.bibliotech.repositories.CategoriaRepository;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@CrossOrigin
    @GetMapping
    public List<Categoria> listarCategorias() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return categorias;
    }
	
	@CrossOrigin
    @PostMapping
    public void cadastrarCategorias(@RequestBody Categoria categoria) {
        categoriaRepository.save(categoria);
    }
	
	@CrossOrigin
	@PostMapping(consumes = "application/x-www-form-urlencoded")
	public Categoria cadastrarCategoriasJS(Categoria categoria) {
		return categoriaRepository.save(categoria);
	}
    
	@CrossOrigin
    @PutMapping
    public void atualizarCategorias(@RequestBody Categoria categoria) {
        categoriaRepository.save(categoria);
    }
    
	@CrossOrigin
    @DeleteMapping("/{categoria_id}")
    public void deletarCategorias(@PathVariable("categoria_id") Long categoria_id) {
        categoriaRepository.deleteById(categoria_id);
    }

}