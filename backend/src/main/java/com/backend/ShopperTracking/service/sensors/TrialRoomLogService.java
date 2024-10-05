package com.backend.ShopperTracking.service.sensors;

import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.model.TrialRoom;
import com.backend.ShopperTracking.model.logs.TrialRoomLog;
import com.backend.ShopperTracking.repository.sensors.TrialRoomLogRepo;
import com.backend.ShopperTracking.service.ProductsService;
import com.backend.ShopperTracking.service.TrialRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TrialRoomLogService {

    @Autowired
    private TrialRoomLogRepo trialRoomLogRepository;

    @Autowired
    private ProductsService productService;

    @Autowired
    private TrialRoomService trialRoomService;

    // Add a new log entry when the product enters the trial room
    public TrialRoomLog addTrialRoomLog(int trialRoomId, int productId, int customerId) {
        TrialRoomLog log = new TrialRoomLog();
        Product product = productService.getProductById(productId);
        TrialRoom trialRoom = trialRoomService.getTrialRoomById(trialRoomId);

        log.setTrialRoom(trialRoom);
        log.setProduct(product);
        log.setCustomerId(customerId);
        log.setEntryTime(new Date());
        trialRoomLogRepository.save(log);

        return log; // Return the logged entry
    }

    // Get all trial room logs
    public List<TrialRoomLog> getAllTrialRoomLogs() {
        return trialRoomLogRepository.findAll();
    }

    // Get logs for a specific customer
    public List<TrialRoomLog> getLogsByCustomerId(int customerId) {
        return trialRoomLogRepository.findByCustomerId(customerId);
    }
}
