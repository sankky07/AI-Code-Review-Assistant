package com.sanket.backend.ai.service;

import com.sanket.backend.github.entity.GitHubRepository;
import org.eclipse.jgit.api.Git;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class RepositoryCloneService {

    private static final String CLONE_DIRECTORY = "repositories";

    public File cloneRepository(GitHubRepository repository) throws Exception {

        File directory = new File(CLONE_DIRECTORY + "/" + repository.getName());

        if (directory.exists()) {
            return directory;
        }

        Git.cloneRepository()
                .setURI(repository.getHtmlUrl() + ".git")
                .setDirectory(directory)
                .call();

        return directory;
    }
}