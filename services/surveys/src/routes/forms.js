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

forms.post('/teacher', authRequired, async (_req, res, next) => {
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

forms.get('/teacher/:teacherId', async (_req, res, next) => {
  try {
    const teachers = await Teacher.findById(_req.params.teacherId);
    if (teachers != null) {
      // eslint-disable-next-line no-underscore-dangle
      const classes = await Class.find({ teacher: teachers._id }).populate(
        'teacher'
      );
      console.log(classes);
      let grades = [];
      if (classes != null) {
        for (let i = 0; i < classes.length; i += 1) {
          // eslint-disable-next-line no-underscore-dangle, no-await-in-loop
          const foundgrades = await ClassGrade.find({
            class: classes[i]._id,
          }).populate('class', 'name');

          grades = grades.concat(foundgrades);
        }
      }
      res.status(200).json({
        grades: grades,
      });
    } else {
      res.json({ msg: 'Teacher not found' });
    }
  } catch (error) {
    next(error);
  }
});

forms.get('/teachers', async (_req, res, next) => {
  try {
    const teachers = await Teacher.find({});

    res.status(200).json({
      teachers: teachers,
    });
  } catch (error) {
    next(error);
  }
});

forms.post('/forms', async (_req, res, next) => {
  try {
    // const formsRes = _req.body;

    /*
    {"firstName":"asdas",
    "lastName":"dasda",
    "materia":"sdsad",
    "facilidad":75,
    "ayuda":100,
    "claridad":50,
    "Calificacionpromedio":70,
    "Comments":"asdasd"}
    */
    console.log(_req.body);
    const formsRes = {
      class: _req.body.materia,
      clarity: _req.body.claridad,
      helpOffered: _req.body.ayuda,
      classDifficulty: _req.body.facilidad,
      comments: _req.body.Comments,
      finalGrade: _req.body.Calificacionpromedio,
    };

    const teacherName = `${_req.body.firstName} ${_req.body.lastName}`;
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
        name: _req.body.materia,
        // eslint-disable-next-line no-underscore-dangle
        teacher: teach._id,
      });
      // eslint-disable-next-line no-await-in-loop
      await classes.save();
    }
    let classess = await Class.findOne({ name: _req.body.materia });
    if (classess == null) {
      // eslint-disable-next-line no-underscore-dangle
      const newClass = new Class({
        name: _req.body.materia,
        // eslint-disable-next-line no-underscore-dangle
        teacher: teacherFound._id,
      });
      classess = await newClass.save();
    }
    // eslint-disable-next-line no-underscore-dangle
    formsRes.class = classess._id;
    const classgrade = new ClassGrade(formsRes);
    await classgrade.save();

    res.status(200).json({
      msg: 'ok',
    });
  } catch (error) {
    next(error);
  }
});
export default forms;
