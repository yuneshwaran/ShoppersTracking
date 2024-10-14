package com.backend.ShopperTracking.service.sensors;

import com.backend.ShopperTracking.model.Shelf;
import com.backend.ShopperTracking.dto.ShelfSensorLog;
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
    public int logEntry(int shelfId) {
        ShelfSensorLog log = new ShelfSensorLog();
        Shelf shelf = new Shelf();
        shelf.setId(shelfId);

        log.setShelf(shelf);
        log.setEntryTime(new Date());
        return shelfSensorLogRepo.save(log).getId();
    }

    // Log customer exit near a shelf
    public int logExit(int logId) {

        ShelfSensorLog log = shelfSensorLogRepo.findById(logId).orElse(null);

        if (log != null) {
            log.setExitTime(new Date());
            shelfSensorLogRepo.save(log);
        }

        return log.getId();
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
