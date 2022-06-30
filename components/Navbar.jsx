import { Typography, AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

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
              marginLeft: '10px',
              backgroundColor: '#00897A',
            }}
          >
            Register
          </Button>
          <Button
            variant='contained'
            href='/about'
            sx={{
              color: 'white',
              marginX: '10px',
              backgroundColor: '#00897A',
            }}
          >
            About
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
