package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.TrialRoom;
import com.backend.ShopperTracking.repository.TrialRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrialRoomService {

    @Autowired
    private TrialRoomRepo trialRoomRepository;

    // Get all trial rooms
    public List<TrialRoom> getAllTrialRooms() {
        return trialRoomRepository.findAll();
    }

    // Get a trial room by ID
    public TrialRoom getTrialRoomById(int id) {
        return trialRoomRepository.findById(id).orElse(null);
    }

    // Add a new trial room
    public String addTrialRoom(TrialRoom trialRoom) {
        trialRoomRepository.save(trialRoom);
        return "Trial room added successfully";
    }

    // Update an existing trial room
    public String updateTrialRoom(TrialRoom trialRoom) {
        if (trialRoomRepository.existsById(trialRoom.getId())) {
            trialRoomRepository.save(trialRoom);
            return "Trial room updated successfully";
        } else {
            return "Trial room not found";
        }
    }

    // Delete a trial room by ID
    public String deleteTrialRoom(int id) {
        if (trialRoomRepository.existsById(id)) {
            trialRoomRepository.deleteById(id);
            return "Trial room deleted successfully";
        } else {
            return "Trial room not found";
        }
    }
}
