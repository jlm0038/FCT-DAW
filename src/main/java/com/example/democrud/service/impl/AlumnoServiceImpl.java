package com.example.democrud.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.example.apicrud.model.Alumno;
import com.example.democrud.commons.GennericServiceImpl;
import com.example.democrud.service.api.AlumnoServiceAPI;
import com.example.democrud.dao.api.AlumnoDaoAPI;


@Service
public class AlumnoServiceImpl extends GennericServiceImpl<Alumno, Long> implements AlumnoServiceAPI {

	@Autowired
	private AlumnoDaoAPI alumnoDaoAPI;

	@Override
	public CrudRepository<Alumno, Long> getDao() {
		return alumnoDaoAPI;
	}
}
