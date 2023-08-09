/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetch("https://edu-play-mart-server.vercel.app/api/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) localStorage.setItem("token", data.token);
          })
          .catch((err) => console.error(err));
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (displayName, photoURL, email, password) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser((user) => ({ ...user, displayName, photoURL }));
      return { message: "Register successful!" };
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return { message: "Login successful!" };
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { message: "Login successful!" };
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    try {
      setLoading(true);
      return signOut(auth);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userInfo = {
    user,
    loading,
    error,
    createUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
