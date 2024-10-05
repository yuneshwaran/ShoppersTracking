package com.backend.ShopperTracking.controller;


import com.backend.ShopperTracking.dto.PurchaseLogRequest;
import com.backend.ShopperTracking.model.logs.PurchaseLog;
import com.backend.ShopperTracking.model.logs.ShelfSensorLog;
import com.backend.ShopperTracking.model.logs.TrialRoomLog;
import com.backend.ShopperTracking.dto.TrialRoomLogRequest;
import com.backend.ShopperTracking.service.PurchaseLogService;
import com.backend.ShopperTracking.service.sensors.ShelfSensorLogService;
import com.backend.ShopperTracking.service.sensors.TrialRoomLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/track")
public class LoggingController {

    @Autowired
    private ShelfSensorLogService shelfSensorLogService;

    @Autowired
    private TrialRoomLogService trialRoomLogService;

    @Autowired
    private PurchaseLogService purchaseLogService;

    //shelfSensorLogging

    // Endpoint to log when customer starts waiting near a shelf
    @PostMapping("/shelf/entry/{shelfId}")
    public com.backend.ShopperTracking.model.logs.ShelfSensorLog logEntry(@PathVariable int shelfId) {
        return shelfSensorLogService.logEntry(shelfId);
    }

    // Endpoint to log when customer stops waiting near a shelf
    @PostMapping("/shelf/exit/{logId}")
    public com.backend.ShopperTracking.model.logs.ShelfSensorLog logExit(@PathVariable int logId) {
        return shelfSensorLogService.logExit(logId);
    }

    // Fetch logs by Shelf ID
    @GetMapping("/shelf/{shelfId}")
    public List<ShelfSensorLog> getLogsByShelfId(@PathVariable int shelfId) {
        return shelfSensorLogService.getLogsByShelfId(shelfId);
    }

    // Fetch all logs
    @GetMapping("/shelf/logs")
    public List<com.backend.ShopperTracking.model.logs.ShelfSensorLog> getAllLogs() {
        return shelfSensorLogService.getAllLogs();
    }

    //Trial room logging

    //add entry into the trial room
    @PostMapping("/trial/entry")
    public ResponseEntity<String> logEntry(@RequestBody TrialRoomLogRequest request) {
        TrialRoomLog log = trialRoomLogService.addTrialRoomLog(request.getTrialRoomId(), request.getProductId(), request.getCustomerId());
        return ResponseEntity.ok("Entry logged successfully with ID: " + log.getId());
    }

    //get all trial room logs
    @GetMapping("/trial/all")
    public ResponseEntity<List<TrialRoomLog>> getAllTrialRoomLogs() {
        List<TrialRoomLog> logs = trialRoomLogService.getAllTrialRoomLogs();
        return ResponseEntity.ok(logs);
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


    //get logs by customer ID
//    @GetMapping("/trial/customer")
//    public ResponseEntity<List<TrialRoomLog>> getLogsByCustomerId(@RequestParam int customerId) {
//        List<TrialRoomLog> logs = trialRoomLogService.getLogsByCustomerId(customerId);
//        return ResponseEntity.ok(logs);
//    }

}
