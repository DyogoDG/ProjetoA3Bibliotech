package br.com.unicuritiba.bibliotech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.unicuritiba.bibliotech.models.EstoqueLivro;

@Repository
public interface EstoqueLivroRepository extends JpaRepository<EstoqueLivro, Long>{

}
