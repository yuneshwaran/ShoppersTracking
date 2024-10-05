package com.backend.ShopperTracking.controller;

import com.backend.ShopperTracking.model.HangerSensor;
import com.backend.ShopperTracking.model.ShelfSensor;
import com.backend.ShopperTracking.service.sensors.HangerSensorService;
import com.backend.ShopperTracking.service.sensors.ShelfSensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    private ShelfSensorService shelfSensorService;

    @Autowired
    private HangerSensorService hangerSensorService;

    //shelf sensor
    @PostMapping("/shelf")
    public ResponseEntity<ShelfSensor> createShelfSensor(@RequestBody ShelfSensor shelfSensor) {
        com.backend.ShopperTracking.model.ShelfSensor savedSensor = shelfSensorService.saveShelfSensor(shelfSensor);
        return ResponseEntity.ok(savedSensor);
    }

    @GetMapping("/shelf")
    public ResponseEntity<List<ShelfSensor>> getAllShelfSensors() {
        List<ShelfSensor> sensors = shelfSensorService.getAllShelfSensors();
        return ResponseEntity.ok(sensors);
    }

    @GetMapping("/shelf/{id}")
    public ResponseEntity<ShelfSensor> getShelfSensorById(@PathVariable int id) {
        Optional<ShelfSensor> sensor = shelfSensorService.getShelfSensorById(id);
        return sensor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/shelf/{id}")
    public ResponseEntity<ShelfSensor> updateShelfSensor(@PathVariable int id, @RequestBody ShelfSensor shelfSensorDetails) {
        Optional<ShelfSensor> sensorOptional = shelfSensorService.getShelfSensorById(id);
        if (!sensorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ShelfSensor sensor = sensorOptional.get();
        sensor.setShelf(shelfSensorDetails.getShelf());
        ShelfSensor updatedSensor = shelfSensorService.saveShelfSensor(sensor);
        return ResponseEntity.ok(updatedSensor);
    }

    @DeleteMapping("/shelf/{id}")
    public ResponseEntity<Void> deleteShelfSensor(@PathVariable int id) {
        Optional<ShelfSensor> sensor = shelfSensorService.getShelfSensorById(id);
        if (!sensor.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        shelfSensorService.deleteShelfSensor(id);
        return ResponseEntity.noContent().build();
    }

    //hanger-sensor
    @GetMapping("/hanger")
    public ResponseEntity<List<HangerSensor>> getAllHangerSensors() {
        List<HangerSensor> sensors = hangerSensorService.getAllHangerSensors();
        return ResponseEntity.ok(sensors);
    }

    @GetMapping("/hanger/{id}")
    public ResponseEntity<HangerSensor> getHangerSensorById(@PathVariable int id) {
        Optional<HangerSensor> sensor = hangerSensorService.getHangerSensorById(id);
        return sensor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/hanger/shelf/{shelfId}")
    public ResponseEntity<List<HangerSensor>> getHangerSensorsByShelfId(@PathVariable int shelfId) {
        List<HangerSensor> sensors = hangerSensorService.getHangerSensorsByShelfId(shelfId);
        return ResponseEntity.ok(sensors);
    }

    @GetMapping("/hanger/product/{productId}")
    public ResponseEntity<List<HangerSensor>> getHangerSensorsByProductId(@PathVariable int productId) {
        List<HangerSensor> sensors = hangerSensorService.getHangerSensorsByProductId(productId);
        return ResponseEntity.ok(sensors);
    }

    @PostMapping("/hanger")
    public ResponseEntity<HangerSensor> createHangerSensor(@RequestBody HangerSensor hangerSensor) {
        HangerSensor newSensor = hangerSensorService.createHangerSensor(hangerSensor);
        return ResponseEntity.ok(newSensor);
    }

    @PutMapping("/hanger/{id}")
    public ResponseEntity<HangerSensor> updateHangerSensor(@PathVariable int id, @RequestBody HangerSensor hangerSensor) {
        Optional<HangerSensor> updatedSensor = hangerSensorService.updateHangerSensor(id, hangerSensor);
        return updatedSensor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/hanger/{id}")
    public ResponseEntity<Void> deleteHangerSensor(@PathVariable int id) {
        boolean deleted = hangerSensorService.deleteHangerSensor(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
