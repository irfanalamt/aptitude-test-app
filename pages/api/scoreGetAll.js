import Score from '../../models/Score';
import db from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  try {
    await db.connect();
    const scores = await Score.find({}, 'email score');
    await db.disconnect();
    res.send(scores);
  } catch (error) {
    res.send('Get score error!');
  }
}
