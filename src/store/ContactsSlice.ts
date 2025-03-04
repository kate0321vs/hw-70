import { ApiContact, Contact } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createContact,
  deleteContact,
  fetchContacts,
  fetchOneContact,
  updateContact
} from './ContactsThunk.ts';
import { RootState } from '../app/store.ts';

interface ContactsSlice {
  contacts: Contact[];
  contact: ApiContact | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ContactsSlice = {
  contacts: [],
  contact: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false
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

    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneContact.pending, (state) => {
      state.contact = null;
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
      state.fetchOneLoading = false;
      state.contact = contact;
    });
    builder.addCase(fetchOneContact.rejected, (state) => {
      state.contact = null;
      state.fetchOneLoading = false;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.updateLoading = false
    });
    builder.addCase(updateContact.rejected, (state) => {
      state.updateLoading = false
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.deleteLoading = true
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false
    });
  }
});

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.contacts.createLoading;
export const selectFetchOneLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectUpdateLoading = (state: RootState) => state.contacts.updateLoading;
export const selectContact = (state: RootState) => state.contacts.contact;
export const selectDeleteLoading = (state: RootState) => state.contacts.deleteLoading;
export const contactsReducer = ContactsSlice.reducer;