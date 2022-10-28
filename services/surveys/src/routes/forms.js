import express from 'express';
import { authRequired } from '../middleware/auth-required';
import Teacher from '../models/teacherSchema';
import Class from '../models/classSchema';
import ClassGrade from '../models/classGrade';
// eslint-disable-next-line no-unused-vars
import dbconn from '../models/dbconn';

const forms = express();

// Funcion para hacer una colleción rápida dummy para trabjar
forms.get('/forms/dummypopulate', authRequired, async (_req, res, next) => {
  try {
    const teachersToAdd = ['Luis', 'María', 'Sara', 'Pedro'];
    const teachDpto = ['Mate', 'Español', 'Historia', 'Quimica'];
    const teachesClass = [
      'Mate 1',
      'Quimica Organica',
      'Historia y el ambiente Global',
      'Análisis y Expresión Verbal',
    ];

    for (let i = 0; i < teachersToAdd.length; i += 1) {
      const teacher = new Teacher({
        name: teachersToAdd[i],
        department: teachDpto[i],
      });
      // eslint-disable-next-line no-await-in-loop
      const teach = await teacher.save();
      // eslint-disable-next-line no-underscore-dangle
      const classes = new Class({ name: teachesClass[i], teacher: teach._id });
      // eslint-disable-next-line no-await-in-loop
      await classes.save();
    }

    res.status(200).json({
      msg: 'ok',
    });
  } catch (error) {
    next(error);
  }
});

forms.post('/forms', authRequired, async (req, res, next) => {
  try {
    const formsRes = {
      class: req.body.materia,
      clarity: req.body.claridad,
      helpOffered: req.body.ayuda,
      classDifficulty: req.body.facilidad,
      comments: req.body.Comments,
      finalGrade: req.body.Calificacionpromedio,
    };

    const teacherName = `${req.body.firstName} ${req.body.lastName}`;
    const teacherFound = await Teacher.findOne({ name: teacherName });
    if (teacherFound == null) {
      const teachesClass = ['Mate', 'Español', 'Historia', 'Quimica'];
      const x = Math.floor(Math.random() * teachesClass); // Asigna una materia al azar
      const selectedClass = teachesClass[x];

      const teacher = new Teacher({
        name: teacherName,
        department: selectedClass,
      });
      // eslint-disable-next-line no-await-in-loop
      const teach = await teacher.save();
      // eslint-disable-next-line no-underscore-dangle
      const classes = new Class({
        name: req.body.materia,
        // eslint-disable-next-line no-underscore-dangle
        teacher: teach._id,
      });
      // eslint-disable-next-line no-await-in-loop
      await classes.save();
    }
    let classes = await Class.findOne({ name: req.body.materia });
    if (classes == null) {
      // eslint-disable-next-line no-underscore-dangle
      const newClass = new Class({
        name: req.body.materia,
        // eslint-disable-next-line no-underscore-dangle
        teacher: teacherFound._id,
      });
      classes = await newClass.save();
    }
    // eslint-disable-next-line no-underscore-dangle
    formsRes.class = classes._id;
    const classGrade = new ClassGrade(formsRes);
    await classGrade.save();

    res.status(200).json({
      msg: 'ok',
    });
  } catch (error) {
    next(error);
  }
});
export default forms;
