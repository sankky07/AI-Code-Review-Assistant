package com.sanket.backend.dto;

import lombok.Data;

@Data
public class CreateUserRequest {

    private Long githubId;
    private String username;
    private String email;
    private String avatarUrl;

}