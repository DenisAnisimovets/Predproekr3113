package web.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import web.entity.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    public List<User> getAllUsers();

    public User saveUser(User user);

    public User updateUser(User user);

    public User getUserById(int id);

    public void deleteUser(int id);

    }