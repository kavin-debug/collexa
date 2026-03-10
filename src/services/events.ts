import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { CampusEvent } from '@/types';

const COLLECTION = 'events';

export const fetchEvents = async (): Promise<CampusEvent[]> => {
  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CampusEvent));
};

export const fetchEventById = async (id: string): Promise<CampusEvent | null> => {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as CampusEvent;
};

export const createEvent = async (event: Omit<CampusEvent, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...event,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateEvent = async (id: string, data: Partial<CampusEvent>): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteEvent = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};
