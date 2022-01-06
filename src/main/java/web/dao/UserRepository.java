package web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.entity.User;

import javax.persistence.EntityManager;

@Repository
public interface UserRepository extends JpaRepository <User, Integer>{
    public User findByName(String name);
}
