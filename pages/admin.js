import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Admin = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('/api/scoreGetAll')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        alert('score fetch api error');
      });
  }, []);

  if (!session?.user.isAdmin) {
    return (
      <Typography sx={{ marginY: 5, textAlign: 'center' }} variant='h3'>
        NO ADMIN ACCESS 🚫
      </Typography>
    );
  }

  if (isLoading) return <Typography variant='h5'>Loading...</Typography>;
  if (!data) return <Typography variant='h5'>No profile data</Typography>;
  console.log(data);
  return (
    <Container maxWidth='md'>
      <Button sx={{ marginTop: 3 }} variant='contained' href='/'>
        <ArrowBackIcon />
        <HomeIcon />
      </Button>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Paper
          sx={{ maxWidth: 300, marginX: 'auto', backgroundColor: '#e8f5e9' }}
        >
          <Typography
            sx={{ marginX: 'auto', display: 'inline-flex' }}
            variant='h4'
          >
            ADMIN PANEL
          </Typography>
          <AdminPanelSettingsIcon sx={{ fontSize: '2.5rem', paddingTop: 1 }} />
        </Paper>
        <Paper sx={{ marginTop: 3, padding: 2, backgroundColor: '#e0f7fa' }}>
          {data.map((el, i) => {
            return (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    sx={{ marginX: 1, alignSelf: 'flex-end' }}
                    key={i}
                    variant='subtitle1'
                  >
                    {`${el.email}`}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <AssignmentTurnedInIcon
                      sx={{
                        fontSize: '1.5rem',
                        marginTop: 2,
                        marginRight: 1,
                        alignSelf: 'flex-start',
                      }}
                    />
                    <Typography
                      sx={{
                        boxShadow: 1,
                        paddingX: 1,
                        alignSelf: 'flex-end',
                        backgroundColor: 'white',
                      }}
                      fontSize='1.2rem'
                      variant='body1'
                      key={i}
                    >
                      {`${el.score} `}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginY: 1, borderBottomWidth: 3 }}></Divider>
              </>
            );
          })}
        </Paper>
      </Box>
    </Container>
  );
};

export default Admin;
