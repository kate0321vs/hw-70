import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../store/ContactsThunk.ts';
import { selectContacts, selectFetchLoading } from '../../store/ContactsSlice.ts';
import ContactItem from './ContactItem/ContactItem.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const Contacts = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectFetchLoading);
  const contacts = useSelector(selectContacts);

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
      />
    ));
  }

  return (
    <>
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {contactsList}
    </Container>
</>
)
  ;
};

export default Contacts;