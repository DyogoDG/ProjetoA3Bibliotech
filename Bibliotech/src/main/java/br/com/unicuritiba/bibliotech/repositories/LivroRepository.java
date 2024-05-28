package br.com.unicuritiba.bibliotech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.unicuritiba.bibliotech.models.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long>{

}
