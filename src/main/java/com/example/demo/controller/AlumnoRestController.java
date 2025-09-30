
//CONTROLADOR PARA PERMITIR EL CORS. SPRING BOOT PUERTO 8080 Y REACT 3000
package com.example.demo.controller;

import com.example.apicrud.model.Alumno;
import com.example.democrud.service.api.AlumnoServiceAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")

//AQUI SE HABIOLITA EL CORS

@CrossOrigin(origins = "http://localhost:3000") 
public class AlumnoRestController {

    @Autowired
    private AlumnoServiceAPI alumnoServiceAPI;

    @GetMapping
    public List<Alumno> listar() {
        return alumnoServiceAPI.getAll();
    }

    @GetMapping("/{id}")
    public Alumno obtener(@PathVariable Long id) {
        return alumnoServiceAPI.get(id);
    }

    @PostMapping
    public Alumno guardar(@RequestBody Alumno alumno) {
        return alumnoServiceAPI.save(alumno);
    }

    @PutMapping("/{id}")
    public Alumno actualizar(@PathVariable Long id, @RequestBody Alumno alumno) {
        alumno.setId(id);
        return alumnoServiceAPI.save(alumno);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alumnoServiceAPI.delete(id);
    }
}