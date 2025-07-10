import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertMeetingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  await setupAuth(app);

  // Meeting booking routes
  app.get("/api/meetings", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user!;
      let meetings;

      if (user.role === "admin") {
        meetings = await storage.getAllMeetings();
      } else {
        meetings = await storage.getMeetingsByUser(user.id);
      }

      res.json(meetings);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/meetings/date/:date", async (req, res, next) => {
    try {
      const { date } = req.params;
      const bookedSlots = await storage.getBookedTimeSlots(date);
      res.json({ bookedSlots });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/meetings", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const user = req.user!;
      const validatedData = insertMeetingSchema.parse({
        ...req.body,
        userId: user.id
      });

      // Check for conflicts
      const hasConflict = await storage.isMeetingConflict(
        validatedData.date,
        validatedData.timeSlot
      );

      if (hasConflict) {
        return res.status(400).json({ 
          message: "This time slot is already booked" 
        });
      }

      const meeting = await storage.createMeeting(validatedData);
      res.status(201).json(meeting);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
