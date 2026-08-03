const certificateSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  college: String,
  location: String,
  course: String,
  duration: String,
  mentor: String,
  uniqueId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});
