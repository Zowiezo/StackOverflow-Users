import React from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box bg="#F8F8F8">
      <Container maxWidth="lg">
        <UserList />
      </Container>
      </Box>
    </ChakraProvider>

  );
};

export default App;
