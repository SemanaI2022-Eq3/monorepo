import mongoose from 'mongoose';
import { mongodbUri } from '../../config';

const connect = () => mongoose.connect(mongodbUri);

export { connect };
