import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    answers: { type: Array, required: true },
    score: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);

export default Score;
