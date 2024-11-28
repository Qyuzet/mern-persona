//@ts-nocheck
import { create } from "zustand";

export const useDataLog = create((set, get) => ({
  data: [],

  setData: (newData) => {
    set((state) => {
      const { profile, history, context } = newData;

      // Find the existing history object, or create a new one if it doesn't exist
      const updatedHistory = history
        ? { ...history, context: [...(history.context || []), context] }
        : { context: [context] }; // Initialize context array if no history object exists

      return {
        data: [
          ...state.data.filter((item) => !item.profile), // Remove existing profile
          { profile }, // Set new profile
          { history: updatedHistory }, // Update the history object and append context
        ],
      };
    });
  },
  logData: () => {
    console.log(get().data);
  },
}));
