import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiContact, Contact, ContactsListApi } from '../types';
import axiosApi from '../axiosApi.ts';

export const fetchContacts = createAsyncThunk<Contact[], undefined>(
  'contacts/fetchAll',
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
    return newContacts.reverse()
  });

 export const createContact = createAsyncThunk<void, ApiContact>(
   'contacts/create',
   async (contact) => {
     await axiosApi.post<ApiContact>('/contacts.json', contact);
   }
 );

 export const fetchOneContact = createAsyncThunk<ApiContact, string>(
   'contacts/fetchOne',
   async (id) => {
     console.log(id)
     const contactResponse = await axiosApi<ApiContact | null>(`/contacts/${id}.json`);
     const contact = contactResponse.data;
     if (!contact) {
       throw new Error("Not Found!");
     }
     return contact;
   }
 );

 export const updateContact = createAsyncThunk<void, {id: string, contact: ApiContact} >(
   'contacts/update',
   async ({contact, id}) => {
     await axiosApi.put(`/contacts/${id}.json`, contact);
   }
 );

 export const deleteContact = createAsyncThunk(
   'contacts/fetchDelete',
     async (id: string) => {
     await axiosApi.delete(`/contacts/${id}.json`);
     }
)