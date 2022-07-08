import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Container, Typography } from '@mui/material';
import QuizCard from '../components/QuizCard';
import { questions } from '../utils/sampleData';
import axios from 'axios';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    axios
      .post('/api/score', {
        email: session.user.email,
        answers,
      })
      .then(function (response) {
        console.log(response);
        toast.success(`Answers submitted. SCORE=${response.data.marksScored}`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      });
  };

  return (
    <Box>
      <Chip
        sx={{ margin: 2, fontSize: '1rem' }}
        label={`${session.user.name}🟢`}
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
          TEST 1
        </Typography>
        {finishedQuiz ? (
          <Box sx={{ textAlign: 'center', marginTop: 1 }}>
            <Typography variant='h5'> QUIZ DONE ✅</Typography>
            <Button
              sx={{ marginY: 1 }}
              variant='contained'
              onClick={() => restartQuiz()}
            >
              Restart
              <RestartAltIcon />
            </Button>
            <Container
              maxWidth='xs'
              sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}
            >
              <Typography variant='h6'>Options selected:</Typography>
              {answers.map((element, i) => {
                return (
                  <Typography
                    sx={{ paddingX: 1, marginX: 1, fontWeight: 'bold' }}
                    variant='subtitle1'
                  >
                    {element}🌫️
                  </Typography>
                );
              })}
            </Container>
            <Button
              onClick={() => submitAnswersToDB()}
              variant='contained'
              sx={{ marginX: 'auto' }}
              color='secondary'
            >
              Submit answers
            </Button>
          </Box>
        ) : (
          <QuizCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            submitAnswer={submitAnswer}
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
