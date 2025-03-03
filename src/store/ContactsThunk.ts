import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact, ContactsListApi } from '../types';
import axiosApi from '../axiosApi.ts';

export const fetchContacts = createAsyncThunk<Contact[], undefined>(
  'contacts/fetchContacts',
  async () => {
    const contactsResponse = await axiosApi<ContactsListApi | null>('/contacts.json');
    const contacts = contactsResponse.data;

    let newContacts: Contact[] = [];

    if (contacts) {
       newContacts = Object.keys(contacts).map((key) => {
        return {...contacts[key], id: key};
      });
    }
    console.log(newContacts)
    return newContacts
  });