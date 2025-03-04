import { Avatar, Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Contact } from '../../../types';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { deleteContact, fetchContacts } from '../../../store/ContactsThunk.ts';
import { selectDeleteLoading } from '../../../store/ContactsSlice.ts';
import ButtonSpinner from '../Spinner/ButtonSpinner/ButtonSpinner.tsx';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: Contact | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, contact }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const onDelete = async () => {
      if (contact && window.confirm("Are you sure you want to delete this dish?")) {
        await dispatch(deleteContact(contact.id));
        await dispatch(fetchContacts());
        onClose();
      }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          backgroundColor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {contact && (
          <>
            <Box display="flex" gap={2} alignItems="center">
              <Avatar src={contact.photo} alt={contact.name} sx={{ width: 56, height: 56, mr: 2 }} />
              <Typography variant="h6" >{contact.name}</Typography>
            </Box>
            <Box mt={2} display="flex" alignItems="center" gap={1}>
              <Typography color="primary">{contact.phone}</Typography>
            </Box>
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography color="primary">{contact.email}</Typography>
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <NavLink className='editBtn' to={`edit-contact/${contact.id}`}>Edit</NavLink>
              <Button onClick={onDelete} variant="outlined" color="error" disabled={deleteLoading}>
                {deleteLoading && <ButtonSpinner/>} Delete
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ContactModal;
