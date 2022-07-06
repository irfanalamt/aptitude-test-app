import PropTypes from 'prop-types';
import { Box, Button, Container, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer({ description, title }) {
  return (
    <Box
      component='footer'
      sx={{
        bgcolor: 'background.paper',
        mt: 4,
        py: 6,
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Container maxWidth='lg'>
        <Typography variant='subtitle2' align='center' gutterBottom>
          {title}
        </Typography>
        <Button sx={{ color: 'black' }} size='medium' href='/about'>
          About
        </Button>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
