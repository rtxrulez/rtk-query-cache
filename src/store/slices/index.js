import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

export const fetchList = createAsyncThunk(
  'contacts/fetchList',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://randomuser.me/api/?results=15');

      if (!response.ok) {
        throw new Error('Load list Error!');
      }

      const { results } = await response.json();

      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// не нашел в описание api добавление нового пользователя.
// делаю как пример из своего старого приложения.

export const addItem = createAsyncThunk(
  'contacts/addItem',
  async function (item, { rejectWithValue }) {
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${item.name}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        throw new Error('Can\'t delete task. Server error.');
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    status: null,
    error: null,
    list: [],
    searchList: []
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [fetchList.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.list = action.payload
    },
    [fetchList.rejected]: setError,
    [addItem.rejected]: setError,
  }
});


export const { filterList } = contactsSlice.actions