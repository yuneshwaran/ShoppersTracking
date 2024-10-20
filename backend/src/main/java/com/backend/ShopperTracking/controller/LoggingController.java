package com.backend.ShopperTracking.controller;


import com.backend.ShopperTracking.dto.PurchaseLogRequest;
import com.backend.ShopperTracking.dto.PurchaseLog;
import com.backend.ShopperTracking.dto.ShelfSensorLog;
import com.backend.ShopperTracking.dto.TrialRoomLog;
import com.backend.ShopperTracking.dto.TrialRoomLogRequest;
import com.backend.ShopperTracking.model.ShelfSensor;
import com.backend.ShopperTracking.service.PurchaseLogService;
import com.backend.ShopperTracking.service.sensors.ShelfSensorLogService;
import com.backend.ShopperTracking.service.sensors.TrialRoomLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/track")
@CrossOrigin(origins = "http://localhost:3000")
public class LoggingController {

    @Autowired
    private ShelfSensorLogService shelfSensorLogService;

    @Autowired
    private TrialRoomLogService trialRoomLogService;

    @Autowired
    private PurchaseLogService purchaseLogService;

    //shelf entry
    @PostMapping("/shelf/entry")
    public int logEntry(@RequestBody ShelfSensor shelfSensor) {

        return shelfSensorLogService.logEntry(shelfSensor.getId());

    }

    // Log the exit with the log id
    @PutMapping("/shelf/exit")
    public String logExit(@RequestBody ShelfSensorLog log){
        String res = "Logged Exit with id :"+ shelfSensorLogService.logExit(log.getId());
        return res;
    }

    // Fetch logs by Shelf ID
    @GetMapping("/shelf/{shelfId}")
    public List<ShelfSensorLog> getLogsByShelfId(@PathVariable int shelfId) {
        return shelfSensorLogService.getLogsByShelfId(shelfId);
    }

    // Fetch all logs
    @GetMapping("/shelf/logs")
    public List<ShelfSensorLog> getAllLogs() {
        return shelfSensorLogService.getAllLogs();
    }

    //Trial room logging

    //add entry into the trial room
    @PostMapping("/trial/entry")
    public String logEntry(@RequestBody TrialRoomLogRequest request) {
        TrialRoomLog log = trialRoomLogService.addTrialRoomLog(request.getTrialRoomId(), request.getProductId(), request.getCustomerId(),request.getHangerId());
        return ("Entry logged successfully with ID: " + log.getId());
    }


    //get all trial room logs
    @GetMapping("/trial/all")
    public List<TrialRoomLog> getAllTrialRoomLogs() {
        List<TrialRoomLog> logs = trialRoomLogService.getAllTrialRoomLogs();
        return logs;

    }

    //purchase Logging
    @PostMapping("/purchase")
    public ResponseEntity<PurchaseLog> createPurchaseLog(@RequestBody PurchaseLogRequest request) {
        try {
            PurchaseLog purchaseLog = purchaseLogService.createPurchaseLog(request);
            return ResponseEntity.ok(purchaseLog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Handle errors, e.g., insufficient stock
        }
    }
    @GetMapping("/purchase")
    public List<PurchaseLog> getAllPurchaseLogs() {
        return purchaseLogService.getAll();
    }
}
