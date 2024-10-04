package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Users.UserPrincipal;
import com.backend.ShopperTracking.model.Users.Users;
import com.backend.ShopperTracking.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user  = usersRepo.getUsersByUsername(username);
        if(user == null) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException(username);
        }
        else
            return new UserPrincipal(user);
    }
}
