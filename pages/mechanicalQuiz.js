import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { mechanicalQuestions } from '../utils/sampleData';
import QuizCard from '../components/QuizCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PublishIcon from '@mui/icons-material/Publish';

const MechanicalQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(1);
  const finishedQuiz = currentQuestionIndex === mechanicalQuestions.length;
  const currentQuestion = mechanicalQuestions[currentQuestionIndex];

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

  const resetView = () => {
    setStep(1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const submitAnswersToDB = () => {
    let marksScored = mechanicalQuestions.filter((q, i) => {
      return q.correctAnswer === parseInt(answers[i]);
    }).length;

    axios
      .post('/api/scorePost', {
        email: session.user.email,
        answers,
        questionType: 'mr',
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
    <>
      <Chip
        sx={{ margin: 2, fontSize: '1rem' }}
        label={`${session.user.name} 🟢`}
      />

      <Box
        sx={{ height: '100vh', marginTop: 1, marginX: 'auto', paddingY: 2 }}
        maxWidth='sm'
      >
        <Typography
          sx={{
            textAlign: 'center',
            boxShadow: 1,
            maxWidth: 330,
            marginX: 'auto',
            backgroundColor: '#e8eaf6',
            paddingY: 1,
            marginBottom: 2,
          }}
          variant='h5'
        >
          Mechanical Reasoning (MR)
        </Typography>
        {finishedQuiz ? (
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ marginX: 'auto' }} color='green' variant='h5'>
              QUIZ DONE!
            </Typography>
            <Button
              onClick={() => submitAnswersToDB()}
              variant='contained'
              sx={{ marginX: 'auto', marginTop: 2 }}
              color='secondary'
            >
              Submit answers
              <PublishIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Container>
        ) : (
          <Container id='image' sx={{ paddingY: 1, marginX: 'auto' }}>
            {step === 1 && (
              <Box
                sx={{
                  marginBottom: 1,
                  justifyContent: 'center',
                  marginX: 'auto',
                  textAlign: 'center',
                }}
                maxWidth='xs'
              >
                <Typography
                  sx={{
                    boxShadow: 1,
                    maxWidth: 150,
                    textAlign: 'center',
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                  }}
                  variant='h5'
                  component='div'
                >
                  Question {currentQuestionIndex + 1}
                </Typography>
                <Paper sx={{ marginTop: 2, maxWidth: 'xs', minHeight: '400' }}>
                  <Image
                    src={`/images/MR/${currentQuestion.image}`}
                    objectPosition='center'
                    layout='responsive'
                    height='400'
                    width='600'
                  ></Image>
                </Paper>
                <Typography
                  sx={{
                    marginTop: 1,
                    boxShadow: 1,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    paddingX: 1,
                  }}
                  variant='h6'
                  component='div'
                >
                  {currentQuestion.title}
                </Typography>
                <Button
                  color='info'
                  sx={{ marginX: 'auto', marginTop: 2 }}
                  variant='contained'
                  onClick={() => setStep(2)}
                >
                  <KeyboardDoubleArrowDownIcon />
                </Button>
              </Box>
            )}
            {step === 2 && (
              <Box
                id='quiz'
                sx={{
                  marginX: 'auto',
                  justifyContent: 'center',
                  alignItems: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Button
                  color='info'
                  sx={{
                    marginX: 'auto',
                    marginBottom: 2,
                    textAlign: 'center',
                    marginTop: 2,
                  }}
                  variant='contained'
                  onClick={() => setStep(1)}
                >
                  <KeyboardDoubleArrowUpIcon />
                </Button>
                <QuizCard
                  question={currentQuestion}
                  questionNumber={currentQuestionIndex + 1}
                  submitAnswer={submitAnswer}
                  resetView={resetView}
                />
              </Box>
            )}
          </Container>
        )}
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
    </>
  );
};

export default MechanicalQuiz;
