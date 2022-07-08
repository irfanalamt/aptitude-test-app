import Score from '../../models/Score';
import db from '../../utils/db';
import { questions } from '../../utils/sampleData';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { email, answers } = req.body;
  const marksScored = questions.filter((q, i) => {
    return q.correctAnswer === parseInt(answers[i]);
  }).length;

  await db.connect();
  const existingScore = await Score.findOne({ email: email });
  if (existingScore) {
    res.status(422).json({ message: 'Score exists already!' });
    await db.disconnect();
    return;
  }
  const newScore = new Score({
    email,
    answers,
    score: marksScored,
  });

  const score = await newScore.save();

  await db.disconnect();

  console.log(req.body);
  res.status(201).send({
    message: 'Score saved!',
    marksScored,
  });
  return;
}

export default handler;
