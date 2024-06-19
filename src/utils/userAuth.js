import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

//  REGISTRATION LOGIC
export const validatePassword = (
  password,
  confirmPassword,
  setPasswordError
) => {
  let isValid = true;
  if (password !== confirmPassword) {
    isValid = false;
    setTimeout(() => {
      setPasswordError(null);
    }, 5000);
    setPasswordError("Passwords do not match");
    return isValid;
  }
  setPasswordError(null);
  return isValid;
};

export const googleRegistration = async (
  navigate,
  setCurrentUser,
  setDbError,
  setLoading
) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      await setDoc(doc(db, "users", `${user.uid}`), {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setCurrentUser(user);
      setLoading(false);
      navigate("/");
    }
  } catch (error) {
    setDbError("Unable to sign in");
    setLoading(false);
  }
};
export const userRegistration = async (
  username,
  email,
  password,
  setLoading,
  setDbError,
  setCurrentUser,
  navigate
) => {
  try {
    setDbError(null);
    setLoading(true);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    if (user) {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      await setDoc(doc(db, "users", `${user.uid}`), {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setCurrentUser(user);
      setLoading(false);
      navigate("/");
    }
  } catch (error) {
    setDbError("Password should be at least 6 characters");
    setLoading(false);
    setTimeout(() => {
      setDbError(null);
    }, 3000);
  }
};

// LOGIN
export const googleLogin = async (
  setCurrentUser,
  setLoading,
  setError,
  navigate
) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      setCurrentUser(user);
      setLoading(false);
      navigate("/");
    }
  } catch (error) {
    setError("Unable to login");
    setLoading(false);
  }
};

export const userLogin = async (
  email,
  password,
  setCurrentUser,
  setLoading,
  setError,
  navigate
) => {
  try {
    setError(null);
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      setCurrentUser(user);
      setLoading(false);
      navigate("/");
    }
  } catch (error) {
    setError("We did not recognise your details");
    setLoading(false);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }
};
