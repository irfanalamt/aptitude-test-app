import Student from '../../models/Student';
import User from '../../models/User';
import db from '../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, dob, gender, phone, district, grade } = req.body;

  await db.connect();
  const existingStudent = await Student.findOne({ email: email });
  if (existingStudent) {
    res.status(422).json({ message: 'Student exists already!' });
    await db.disconnect();
    return;
  }
  const newStudent = new Student({
    name,
    email,
    dob,
    gender,
    phone,
    district,
    grade,
  });
  const newUser = new User({ name, email, password: 12345 });

  const student = await newStudent.save();
  const user = await newUser.save();

  await db.disconnect();

  console.log(req.body);
  res.status(201).send({
    message: 'Created student!',
  });
  return;
}

export default handler;
