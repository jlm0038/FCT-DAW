
package service.impl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import entity.SecurityUser;
import entity.User;
import repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository; 
    
    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        
        if(user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username); 
        }
        
        //ESTO ES LO QUE NO RECONOCIA 
        return new SecurityUser(user); 
    }
}