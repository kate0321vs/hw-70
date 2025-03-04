import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ButtonSpinner from '../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';
import { ApiContact } from '../../types';

interface Props {
  isEdit?: boolean;
  isLoading: boolean;
  onSubmitFormToAddContact: (contact: ApiContact) => void;
  contact?: ApiContact | null;
}

const initialForm = {
  name: '',
  phone: '',
  email: '',
  photo: '',
}

const ContactForm: React.FC<Props> = ({isEdit, isLoading, onSubmitFormToAddContact, contact}) => {
  const [form, setForm] = useState<ApiContact>(initialForm);

  let photoUrl = 'https://i.pinimg.com/736x/64/b2/ca/64b2ca20d03275743621149c0b69157b.jpg';

  if (form.photo) {
    photoUrl = form.photo;
  }

  useEffect(() => {
    if (contact) {
      setForm(contact);
    }
  }, [contact]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0 && form.phone.trim().length === 0) {
      alert('Fill in the required fields!')
      return
    }
    if (form.photo) {
      onSubmitFormToAddContact({...form})
    } else {
      onSubmitFormToAddContact({...form, photo: photoUrl})
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center'}}>
        {isEdit ? 'Edit Contact' : 'Add Contact'}
      </Typography>

      <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Name"
            name="name"
            variant="outlined"
            onChange={onChange}
            value={form.name}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Phone"
            name="phone"
            variant="outlined"
            type="phone"
            onChange={onChange}
            value={form.phone}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            onChange={onChange}
            value={form.email}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Photo"
            name="photo"
            variant="outlined"
            onChange={onChange}
            value={form.photo}
            disabled={isLoading}
          />
        </Grid>

        <Grid container xs={12}>
          <Grid xs={3}>
            <Typography>Preview photo:</Typography>
          </Grid>
          <Grid xs={4}>
            <img style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: "8px"}}
                 src={photoUrl} alt="Contact's Photo" />
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Button sx={{width: '100%', mt: 2}} type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <ButtonSpinner/> : (isEdit ? 'Edit' : 'Add')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;