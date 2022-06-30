import User from '../../models/User';
import { users } from '../../utils/sampleData';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
