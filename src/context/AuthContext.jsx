import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    }
  }, []);

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({provider: "google"});

  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{user, signInWithGoogle, signOut }}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
}
