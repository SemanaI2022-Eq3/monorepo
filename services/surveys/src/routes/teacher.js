import express from 'express';
import { authRequired } from '../middleware/auth-required';
import Teacher from '../models/teacherSchema';
import Class from '../models/classSchema';
import ClassGrade from '../models/classGrade';

const teachersR = express();

teachersR.post('/teacher', authRequired, async (_req, res, next) => {
  try {
    // const teachersToAdd = ['Luis', 'María', 'Sara', 'Pedro'];
    // const teachDpto = ['Mate', 'Español', 'Historia', 'Quimica'];
    const teachesClass = [
      'Mate 1',
      'Quimica Organica',
      'Historia y el ambiente Global',
      'Análisis y Expresión Verbal',
    ];
    const x = Math.round(Math.random() * teachesClass); // Asigna una materia al azar
    const selectedClass = teachesClass[x];

    const tname = `${_req.body.firstName} ${_req.body.lastName}`;
    const teacher = new Teacher({
      name: tname,
      department: selectedClass,
      institution: _req.body.School,
    });
    // eslint-disable-next-line no-await-in-loop
    const teach = await teacher.save();
    // eslint-disable-next-line no-underscore-dangle
    const classes = new Class({ name: selectedClass, teacher: teach._id });
    // eslint-disable-next-line no-await-in-loop
    await classes.save();

    res.status(200).json({
      msg: 'ok',
    });
  } catch (error) {
    next(error);
  }
});

teachersR.get('/teacher/:teacherId', authRequired, async (_req, res, next) => {
  try {
    const teachers = await Teacher.findById(_req.params.teacherId);
    if (teachers != null) {
      // eslint-disable-next-line no-underscore-dangle
      const classes = await Class.find({ teacher: teachers._id }).populate(
        'teacher'
      );

      let grades = [];
      if (classes != null) {
        for (let i = 0; i < classes.length; i += 1) {
          // eslint-disable-next-line no-underscore-dangle, no-await-in-loop
          const foundgrades = await ClassGrade.find({
            // eslint-disable-next-line no-underscore-dangle
            class: classes[i]._id,
          }).populate('class', 'name');

          grades = grades.concat(foundgrades);
        }
      }
      res.status(200).json({
        grades,
      });
    } else {
      res.json({ msg: 'Teacher not found' });
    }
  } catch (error) {
    next(error);
  }
});

teachersR.get('/teachers', authRequired, async (_req, res, next) => {
  try {
    const teachers = await Teacher.find({});

    res.status(200).json({
      teachers,
    });
  } catch (error) {
    next(error);
  }
});

export default teachersR;
