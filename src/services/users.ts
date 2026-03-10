import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  department?: string;
  year?: string;
  createdAt: string;
}

const COLLECTION = 'users';

export const createUserProfile = async (profile: UserProfile): Promise<void> => {
  await setDoc(doc(db, COLLECTION, profile.uid), profile);
};

export const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
};
