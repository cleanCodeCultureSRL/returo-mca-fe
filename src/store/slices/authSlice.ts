import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  dateJoined: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

// Local storage helpers
const LOCAL_STORAGE_KEY = "returo_auth";
const USERS_STORAGE_KEY = "returo_users";

const saveToLocalStorage = (data: { user: User; token: string }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};

const loadFromLocalStorage = (): { user: User; token: string } | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

const saveUsersToStorage = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

const loadUsersFromStorage = (): User[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = loadUsersFromStorage();

      // Debug logging
      console.log("All users in storage:", users);
      console.log("Looking for email:", email);

      const user = users.find((u) => u.email === email);

      if (!user) {
        return rejectWithValue(
          "Utilizatorul nu a fost găsit. Verifică email-ul sau înregistrează-te."
        );
      }

      // For demo purposes, any password works if user exists
      // In real app, you'd validate password hash

      const token = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}`;

      const authData = { user, token };
      saveToLocalStorage(authData);

      return authData;
    } catch {
      return rejectWithValue(
        "Autentificare eșuată. Te rugăm să încerci din nou."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      firstName,
      lastName,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const users = loadUsersFromStorage();

      // Debug logging
      console.log("Registering user:", { email, firstName, lastName });
      console.log("Existing users:", users);

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        return rejectWithValue("Un utilizator cu acest email există deja.");
      }

      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        email,
        firstName,
        lastName,
        phone,
        avatar: "/illustrations/persona_illustration.png",
        dateJoined: new Date().toISOString(),
        isVerified: false,
      };

      // Save user to "database"
      users.push(newUser);
      saveUsersToStorage(users);

      // Debug logging
      console.log("User registered successfully:", newUser);
      console.log("Updated users list:", users);

      const token = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}`;

      const authData = { user: newUser, token };
      saveToLocalStorage(authData);

      return authData;
    } catch {
      return rejectWithValue(
        "Înregistrare eșuată. Te rugăm să încerci din nou."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      return true;
    } catch {
      return rejectWithValue(
        "Deconectare eșuată. Te rugăm să încerci din nou."
      );
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const savedAuth = loadFromLocalStorage();

      if (!savedAuth) {
        return rejectWithValue("Nu există autentificare salvată");
      }

      // Simulate token validation
      await new Promise((resolve) => setTimeout(resolve, 500));

      return savedAuth;
    } catch {
      return rejectWithValue("Verificarea autentificării a eșuat");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updates: Partial<User>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const currentUser = state.auth.user;

      if (!currentUser) {
        return rejectWithValue("Nu există utilizator pentru actualizare");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...currentUser, ...updates };

      // Update in "database"
      const users = loadUsersFromStorage();
      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        saveUsersToStorage(users);
      }

      // Update in localStorage
      const token = state.auth.token;
      if (token) {
        saveToLocalStorage({ user: updatedUser, token });
      }

      return updatedUser;
    } catch {
      return rejectWithValue("Actualizarea a eșuat");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check auth status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
