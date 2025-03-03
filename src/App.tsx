import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Contacts from "./containers/Contacts/Contacts.tsx";
import EditContact from "./containers/EditContact/EditContact.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";
import { Box } from '@mui/material';

const App = () => {

    return (

      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", flexDirection: "column"  }}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={(
                <Contacts
                />)}
            />
            <Route
              path="/conatacts"
              element={(<Contacts />)}
            />
            <Route path='/edit-contact/:id' element={<EditContact/>}/>
            <Route path="/new-contact" element={(<NewContact/>)}/>
            <Route path="*" element={(<h1>Not page found</h1>)}/>
          </Routes>
        </Layout>
      </Box>


    );
};

export default App
