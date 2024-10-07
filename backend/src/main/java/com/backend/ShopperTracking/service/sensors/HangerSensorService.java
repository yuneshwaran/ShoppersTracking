package com.backend.ShopperTracking.service.sensors;

import org.springframework.stereotype.Service;
import com.backend.ShopperTracking.model.HangerSensor;
import com.backend.ShopperTracking.repository.sensors.HangerSensorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HangerSensorService {

    @Autowired
    private HangerSensorRepo hangerSensorRepo;

    // Get all hanger sensors
    public List<HangerSensor> getAllHangerSensors() {
        return hangerSensorRepo.findAll();
    }

    // Get a hanger sensor by ID
    public HangerSensor getHangerSensorById(int id) {
        return hangerSensorRepo.findById(id).orElse(new HangerSensor());
    }

    // Get all hanger sensors by shelf ID
    public List<HangerSensor> getHangerSensorsByShelfId(int shelfId) {
        return hangerSensorRepo.findByShelf_Id(shelfId);
    }

    // Get all hanger sensors by product ID
    public List<HangerSensor> getHangerSensorsByProductId(int productId) {
        return hangerSensorRepo.findByProduct_Id(productId);
    }

    // Create a new hanger sensor
    public HangerSensor createHangerSensor(HangerSensor hangerSensor) {
        return hangerSensorRepo.save(hangerSensor);
    }

    // Update an existing hanger sensor
    public Optional<HangerSensor> updateHangerSensor(int id, HangerSensor updatedSensor) {
        return hangerSensorRepo.findById(id).map(sensor -> {
            sensor.setShelf(updatedSensor.getShelf());
            sensor.setProduct(updatedSensor.getProduct());
            return hangerSensorRepo.save(sensor);
        });
    }

    // Delete a hanger sensor by ID
    public boolean deleteHangerSensor(int id) {
        if (hangerSensorRepo.existsById(id)) {
            hangerSensorRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
