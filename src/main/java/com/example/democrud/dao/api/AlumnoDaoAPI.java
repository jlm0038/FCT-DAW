package com.example.democrud.dao.api;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.apicrud.model.Alumno;

@Repository
public interface AlumnoDaoAPI extends CrudRepository<Alumno, Long> {
	
}
