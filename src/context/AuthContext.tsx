import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { fetchUserProfile } from '@/services/users';
import type { AppUser } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  isAdmin: false,
  isStudent: false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        // Try to fetch role from Firestore
        try {
          const profile = await fetchUserProfile(fbUser.uid);
          if (profile) {
            setUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: profile.displayName || fbUser.displayName,
              role: profile.role,
              department: profile.department,
              year: profile.year,
            });
          } else {
            // Fallback for users without a profile doc (legacy)
            setUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName,
              role: 'student',
            });
          }
        } catch {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            role: 'student',
          });
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, isAdmin, isStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
