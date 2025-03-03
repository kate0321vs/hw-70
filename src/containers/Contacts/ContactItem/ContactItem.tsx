import { Avatar, Card, CardContent, Typography } from '@mui/material';

interface Props {
  name: string;
  photo: string;
}

const ContactItem: React.FC<Props> = ({name, photo}) => {


  return (

      <Card sx={{ width: 500, display: "flex", alignItems: "center", p: 2, my:2 }}>
        <Avatar src={photo} alt={name} sx={{ width: 56, height: 56, mr: 2 }} />
        <CardContent>
          <Typography variant="h6">{name}</Typography>
        </CardContent>
      </Card>

  );
};

export default ContactItem;