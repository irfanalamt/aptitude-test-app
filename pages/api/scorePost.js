import Score from '../../models/Score';
import db from '../../utils/db';
import { questions } from '../../utils/sampleData';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, answers, questionType, marksScored } = req.body;

  const existingScore = await Score.findOne({ email: email });
  if (existingScore) {
    existingScore.score.set(questionType, marksScored);
    const updateScoreSaved = await existingScore.save();
    await db.disconnect();
    res.status(201).send({
      message: 'Score updated!',
      marksScored,
    });
    return;
  }

  const newScore = new Score({
    email,
    answers,
    score: {},
  });
  newScore.score.set(questionType, marksScored);

  const scoreSaved = await newScore.save();

  await db.disconnect();

  console.log(req.body);
  res.status(201).send({
    message: 'Score saved!',
    marksScored,
  });
  return;
}
export default handler;
