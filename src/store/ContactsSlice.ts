import { Contact } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './ContactsThunk.ts';
import { RootState } from '../app/store.ts';

interface ContactsSlice {
  contacts: Contact[];
  fetchLoading: boolean;
}

const initialState: ContactsSlice = {
  contacts: [],
  fetchLoading: false,
}

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, {payload: contacts}) => {
      state.fetchLoading = false;
      state.contacts = contacts
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const contactsReducer = ContactsSlice.reducer;