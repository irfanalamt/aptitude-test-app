import { Typography, AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSession, signIn, signOut } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { color } from '@mui/system';

const LogoLg = styled(Typography)(({ theme }) => ({
  display: 'none',
  fontWeight: 'bold',
  [theme.breakpoints.up('sm')]: { display: 'block' },
}));
const LogoSm = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontWeight: 'bold',
  [theme.breakpoints.up('sm')]: { display: 'none' },
}));

const Navbar = () => {
  const { data: session, status } = useSession();
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: '#3f51b5', paddingY: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LogoLg color='black' variant='h6'>
          DAT 2.0
        </LogoLg>
        <LogoSm color='black' variant='h6'>
          DAT
        </LogoSm>
        <div style={{ alignItems: 'center' }}>
          {!session && (
            <>
              <Button
                variant='contained'
                href='/login'
                sx={{
                  color: 'white',
                  backgroundColor: '#00897A',
                }}
              >
                Login
              </Button>
              <Button
                variant='contained'
                href='/register'
                sx={{
                  color: 'white',
                  marginX: '10px',
                  backgroundColor: '#00897A',
                }}
              >
                Register
              </Button>
            </>
          )}
          {session?.user.isAdmin && (
            <Button
              href='/admin'
              sx={{ backgroundColor: '#f44336' }}
              color='secondary'
              variant='contained'
            >
              ADMIN PANEL
            </Button>
          )}

          {session && (
            <Button
              variant='contained'
              onClick={handleSignout}
              sx={{
                color: 'white',
                backgroundColor: '#00897A',
                marginX: 1,
              }}
            >
              <LogoutIcon sx={{ marginX: 1 }} /> Sign Out
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
