import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  title: {
    type: String,
    required: [true, 'Document title is required.'],
    trim: true,
    maxlength: [150, 'Document title cannot exceed 150 characters.'],
  },
  // Content can be stored directly for smaller documents,
  // or you might store a reference/URL if using a separate file storage service (e.g., S3)
  content: {
    type: String, // Could be HTML, Markdown, or plain text. Consider JSON for structured data.
    required: true,
  },
  format: {
    type: String,
    enum: ['text', 'markdown', 'html', 'pdf_link', 'docx_link'], // Example formats
    default: 'text',
  },
  authoritySystemOrigin: { // Optional: to track which system generated this document
    type: String,
    trim: true,
  },
  version: { // Optional: for document versioning
    type: Number,
    default: 1,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Indexes for efficient querying
documentSchema.index({ user: 1 });
documentSchema.index({ project: 1 });
documentSchema.index({ user: 1, project: 1 }); // Compound index for user's documents within a project

const Document = mongoose.model('Document', documentSchema);

export default Document;
