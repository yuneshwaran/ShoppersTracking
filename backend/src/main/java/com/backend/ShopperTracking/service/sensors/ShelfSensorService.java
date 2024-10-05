package com.backend.ShopperTracking.service.sensors;

import com.backend.ShopperTracking.model.ShelfSensor;
import com.backend.ShopperTracking.repository.sensors.ShelfSensorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShelfSensorService {

    @Autowired
    private ShelfSensorRepo shelfSensorRepo;

    // Create or update a sensor
    public ShelfSensor saveShelfSensor(ShelfSensor shelfSensor) {
        return shelfSensorRepo.save(shelfSensor);
    }

    // Get all shelf sensors
    public List<ShelfSensor> getAllShelfSensors() {
        return shelfSensorRepo.findAll();
    }

    // Get a sensor by ID
    public Optional<ShelfSensor> getShelfSensorById(int id) {
        return shelfSensorRepo.findById(id);
    }

    // Delete a sensor
    public void deleteShelfSensor(int id) {
        shelfSensorRepo.deleteById(id);
    }
}
