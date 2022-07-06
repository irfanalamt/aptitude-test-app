import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    grade: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;
