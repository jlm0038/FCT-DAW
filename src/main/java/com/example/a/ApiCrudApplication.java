/*package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.demo",
    "com.example.apicrud",
    "com.example.democrud"
})
@EnableJpaRepositories(basePackages = "com.example.democrud.dao.api")
public class ApiCrudApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiCrudApplication.class, args);
    }
}

*/


/* //ESTE ES EL PAQUETE PRINCIAPL
package com.example.a;

@SpringBootApplication
@EntityScan("com.example.apicrud.model") // <- paquete donde está Alumno
@EnableJpaRepositories("com.example.democrud.dao.api") // <- paquete de tus repositorios
public class ApiCrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiCrudApplication.class, args);
    }

}
*/

package com.example.a; // ¡Tu paquete base!

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan; // Para Entidades JPA
import org.springframework.context.annotation.ComponentScan;       // Para Componentes (@Controller, @Service)
import org.springframework.data.jpa.repository.config.EnableJpaRepositories; // Para Repositorios

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.a",
    "com.example.demo",        
    "com.example.democrud"     
})
@EntityScan(basePackages = {
		// El paquete donde reside la entidad 'Alumno'
    "com.example.apicrud.model"
		
})
@EnableJpaRepositories(basePackages = {
		// El paquete donde residen las interfaces DAO/Repository
    "com.example.democrud.dao.api" 
})
public class ApiCrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiCrudApplication.class, args);
    }
}