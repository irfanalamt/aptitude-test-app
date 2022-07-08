import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    answers: { type: Array, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);

export default Score;
