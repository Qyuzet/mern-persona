// @ts-nocheck

import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],

  setUsers: (users) => set({ users }),

  findUser: async (user) => {
    console.log("user to find:", user);

    if (!user.username || !user.email || !user.credential) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(JSON.stringify(user));

    if (!res.ok) {
      console.log("not ok");
      return { success: false, message: "Failed to find user." };
    }

    const data = await res.json();
    console.log("ok ketemu");

    set((state) => ({ users: [...state.users, data.data] }));

    return { success: true, message: "User found." };
  },

  createUser: async (newUsers) => {
    console.log("new users:", newUsers);
    if (!newUsers.username || !newUsers.email || !newUsers.credential) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUsers),
    });

    if (!res.ok) {
      console.log("not ok");
      return { success: false, message: "Failed to create user." };
    }

    const data = await res.json();
    console.log("ok");

    set((state) => ({ users: [...state.users, data.data] }));

    return { success: true, message: "User Created." };
  },

  fetchUsers: async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    set({ users: data.data });
  },

  deleteUser: async (pid) => {
    const res = await fetch(`/api/users/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      users: state.users.filter((user) => user._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateUser: async (pid, updatedUser) => {
    const res = await fetch(`/api/users/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      users: state.users.map((user) => (user._id === pid ? data.data : user)),
    }));

    return { success: true, message: data.data };
  },
}));
