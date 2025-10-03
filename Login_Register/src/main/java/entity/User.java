package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data


public class User {
		//nombres de la BBDD
		@Id
		@GeneratedValue
		private Long id;
		private String username;
		 private String email; // necesario para el registro
		private String password;
		private String role;
		
		// 💡 Constructor para el REGISTRO 
	    public User(String username, String email, String password, String role) {
	        this.username = username;
	        this.email = email;
	        this.password = password;
	        this.role = role;
	    }

public String getUsername() {
    return this.username;
}

public String getEmail() {
    return this.email;
}

public String getPassword() {
    return this.password;
}

public String getRole() { 
    return this.role;
}
}
