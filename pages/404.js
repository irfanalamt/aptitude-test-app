import Head from 'next/head';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 ERROR</title>
      </Head>
      <Container sx={{ textAlign: 'center', paddingTop: 20 }}>
        <ErrorIcon sx={{ fontSize: 50, color: 'red' }} />
        <Typography variant='h1' component='div'>
          OOPS!
        </Typography>
        <Typography variant='subtitle1' gutterBottom component='div'>
          {`We can't seem to find the page you are looking for.`}
        </Typography>
        <Typography variant='body2' gutterBottom>
          Error code: 404
        </Typography>
      </Container>
    </>
  );
};

export default Custom404;
