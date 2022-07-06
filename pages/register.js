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
  FormHelperText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [district, setDistrict] = useState('');
  const [grade, setGrade] = useState('');

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, dob, gender, phone, district, grade }) => {
    axios
      .post(`/api/register`, {
        name,
        email,
        dob,
        gender,
        phone,
        district,
        grade,
      })
      .then(function (response) {
        toast.success('Register success!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(function (error) {
        toast.error('POST error!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid md={7} sm={12} my={1} item>
                <TextField
                  label='Name of student'
                  name='name'
                  variant='outlined'
                  fullWidth
                  {...register('name', {
                    required: 'Please enter full name',
                    minLength: {
                      value: 3,
                      message: 'Name length should be greater than 3',
                    },
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
              </Grid>
              <Grid container spacing={1}>
                <Grid item md={5} sm={6} xs={12}>
                  <TextField
                    sx={{ marginTop: 1 }}
                    label='Email'
                    name='email'
                    variant='outlined'
                    fullWidth
                    {...register('email', {
                      required: 'Please enter email',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: 'Please enter valid email',
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
                <Grid item md={5} sm={6} xs={12}>
                  <TextField
                    sx={{ marginTop: 1 }}
                    label='Confirm Email'
                    name='confirmemail'
                    variant='outlined'
                    fullWidth
                    {...register('confirmemail', {
                      required: 'Please confirm email',
                      validate: (value) => value === getValues('email'),
                    })}
                  />
                  {errors.confirmemail &&
                    errors.confirmemail.type === 'validate' && (
                      <Typography
                        sx={{ marginLeft: 1 }}
                        variant='caption'
                        color='red'
                      >
                        Emails dont match!
                      </Typography>
                    )}
                </Grid>
                <Box width='100%' />
              </Grid>
              <Grid mt={1} item md={5} xs={8}>
                <TextField
                  sx={{ marginTop: 1 }}
                  label='Date of birth'
                  name='dob'
                  variant='outlined'
                  {...register('dob', {
                    required: 'Please enter date of birth',
                    minLength: {
                      value: 3,
                      message: 'Name length should be greater than 3',
                    },
                  })}
                  error={!!errors?.dob}
                  helperText={
                    errors?.dob ? errors.dob.message : 'as DD/MM/YYYY '
                  }
                />
              </Grid>
              <Grid mt={2} mx={2} sm={12} md={6} item>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name='gender-radio-buttons-group'
                  {...register('gender', {
                    required: 'Please enter gender',
                  })}
                >
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
                  sx={{ marginTop: 1 }}
                  label='Phone'
                  variant='outlined'
                  {...register('phone', {
                    required: 'Please enter phone number',
                    minLength: {
                      value: 9,
                      message: 'Name length should be greater than 9',
                    },
                  })}
                  error={!!errors?.phone}
                  helperText={
                    errors?.phone
                      ? errors.phone.message
                      : '(as 8096663001 or 0091-8096663001)'
                  }
                ></TextField>
              </Grid>
              <Grid container>
                <Grid md={4} xs={8} sx={{ mt: 1, mx: 1 }} item>
                  <InputLabel id='district-select-label'>District</InputLabel>
                  <Select
                    sx={{ minWidth: '20ch' }}
                    labelId='district-select-label'
                    id='district-select'
                    value={district}
                    label='District'
                    {...register('district', {
                      required: 'Please enter district',
                      onChange: (e) => setDistrict(e.target.value),
                    })}
                    error={!!errors.district}
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
                    <MenuItem value={'Pathanamthitta'}>Pathanamthitta</MenuItem>
                    <MenuItem value={'Thiruvananthapuram'}>
                      Thiruvananthapuram
                    </MenuItem>
                    <MenuItem value={'Thrissur'}>Thrissur</MenuItem>
                    <MenuItem value={'Wayanad'}>Wayanad</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors?.district ? 'Please enter district' : null}
                  </FormHelperText>
                </Grid>
                <Grid md={4} xs={8} mt={1} ml={1} item>
                  <InputLabel id='grade-select-label'>Grade</InputLabel>
                  <Select
                    sx={{ minWidth: '20ch' }}
                    labelId='grade-select-label'
                    id='grade-select'
                    value={grade}
                    label='Grade'
                    {...register('grade', {
                      required: 'Please enter grade',
                      onChange: (e) => setGrade(e.target.value),
                    })}
                    error={!!errors.grade}
                  >
                    <MenuItem value={9}>9th</MenuItem>
                    <MenuItem value={10}>10th</MenuItem>
                    <MenuItem value={11}>11th</MenuItem>
                    <MenuItem value={12}>12th</MenuItem>
                    <MenuItem value={99}>12th+</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors?.grade ? 'Please enter grade' : null}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, backgroundColor: '#00897A' }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Grid>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Register;
