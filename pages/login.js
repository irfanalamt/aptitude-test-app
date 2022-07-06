import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Paper,
  Link,
  Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        alert(result.error);
      }
    } catch (err) {
      alert(getError(err));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Image
        style={{ opacity: '0.5', zIndex: -1 }}
        src='/images/back-pattern.jpg'
        alt=''
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
      <Paper
        sx={{ padding: '15px', paddingX: '15px', marginTop: '30px' }}
        elevation={3}
      >
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography variant='h4' component='div'>
            DAT login
          </Typography>
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              paddingRight: '8px',
            }}
          >
            <LoginIcon />
          </Avatar>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: {
                      value: 3,
                      message: 'password length should be greater than 3',
                    },
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: '#00897A' }}
            >
              Login
            </Button>
          </Box>
          <Grid container justifyContent='flex-end'>
            <Button variant='text' size='small' href='/register'>
              New user? Register
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
