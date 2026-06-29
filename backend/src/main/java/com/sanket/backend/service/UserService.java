package com.sanket.backend.service;

import com.sanket.backend.dto.CreateUserRequest;
import com.sanket.backend.entity.User;
import com.sanket.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(CreateUserRequest request) {

        User user = new User();

        user.setGithubId(request.getGithubId());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setAvatarUrl(request.getAvatarUrl());

        return userRepository.save(user);
    }
    
    public User findOrCreateUser(OAuth2User githubUser) {

        Long githubId = ((Number) githubUser.getAttribute("id")).longValue();

        return userRepository.findByGithubId(githubId)
                .orElseGet(() -> {

                    User user = new User();

                    user.setGithubId(githubId);
                    user.setUsername(githubUser.getAttribute("login"));
                    user.setEmail(githubUser.getAttribute("email"));
                    user.setAvatarUrl(githubUser.getAttribute("avatar_url"));

                    return userRepository.save(user);
                });
    }
}