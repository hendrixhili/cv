import { users, meetings, type User, type InsertUser, type Meeting, type InsertMeeting, type MeetingWithUser } from "@shared/schema";
import { db } from "./db";
import { eq, and, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByUsernameOrEmail(identifier: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMeeting(id: number): Promise<MeetingWithUser | undefined>;
  getMeetingsByUser(userId: number): Promise<MeetingWithUser[]>;
  getMeetingsByDate(date: string): Promise<MeetingWithUser[]>;
  getAllMeetings(): Promise<MeetingWithUser[]>;
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getBookedTimeSlots(date: string): Promise<string[]>;
  isMeetingConflict(date: string, timeSlot: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByUsernameOrEmail(identifier: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(
      or(eq(users.username, identifier), eq(users.email, identifier))
    );
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMeeting(id: number): Promise<MeetingWithUser | undefined> {
    const [meeting] = await db
      .select()
      .from(meetings)
      .leftJoin(users, eq(meetings.userId, users.id))
      .where(eq(meetings.id, id));
    
    if (!meeting || !meeting.users) return undefined;
    
    return {
      ...meeting.meetings,
      user: meeting.users
    };
  }

  async getMeetingsByUser(userId: number): Promise<MeetingWithUser[]> {
    const results = await db
      .select()
      .from(meetings)
      .leftJoin(users, eq(meetings.userId, users.id))
      .where(eq(meetings.userId, userId));
    
    return results
      .filter(result => result.users)
      .map(result => ({
        ...result.meetings,
        user: result.users!
      }));
  }

  async getMeetingsByDate(date: string): Promise<MeetingWithUser[]> {
    const results = await db
      .select()
      .from(meetings)
      .leftJoin(users, eq(meetings.userId, users.id))
      .where(eq(meetings.date, date));
    
    return results
      .filter(result => result.users)
      .map(result => ({
        ...result.meetings,
        user: result.users!
      }));
  }

  async getAllMeetings(): Promise<MeetingWithUser[]> {
    const results = await db
      .select()
      .from(meetings)
      .leftJoin(users, eq(meetings.userId, users.id));
    
    return results
      .filter(result => result.users)
      .map(result => ({
        ...result.meetings,
        user: result.users!
      }));
  }

  async createMeeting(insertMeeting: InsertMeeting): Promise<Meeting> {
    const [meeting] = await db
      .insert(meetings)
      .values(insertMeeting)
      .returning();
    return meeting;
  }

  async getBookedTimeSlots(date: string): Promise<string[]> {
    const results = await db
      .select({ timeSlot: meetings.timeSlot })
      .from(meetings)
      .where(and(
        eq(meetings.date, date),
        eq(meetings.status, "confirmed")
      ));
    
    return results.map(result => result.timeSlot);
  }

  async isMeetingConflict(date: string, timeSlot: string): Promise<boolean> {
    const [existing] = await db
      .select()
      .from(meetings)
      .where(and(
        eq(meetings.date, date),
        eq(meetings.timeSlot, timeSlot),
        eq(meetings.status, "confirmed")
      ));
    
    return !!existing;
  }
}

export const storage = new DatabaseStorage();
