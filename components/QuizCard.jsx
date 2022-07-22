import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

const QuizCard = (props) => {
  const { question = {}, questionNumber, submitAnswer, resetView } = props;
  const [value, setValue] = useState(null);

  const handleChangeRadio = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    resetView();
    console.log(value);
    submitAnswer(value);
    setValue(null);
  };

  return (
    <Box
      sx={{
        minWidth: 275,
        marginY: 2,
        marginX: 'auto',
        boxShadow: 2,
      }}
    >
      <Card sx={{ backgroundColor: '#ffebee' }} variant='outlined'>
        <CardContent>
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
            Question {questionNumber}
          </Typography>

          <Typography
            variant='body1'
            sx={{ marginY: 1.5, fontWeight: 410, fontSize: '1.2rem' }}
          >
            {question.title}
          </Typography>

          <FormControl>
            <RadioGroup
              name='radio-group-quiz'
              value={value}
              onChange={handleChangeRadio}
            >
              {question.options.map((o, i) => {
                return (
                  <FormControlLabel
                    sx={{ fontSize: '1rem' }}
                    key={i + 1}
                    value={i + 1}
                    control={<Radio />}
                    label={o.description}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            disabled={!value}
            onClick={handleSubmit}
            fullWidth
            variant='contained'
            size='small'
            color='success'
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default QuizCard;
