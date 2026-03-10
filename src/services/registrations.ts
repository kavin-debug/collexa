import { collection, getDocs, addDoc, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { EventRegistration } from '@/types';

const COLLECTION = 'registrations';

export const fetchRegistrationsByUser = async (userId: string): Promise<EventRegistration[]> => {
  const q = query(collection(db, COLLECTION), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as EventRegistration));
};

export const fetchRegistrationsByEvent = async (eventId: string): Promise<EventRegistration[]> => {
  const q = query(collection(db, COLLECTION), where('eventId', '==', eventId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as EventRegistration));
};

export const registerForEvent = async (data: Omit<EventRegistration, 'id' | 'registeredAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    registeredAt: serverTimestamp(),
  });
  return docRef.id;
};

export const unregisterFromEvent = async (registrationId: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, registrationId));
};

export const getRegistrationCount = async (eventId: string): Promise<number> => {
  const regs = await fetchRegistrationsByEvent(eventId);
  return regs.length;
};
