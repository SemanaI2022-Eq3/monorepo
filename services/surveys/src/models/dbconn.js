import mongoose from 'mongoose';
import { mongodbUri } from '../config';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
