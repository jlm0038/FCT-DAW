package controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor


public class HomeController {
	
	
	@GetMapping("/home")
	public String home() {
		return "private home";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String admin() {
		return "Admin";
	}
}
