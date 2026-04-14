import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { CampusEvent } from '@/types';
import { assertOnline, canUseLocalStorage, isBrowserOnline } from '@/lib/network';

const COLLECTION = 'events';
const CACHE_KEY = 'events';

const readCachedEvents = (): CampusEvent[] => {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const cached = window.localStorage.getItem(CACHE_KEY);

    if (!cached) {
      return [];
    }

    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed as CampusEvent[] : [];
  } catch {
    return [];
  }
};

const writeCachedEvents = (events: CampusEvent[]) => {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(events));
  } catch {
    // Ignore storage write failures and continue using live Firebase data.
  }
};

const cacheEvent = (event: CampusEvent) => {
  const nextEvents = [event, ...readCachedEvents().filter((item) => item.id !== event.id)]
    .sort((a, b) => b.date.localeCompare(a.date));

  writeCachedEvents(nextEvents);
};

export const fetchEvents = async (): Promise<CampusEvent[]> => {
  if (!isBrowserOnline()) {
    return readCachedEvents();
  }

  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));

  try {
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CampusEvent));
    writeCachedEvents(events);
    return events;
  } catch {
    return readCachedEvents();
  }
};

export const fetchEventById = async (id: string): Promise<CampusEvent | null> => {
  const getCachedEvent = () => readCachedEvents().find((event) => event.id === id) || null;

  if (!isBrowserOnline()) {
    return getCachedEvent();
  }

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));

    if (!snap.exists()) {
      return null;
    }

    const event = { id: snap.id, ...snap.data() } as CampusEvent;
    cacheEvent(event);
    return event;
  } catch {
    return getCachedEvent();
  }
};

export const createEvent = async (event: Omit<CampusEvent, 'id' | 'createdAt'>): Promise<string> => {
  assertOnline();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...event,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateEvent = async (id: string, data: Partial<CampusEvent>): Promise<void> => {
  assertOnline();
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteEvent = async (id: string): Promise<void> => {
  assertOnline();
  await deleteDoc(doc(db, COLLECTION, id));
};
