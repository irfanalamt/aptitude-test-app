import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from 'next/head';
import Image from 'next/image';

const Register = () => {
  const [district, setDistrict] = useState('');
  const [grade, setGrade] = useState('');

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  return (
    <>
      <Head>
        <title>DAT registration</title>
      </Head>
      <Container sx={{ marginTop: 3 }}>
        <Image
          style={{ opacity: '0.3', zIndex: -1 }}
          src='/images/back-pattern.jpg'
          alt=''
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
        <Button href='/'>
          <ArrowBackIcon />
          <HomeIcon />
        </Button>
        <Paper sx={{ maxWidth: 300, paddingX: 1 }}>
          <Typography sx={{ marginY: 1 }} variant='h4' component='div'>
            DAT registration
          </Typography>
        </Paper>
        <Grid sx={{ marginY: 2, marginX: 'auto' }} container>
          <Paper
            sx={{ paddingX: 3, paddingY: 5, minWidth: '50vw' }}
            elevation={2}
          >
            <form>
              <Grid md={7} sm={12} my={1} item>
                <TextField
                  label='Name of student'
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid mt={1} container spacing={1}>
                <Grid item md={3} sm={6} xs={12}>
                  <TextField label='Email' variant='outlined' fullWidth />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextField
                    label='Confirm Email'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Box width='100%' />
                <Grid mt={1} item md={5} xs={8}>
                  <TextField label='Date of birth' variant='outlined' />
                </Grid>
                <Grid mt={2} mx={2} sm={12} md={5} item>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Gender
                  </FormLabel>
                  <RadioGroup row name='gender-radio-buttons-group'>
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </Grid>
                <Grid xs={10} md={8} sx={{ mt: 1 }} item>
                  <TextField
                    label='Phone'
                    variant='outlined'
                    helperText='(as 8096663001 or 0091-8096663001)'
                  ></TextField>
                </Grid>
                <Grid container>
                  <Grid md={5} xs={8} sx={{ mt: 1, mx: 1 }} item>
                    <InputLabel id='district-select-label'>District</InputLabel>
                    <Select
                      sx={{ minWidth: '20ch' }}
                      labelId='district-select-label'
                      id='district-select'
                      value={district}
                      label='District'
                      onChange={handleDistrictChange}
                    >
                      <MenuItem value={'Alappuzha'}>Alappuzha</MenuItem>
                      <MenuItem value={'Ernakulam'}>Ernakulam</MenuItem>
                      <MenuItem value={'Idukki'}>Idukki</MenuItem>
                      <MenuItem value={'Kannur'}>Kannur</MenuItem>
                      <MenuItem value={'Kasaragod'}>Kasaragod</MenuItem>
                      <MenuItem value={'Kollam'}>Kollam</MenuItem>
                      <MenuItem value={'Kottayam'}>Kottayam</MenuItem>
                      <MenuItem value={'Kozhikode'}>Kozhikode</MenuItem>
                      <MenuItem value={'Malappuram'}>Malappuram</MenuItem>
                      <MenuItem value={'Wayanad'}>Palakkad</MenuItem>
                      <MenuItem value={'Pathanamthitta'}>
                        Pathanamthitta
                      </MenuItem>
                      <MenuItem value={'Thiruvananthapuram'}>
                        Thiruvananthapuram
                      </MenuItem>
                      <MenuItem value={'Thrissur'}>Thrissur</MenuItem>
                      <MenuItem value={'Wayanad'}>Wayanad</MenuItem>
                    </Select>
                  </Grid>
                  <Grid md={5} xs={8} mt={1} ml={1} item>
                    <InputLabel id='grade-select-label'>Grade</InputLabel>
                    <Select
                      sx={{ minWidth: '20ch' }}
                      labelId='grade-select-label'
                      id='grade-select'
                      value={grade}
                      label='Grade'
                      onChange={handleGradeChange}
                    >
                      <MenuItem value={9}>9th</MenuItem>
                      <MenuItem value={10}>10th</MenuItem>
                      <MenuItem value={11}>11th</MenuItem>
                      <MenuItem value={12}>12th</MenuItem>
                      <MenuItem value={99}>12th+</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
