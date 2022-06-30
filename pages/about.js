import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';

const About = () => {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', marginY: 20 }}>
      <Paper elevation={2} sx={{ padding: 4 }}>
        <InfoIcon sx={{ fontSize: 50 }} />
        <Typography variant='h2' gutterBottom component='div'>
          About
        </Typography>
        <Typography variant='body1' gutterBottom>
          {`DAT are a set of tests designed to assess one's abilities in a variety
          of areas, including verbal reasoning, numerical reasoning, mechanical
          reasoning, and spatial relations.`}
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
