import { Box, Typography } from '@mui/material';
import * as React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSession, signIn, signOut } from 'next-auth/react';

const Index = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar />
      <Box sx={{ marginY: 1 }}>
        {session && (
          <Typography variant='h6' component='div'>
            Welcome {session.user.name}
          </Typography>
        )}
      </Box>
      <Footer title='DAT 2.0' description='@irfanalamt' />
    </>
  );
};

export default Index;
