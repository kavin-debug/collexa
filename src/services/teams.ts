import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import type { Team } from '@/types';
import { assertOnline } from '@/lib/network';

const COLLECTION = 'teams';

export const fetchTeams = async (): Promise<Team[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Team));
};

export const joinTeam = async (teamId: string, userId: string): Promise<void> => {
  assertOnline();
  const ref = doc(db, COLLECTION, teamId);
  await updateDoc(ref, { members: arrayUnion(userId) });
};
