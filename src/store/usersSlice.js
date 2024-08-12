import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MAIN_URL } from "../utils/const";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(MAIN_URL);

      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
    error: null,
  },
  reducers: {
    createUser(state, action) {
      state.users.push({
        name: action.payload.values.name,
        username: action.payload.values.username,
        email: action.payload.values.email,
        phone: action.payload.values.phone,
        address: {
          zipcode: action.payload.values.zipcode || '',
        },
        id: action.payload.id,
      })
    },
    removeUsers(state, action) {
      state.users = state.users.filter(user => !(action.payload.includes(user.id)))
    },

    filterUser(state, action) {
       const { name, value } = action.payload;
       if (value) {
        state.users = state.users.filter(user => user[name].toLowerCase().includes(value.toLowerCase()));
       }
      //  else console.log('action', action.payload);
    },

    sortUsers(state, action) {
      const fieldName = action.payload;

      switch (fieldName) {
        case 'name':
          state.users = state.users.sort((a, b) => a[fieldName][0] > b[fieldName][0] ? 1 : -1)
          break;
        case 'zipcode':
          state.users = state.users.sort((a, b) => a.address[fieldName][0] > b.address[fieldName][0] ? 1 : -1)
          break;
        case 'id':
          state.users = state.users.sort((a, b) => a.id > b.id ? 1 : -1)
          break;
        default:
          console.log('Сортировка по умолчанию');
      }

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const {
  createUser,
  removeUsers,
  filterUser,
  sortUsers
} = userSlice.actions;
export default userSlice.reducer;