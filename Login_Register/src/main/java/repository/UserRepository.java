package repository;

import entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
	
	User findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
}