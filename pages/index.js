import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import * as React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSession, signIn, signOut } from 'next-auth/react';

const Index = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar />
      <Box sx={{ marginY: 1 }}>
        {session && (
          <Typography variant='h6' component='div'>
            Welcome {session.user.name}
          </Typography>
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
                  <Typography variant='body1' component='div'>
                    This exam assesses your ability to solve real-world problems
                    by using, interpreting, and communicating mathematical
                    information. These include the ability to understand basic
                    math like addition, subtraction, division and
                    multiplication.
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
                  <Typography variant='body1' component='div'>
                    This exam assesses your capacity to logically respond to a
                    verbally presented question. The student studies the
                    information or problem provided, processes it, develops a
                    theory, and assesses the solution to the problem.
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
                  <Typography variant='body1' component='div'>
                    This exam assesses your capacity for understanding and
                    reasoning about complicated ideas that, despite being true,
                    are unrelated to specific events, things, people, or
                    circumstances. Thinking about concepts that are frequently
                    symbolic or speculative is required for this style of
                    reasoning.
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
                    Mechanical Reasoning (AR)
                  </Typography>
                  <Typography variant='body1' component='div'>
                    This exam assesses your mechanical and technical knowledge.
                    The test requires the application of mechanical principles
                    and concepts in order to solve problems.
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
                  <Typography sx={{ marginY: 1 }} variant='h6' component='div'>
                    Perpetual Speed & Accuracy (PSA)
                  </Typography>
                  <Typography variant='body1' component='div'>
                    This exam assesses your ability to focus attention and
                    quickly process information. This test includes word/image
                    pairs as well as simple mathematical equations or number
                    sequences.
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
                  <Typography variant='body1' component='div'>
                    This exam assesses your ability to think about objects in
                    two and three dimensions, visualise their movement, and
                    deduce patterns between them. This ability, also known as
                    spatial awareness, frequently focuses on image rotation or
                    image sequences.
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
