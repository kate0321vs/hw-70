import { Container } from '@mui/material';
import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectContact, selectFetchOneLoading, selectUpdateLoading } from '../../store/ContactsSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiContact } from '../../types';
import { fetchOneContact, updateContact } from '../../store/ContactsThunk.ts';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { toast } from 'react-toastify';

const EditContact = () => {
  const dispatch = useAppDispatch();
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const contact = useAppSelector(selectContact);
  const { id } = useParams() as {id: string};
  const navigate = useNavigate();

  useEffect(() => {
     dispatch(fetchOneContact(id));
  }, [dispatch, id]);

  const onSubmit = async (contact: ApiContact) => {
    if (id) {
      await dispatch(updateContact({id, contact}));
      toast.success('Contact was edited Successfully!')
      navigate('/');
    }
  }

  return (
    <Container>
      {fetchOneLoading ? <Spinner /> :
        <ContactForm onSubmitFormToAddContact={onSubmit} isEdit isLoading={updateLoading} contact={contact} />}
    </Container>
  );
};

export default EditContact;