import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOCK_USERS } from '../../api/mockData';

// Load stored user & token from localStorage if available
const storedUser = localStorage.getItem('lms_user')
  ? JSON.parse(localStorage.getItem('lms_user'))
  : null;
const storedToken = localStorage.getItem('lms_token') || null;

const initialState = {
  user: storedUser,
  token: storedToken,
  role: storedUser?.role || null, // 'student' | 'instructor' | 'admin'
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
  otpSentEmail: null,
  isEmailVerified: false,
};

// Async Thunk: Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call delay (in production: axiosClient.post('/auth/login', { email, password }))
      await new Promise((res) => setTimeout(res, 800));

      // Mock validation
      if (!email || !password) {
        return rejectWithValue('Please provide both email and password.');
      }

      // Check against mock roles
      let user = null;
      if (email.includes('instructor')) {
        user = MOCK_USERS.instructor;
      } else if (email.includes('admin')) {
        user = MOCK_USERS.admin;
      } else {
        user = { ...MOCK_USERS.student, email };
      }

      const token = `jwt_token_${Date.now()}_${user.role}`;
      localStorage.setItem('lms_token', token);
      localStorage.setItem('lms_user', JSON.stringify(user));

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed. Please check credentials.');
    }
  }
);

// Async Thunk: Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 800));

      if (!name || !email || !password) {
        return rejectWithValue('All fields are required.');
      }

      // Simulation of Nodemailer sending an OTP activation email
      return {
        email,
        message: 'Account registered! A 6-digit verification code has been sent to your email.'
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed.');
    }
  }
);

// Async Thunk: Verify OTP (Account Activation via Nodemailer)
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp, role = 'student', name = 'New User' }, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 800));

      if (otp !== '123456') {
        return rejectWithValue('Invalid or expired verification code. Use default: 123456');
      }

      const user = {
        _id: `usr_${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        enrolledCoursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      const token = `jwt_token_${Date.now()}_${role}`;
      localStorage.setItem('lms_token', token);
      localStorage.setItem('lms_user', JSON.stringify(user));

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.message || 'OTP verification failed.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Quick login for testing student, instructor, and admin flows
    quickLoginAs: (state, action) => {
      const targetRole = action.payload; // 'student' | 'instructor' | 'admin'
      const user = MOCK_USERS[targetRole] || MOCK_USERS.student;
      const token = `jwt_mock_token_${targetRole}`;
      
      state.user = user;
      state.token = token;
      state.role = user.role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      localStorage.setItem('lms_token', token);
      localStorage.setItem('lms_user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      state.otpSentEmail = null;

      localStorage.removeItem('lms_token');
      localStorage.removeItem('lms_user');
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('lms_user', JSON.stringify(state.user));
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSentEmail = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.isAuthenticated = true;
        state.isEmailVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { quickLoginAs, logoutUser, updateProfile, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
