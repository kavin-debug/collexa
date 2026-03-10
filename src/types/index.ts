export type UserRole = 'student' | 'admin';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  department?: string;
  year?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  category: EventCategory;
  description: string;
  location?: string;
  organizer?: string;
  imageUrl?: string;
  club?: string;
  createdBy: string;
  createdAt: string;
}

export type EventCategory = 'Academic' | 'Sports' | 'Cultural' | 'Tech' | 'Social' | 'Workshop';

export const EVENT_CATEGORIES: EventCategory[] = ['Academic', 'Sports', 'Cultural', 'Tech', 'Social', 'Workshop'];

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
}

export interface MatchInsight {
  score: number;
  message: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  year: string;
  registeredAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'update' | 'announcement';
  read: boolean;
  createdAt: string;
  eventId?: string;
}
