import { Avatar, Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ApiContact } from '../../../types';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: ApiContact | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, contact }) => {
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
              <Button variant="outlined">Edit</Button>
              <Button variant="outlined" color="error">
                Delete
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ContactModal;
