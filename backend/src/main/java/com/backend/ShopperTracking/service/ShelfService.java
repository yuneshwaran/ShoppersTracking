package com.backend.ShopperTracking.service;


import com.backend.ShopperTracking.model.Shelf;
import com.backend.ShopperTracking.repository.ShelfRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShelfService {

    @Autowired
    ShelfRepo shelfRepo;

    public String saveShelf(Shelf shelf){
          try{
              System.out.println(shelf.toString());
              shelfRepo.save(shelf);
          } catch (RuntimeException e) {

              throw new RuntimeException(e);

          }
          return "Shelf saved";
    }

    public Shelf getShelf(int id){

        Shelf shelf = shelfRepo.findById(id).orElse(null);

        return shelf;

    }

    public List<Shelf> getShelves() {
        return shelfRepo.findAll();
    }

    public String addShelf(Shelf shelf) {
        try{
            shelfRepo.save(shelf);
            return "Shelf saved";
        }
        catch (RuntimeException e) {

            throw new RuntimeException(e);
        }
    }

    public String updateShelf(Shelf shelf) {

        try{ shelfRepo.save(shelf);
            return "Shelf updated";}
        catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

    }

    public String deleteShelf(int id) {
        shelfRepo.deleteById(id);
        return "Shelf deleted";
    }
}
