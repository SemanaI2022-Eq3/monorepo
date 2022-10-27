const mongoose = require('mongoose');

const classGradeSchema = new mongoose.Schema({
  class: {
    type: mongoose.ObjectId,
    ref: 'Class',
    required: false,
  },
  clarity: {
    type: Number,
    // required: true
  },
  helpOffered: {
    type: Number,
    // required: true
  },
  classDifficulty: {
    type: Number,
    // required: true
  },
  formTags: {
    type: Array,
    // required : true
  },
  comments: {
    type: String,
    // required : true
  },
  doRecommend: {
    type: Boolean,
    // require: true
  },
  obligatoryLectureAssitance: {
    type: Boolean,
    // required : true
  },
  finalGrade: {
    type: Number,
    // required: false
  },
});

module.exports = mongoose.model('ClassGrade', classGradeSchema);
