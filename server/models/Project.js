import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  todos: [todoSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
