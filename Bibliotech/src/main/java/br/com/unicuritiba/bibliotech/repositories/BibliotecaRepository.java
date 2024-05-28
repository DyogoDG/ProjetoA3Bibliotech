package br.com.unicuritiba.bibliotech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.unicuritiba.bibliotech.models.Biblioteca;

@Repository
public interface BibliotecaRepository extends JpaRepository<Biblioteca, Long>{

}
