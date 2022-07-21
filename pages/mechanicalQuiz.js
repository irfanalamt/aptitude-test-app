import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { mechanicalQuestions } from '../utils/sampleData';
import QuizCard from '../components/QuizCard';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

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

  return (
    <>
      <Chip
        sx={{ margin: 2, fontSize: '1rem' }}
        label={`${session.user.name} 🟢`}
      />

      <Box sx={{ marginTop: 1, marginX: 'auto' }} maxWidth='sm'>
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
          <Typography color='green' variant='h6'>
            QUIZ DONE!
          </Typography>
        ) : (
          <Container id='image' sx={{ paddingY: 1, marginX: 'auto' }}>
            {step === 1 && (
              <Box
                sx={{
                  height: '100vh',
                  marginBottom: 1,
                  justifyContent: 'center',
                  marginX: 'auto',
                  textAlign: 'center',
                }}
                maxWidth='sm'
              >
                <Paper sx={{ marginTop: 5 }}>
                  <Image
                    src={`/images/MR/${currentQuestion.image}`}
                    objectPosition='center'
                    layout='responsive'
                    height='300'
                    width='500'
                  ></Image>
                </Paper>
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
                  height: '80vh',
                  marginX: 'auto',
                  justifyContent: 'center',
                  alignItems: 'start',
                  marginBottom: 5,
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
      </Box>
    </>
  );
};

export default MechanicalQuiz;
