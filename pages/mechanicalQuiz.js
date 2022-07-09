import { Box, Chip, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { mechanicalQuestions } from '../utils/sampleData';
import QuizCard from '../components/QuizCard';

const MechanicalQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
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
          <Container sx={{ paddingY: 1 }}>
            <Box sx={{ height: 300, width: 600, padding: 2, marginBottom: 1 }}>
              <Image
                src={`/images/MR/${currentQuestion.image}`}
                objectPosition='center'
                layout='fixed'
                height='300'
                width='500'
              ></Image>
            </Box>
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              submitAnswer={submitAnswer}
            />
          </Container>
        )}
      </Box>
    </>
  );
};

export default MechanicalQuiz;
