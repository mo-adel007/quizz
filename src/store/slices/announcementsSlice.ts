import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface AnnouncementsState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementsState = {
  announcements: [],
  loading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async () => {
    const response = await axios.get('http://localhost:5000/api/announcements');
    return response.data;
  }
);

export const createAnnouncement = createAsyncThunk(
  'announcements/createAnnouncement',
  async (announcement: Omit<Announcement, '_id'>) => {
    const response = await axios.post('http://localhost:5000/api/announcements', announcement);
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/updateAnnouncement',
  async (announcement: Announcement) => {
    const response = await axios.put(`http://localhost:5000/api/announcements/${announcement._id}`, announcement);
    return response.data;
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/deleteAnnouncement',
  async (id: string) => {
    await axios.delete(`http://localhost:5000/api/announcements/${id}`);
    return id;
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<Announcement[]>) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch announcements';
      })
      .addCase(createAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.announcements.push(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
        const index = state.announcements.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
        state.announcements = state.announcements.filter(a => a._id !== action.payload);
      });
  },
});

export default announcementsSlice.reducer;