import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchContacts } from '../../store/ContactsThunk.ts';
import { selectContacts, selectFetchLoading } from '../../store/ContactsSlice.ts';
import ContactItem from './ContactItem/ContactItem.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { Contact } from '../../types';
import ContactModal from '../../components/UI/ContactModal/ContactModal.tsx';
import { useAppDispatch } from '../../app/hook.ts';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectFetchLoading);
  const contacts = useSelector(selectContacts);
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (contact: Contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  let contactsList: React.ReactNode = <Spinner/>;

  if (!loading) {
    contactsList = contacts.map((contact) => (
      <ContactItem
        key={contact.id}
        photo={contact.photo}
        name={contact.name}
        handleClick={() => handleOpen(contact)}
      />
    ));
  }

  return (
    <>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {contactsList}
      </Container>

      <ContactModal contact={selectedContact} open={open} onClose={handleClose} />
    </>
  )
    ;
};

export default Contacts;