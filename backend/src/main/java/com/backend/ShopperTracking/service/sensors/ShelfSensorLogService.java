package com.backend.ShopperTracking.service.sensors;

import com.backend.ShopperTracking.model.Shelf;
import com.backend.ShopperTracking.model.logs.ShelfSensorLog;
import com.backend.ShopperTracking.repository.sensors.ShelfSensorLogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ShelfSensorLogService {

    @Autowired
    private ShelfSensorLogRepo shelfSensorLogRepo;

    // Log customer entry near a shelf
    public ShelfSensorLog logEntry(int shelfId) {
        ShelfSensorLog log = new ShelfSensorLog();
        Shelf shelf = new Shelf();
        shelf.setId(shelfId); // Assuming you're just setting shelf by ID, you can fetch it from a Shelf service if needed.

        log.setShelf(shelf);
        log.setEntryTime(new Date());
        return shelfSensorLogRepo.save(log);
    }

    // Log customer exit near a shelf
    public ShelfSensorLog logExit(int logId) {
        ShelfSensorLog log = shelfSensorLogRepo.findById(logId).orElse(null);

        if (log != null) {
            log.setExitTime(new Date());
            shelfSensorLogRepo.save(log);
        }

        return log;
    }

    // Fetch logs by Shelf ID
    public List<ShelfSensorLog> getLogsByShelfId(int shelfId) {
        return shelfSensorLogRepo.findByShelf_Id(shelfId);
    }

    // Fetch all logs
    public List<ShelfSensorLog> getAllLogs() {
        return shelfSensorLogRepo.findAll();
    }
}
