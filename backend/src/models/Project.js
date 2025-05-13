import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Project name is required.'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters.'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Project description cannot exceed 500 characters.'],
  },
  // Flexible field to store progress for different authority systems
  // Example: { "leadflow-builder": { currentStep: 2, answers: [...] }, "newsletter-architect": { ... } }
  authoritySystemsProgress: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Allows storing arbitrary objects for each system's progress
    default: {},
  },
  // You might want to add more specific fields later, e.g.,
  // lastAccessedSystem: String,
  // overallProgress: Number, // Calculated field
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Index for user and project name to ensure a user doesn't have duplicate project names (optional)
// projectSchema.index({ user: 1, name: 1 }, { unique: true }); 
// Consider if project names must be unique per user or globally, or not at all.
// For now, allowing duplicate names per user for simplicity.

// Index for faster querying by user
projectSchema.index({ user: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
