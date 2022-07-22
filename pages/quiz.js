import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material';
import QuizCard from '../components/QuizCard';
import { questions } from '../utils/sampleData';
import axios from 'axios';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PublishIcon from '@mui/icons-material/Publish';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LabelIcon from '@mui/icons-material/Label';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const finishedQuiz = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push('/');
    },
  });

  if (status === 'loading') {
    return (
      <Typography sx={{ margin: 3 }} variant='h4'>
        Loading or not authenticated...
      </Typography>
    );
  }

  const goToNext = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
  };

  const submitAnswer = (value) => {
    setAnswers((prevState) => [...prevState, value]);
    goToNext();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const submitAnswersToDB = () => {
    const marksScored = questions.filter((q, i) => {
      return q.correctAnswer === parseInt(answers[i]);
    }).length;

    axios
      .post('/api/scorePost', {
        email: session.user.email,
        answers,
        questionType: 'gk',
        marksScored,
      })
      .then(function (response) {
        console.log(response);
        toast.success(
          `Answers submitted. SCORE=${response.data.marksScored} `,
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setTimeout(() => {
          toast.info(`Redirecting to HOME..`, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 2500);
        setTimeout(() => {
          router.push('/');
        }, 5000);
      })
      .catch(function (error) {
        toast.error(`Already submitted!`, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          toast.info(`Redirecting to HOME..`, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 2500);
        setTimeout(() => {
          router.push('/');
        }, 5000);
      });
  };

  return (
    <Box>
      <Image
        style={{ opacity: '0.4', zIndex: -1 }}
        src='/images/back-yellow.jpg'
        alt=''
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
      <Chip
        sx={{ margin: 2, fontSize: '1rem' }}
        label={`${session.user.name} 🟢`}
      />

      <Container maxWidth='sm'>
        <Typography
          sx={{
            boxShadow: 1,
            paddingY: 1,
            textAlign: 'center',
            backgroundColor: '#e1f5fe',
          }}
          variant='h4'
        >
          General knowledge
        </Typography>
        {finishedQuiz ? (
          <Paper
            sx={{
              textAlign: 'center',
              marginTop: 1,
              paddingY: 2,
              backgroundColor: '#e0f7fa',
            }}
          >
            <Typography variant='h5'>
              QUIZ COMPLETED
              <AssignmentTurnedInIcon
                sx={{
                  fontSize: '1rem',
                  marginTop: 2,
                  marginLeft: 1,
                  color: 'green',
                }}
              />
            </Typography>

            <Button
              sx={{ marginY: 1, marginTop: 1 }}
              variant='outlined'
              onClick={() => restartQuiz()}
            >
              Restart
              <RestartAltIcon />
            </Button>
            <Container
              maxWidth='xs'
              sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}
            >
              <Typography fontSize='1rem' variant='subtitle1'>
                Options selected:
              </Typography>

              {answers.map((element, i) => {
                return (
                  <Typography
                    sx={{ paddingX: 1, marginX: 1, fontWeight: 'bold' }}
                    variant='subtitle1'
                    key={i}
                  >
                    {element}
                    <LabelIcon sx={{ color: '#37474f' }} />
                  </Typography>
                );
              })}
            </Container>
            <Button
              onClick={() => submitAnswersToDB()}
              variant='contained'
              sx={{ marginX: 'auto', marginTop: 2 }}
              color='secondary'
            >
              Submit answers
              <PublishIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Paper>
        ) : (
          <QuizCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            submitAnswer={submitAnswer}
            resetView={() => {}}
          />
        )}
      </Container>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Quiz;
