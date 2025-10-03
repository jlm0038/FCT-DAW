package Services; 

import entity.User; 
import repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Login_Register.payload.request.SignupRequest.SignupRequest;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public User registerUser(SignupRequest signUpRequest) {
        
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: El nombre de usuario ya está en uso.");
        }
        
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: El correo electrónico ya está en uso.");
        }
        
        // 💡 CONSTRUCTOR CORREGIDO: Ahora pasamos 4 argumentos (incluyendo el rol)
        User user = new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()),
            "USER" // 💡 Rol por defecto para el nuevo usuario
        );

        return userRepository.save(user);
    }
    
    // ... (Tu método de login iría aquí)
}