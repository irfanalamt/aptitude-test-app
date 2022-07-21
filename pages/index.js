import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { scoreContext } from '../utils/Context';

const Index = () => {
  const { data: session, status } = useSession();
  const { finalScore } = useContext(scoreContext);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginY: 2,
          boxShadow: 2,
          marginX: 4,
          padding: 1,
          borderRadius: 2,
          backgroundColor: '#fff3e0',
        }}
      >
        {session && (
          <Container maxWidth='md'>
            <Typography sx={{ margin: 2 }} variant='h6' component='div'>
              Welcome {session.user.name}
            </Typography>
            <Typography sx={{ margin: 2 }} variant='body1' component='div'>
              The test consists of 5 questions. At the end, there is an option
              to restart the quiz. Answers can be submitted only once. When you
              submit, you will be given your scores.
            </Typography>
            {!finalScore && (
              <>
                <Button href='/quiz' sx={{ margin: 2 }} variant='contained'>
                  Start GK
                  <PlayCircleFilledIcon sx={{ marginLeft: 1 }} />
                </Button>
                <Button
                  href='/mechanicalQuiz'
                  sx={{ margin: 2 }}
                  variant='contained'
                >
                  Start MR
                  <PlayCircleFilledIcon sx={{ marginLeft: 1 }} />
                </Button>
              </>
            )}

            {finalScore && (
              <Paper
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  maxWidth: 300,
                  backgroundColor: '#f9fbe7',
                  textAlign: 'center',
                  marginX: 'auto',
                  marginTop: 1,
                }}
                elevation={3}
                square
              >
                <Typography variant='h5'>
                  <CreditScoreIcon sx={{ marginRight: 1, color: 'green' }} />
                  TEST SCORE = {finalScore}/5
                </Typography>
              </Paper>
            )}
          </Container>
        )}
        {!session && (
          <Grid
            sx={{
              marginY: 2,
              marginX: 'auto',
              justifyContent: 'center',
              padding: 1,
            }}
            container
          >
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#e3f2fd',
                }}
              >
                <CardContent>
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Numerical Ability (NA)
                  </Typography>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your ability to solve real-world problems
                    by using, interpreting, and communicating mathematical
                    information.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#e8eaf6',
                }}
              >
                <CardContent>
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Verbal Reasoning (VR)
                  </Typography>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your capacity to logically respond to a
                    verbally presented question. This also includes how you
                    understand, reason, and engage with written and verbal
                    language.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#ede7f6',
                }}
              >
                <CardContent>
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Abstract Reasoning (AR)
                  </Typography>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your capacity for understanding and
                    reasoning about complicated ideas that, despite being true,
                    are unrelated to specific events, things, people, or
                    circumstances.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#f3e5f5',
                }}
              >
                <CardContent>
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Mechanical Reasoning (MR)
                  </Typography>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your mechanical and technical knowledge
                    and their applications.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#fce4ec',
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='h6'
                    component='div'
                  >
                    Perpetual Speed and Accuracy (PSA)
                  </Typography>
                  <Typography
                    sx={{ marginY: 1 }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your ability to focus attention and
                    quickly process information using word/image pairs as well
                    as simple mathematical equations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={3} sm={6} item>
              <Card
                sx={{
                  maxWidth: 300,
                  height: 300,
                  margin: 1,
                  backgroundColor: '#ffebee',
                }}
              >
                <CardContent>
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Spacial Relations (SR)
                  </Typography>
                  <Typography
                    sx={{ fontSize: '1rem' }}
                    variant='body1'
                    component='div'
                  >
                    This exam assesses your ability to think about objects in
                    two and three dimensions, visualise their movement, and
                    deduce patterns between them.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
      <Footer title='DAT 2.0' description='@irfanalamt' />
    </>
  );
};

export default Index;
