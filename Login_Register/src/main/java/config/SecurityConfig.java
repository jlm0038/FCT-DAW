package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class SecurityConfig {
	
	
	/*@Bean
	public InMemoryUserDetailsManager user() {
		return new InMemoryUserDetailsManager(
				User.withUsername("user")
					.password("{noop}password")
					.roles("USER")
					.build(),
				User.withUsername("admin")
				.password("{noop}password")
				.build()
				
				
				);
	} */
	
	
	 @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        return http
	                // 1. Deshabilita CSRF (necesario para APIs REST sin sesiones)
	                .csrf(csrf -> csrf.disable())
	                
	                
	                .authorizeHttpRequests(auth -> auth
	                    // Rutas públicas (cualquiera puede acceder)
	                    .requestMatchers("/public/**").permitAll()
	                    
	                    // Rutas que requieren un rol específico
	                    .requestMatchers("/v1/admin").hasRole("ADMIN")
	                    
	                    // Rutas que requieren autenticación (¡Cualquier usuario logueado!)
	                    .requestMatchers("/v1/home").authenticated() 
	                    
	           
	                    .anyRequest().authenticated()
	                )
	                
	               
	                .formLogin(Customizer.withDefaults())
	                .build();
	    }
	 
	 @Bean
	 public PasswordEncoder passwordEncoder() {
		 return new BCryptPasswordEncoder();
	 }
	}
