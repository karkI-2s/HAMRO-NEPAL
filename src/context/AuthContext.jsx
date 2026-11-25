/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD USER ON REFRESH ===== */
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /* ===== HELPERS ===== */
  const getUsers = () =>
    JSON.parse(localStorage.getItem("users")) || [];

  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  /* ===== REGISTER ===== */
  const register = async (username, password) => {
    const users = getUsers();

    if (!username || !password) {
      return { success: false, error: "All fields are required" };
    }

    if (users.find(u => u.username === username)) {
      return { success: false, error: "Username already exists" };
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      role: "USER",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true };
  };

  /* ===== LOGIN ===== */
  const login = async (username, password) => {
    const users = getUsers();

    const found = users.find(
      u => u.username === username && u.password === password
    );

    if (!found) {
      return { success: false, error: "Invalid username or password" };
    }

    const currentUser = {
      id: found.id,
      username: found.username,
      role: found.role
    };

    setUser(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return { success: true };
  };

  /* ===== RESET PASSWORD ===== */
  const resetPassword = async (username, newPassword) => {
    const users = getUsers();
    const index = users.findIndex(u => u.username === username);

    if (index === -1) {
      return { success: false, error: "User not found" };
    }

    users[index].password = newPassword;
    saveUsers(users);

    return { success: true };
  };

  /* ===== LOGOUT ===== */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  /* ===== CONTEXT VALUE ===== */
  const value = {
    user,
    loading,
    register,
    login,
    resetPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/* ===== CUSTOM HOOK ===== */
export const useAuth = () => useContext(AuthContext);
