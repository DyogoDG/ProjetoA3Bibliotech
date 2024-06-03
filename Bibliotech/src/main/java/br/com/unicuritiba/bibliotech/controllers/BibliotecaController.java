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

import br.com.unicuritiba.bibliotech.models.Biblioteca;
import br.com.unicuritiba.bibliotech.repositories.BibliotecaRepository;

@RestController
@RequestMapping("/bibliotecas")
public class BibliotecaController {
	
	@Autowired
	private BibliotecaRepository bibliotecaRepository;
	
	@CrossOrigin
	@GetMapping
    public List<Biblioteca> listarBibliotecas() {
        List<Biblioteca> bibliotecas = bibliotecaRepository.findAll();
        return bibliotecas;
    }
	
	@CrossOrigin
    @PostMapping
    public Biblioteca cadastrarBibliotecas(@RequestBody Biblioteca biblioteca) {
        return bibliotecaRepository.save(biblioteca);
    }
	
	@CrossOrigin
	@PostMapping(consumes = "application/x-www-form-urlencoded")
	public Biblioteca cadastrarBibliotecasJS(Biblioteca biblioteca) {
		return bibliotecaRepository.save(biblioteca);
	}
	
	@CrossOrigin
    @PutMapping
    public void atualizarBibliotecas(@RequestBody Biblioteca biblioteca) {
		bibliotecaRepository.save(biblioteca);
    }
	
	@CrossOrigin
    @DeleteMapping("/{biblioteca_id}")
    public void deletarBibliotecas(@PathVariable("biblioteca_id") Long biblioteca_id) {
		bibliotecaRepository.deleteById(biblioteca_id);
    }

}
