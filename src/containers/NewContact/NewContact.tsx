import { Container } from '@mui/material';
import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { selectCreateLoading } from '../../store/ContactsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { createContact } from '../../store/ContactsThunk.ts';
import { ApiContact } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const NewContact = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();

  const onSubmit = async (contact: ApiContact) => {
     await dispatch(createContact(contact));
    toast.success('Contact was added Successfully!')
    navigate('/')
  }

  return (
    <Container>
      <ContactForm  onSubmitFormToAddContact={onSubmit} isLoading={loading}/>
    </Container>
  );
};

export default NewContact;