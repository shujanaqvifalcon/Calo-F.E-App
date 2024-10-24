import React from 'react';
import { Box, Container } from '@mui/material';
import JobList from './components/JobList';

function App() {
  return (
    <Container>
      <Box mt={5}>
        <JobList />
      </Box>
    </Container>
  );
}

export default App;
