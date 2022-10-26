import express from 'express';
// eslint-disable-next-line no-unused-vars
import dbconn from '../models/dbconn';
import { authRequired } from '../middleware/auth-required';
import Teacher from '../models/teacherSchema'
import Class from '../models/classSchema'

import ClassGrade from '../models/classGrade'

const forms = express();

// console.log(dbconn);


/*
forms.use('/forms', authRequired,  (_req, res) => {
    res.status(200).json({
        pong: new Date().getTime(),
    });
});
*/

// Funcion para hacer una colleción rápida dummy para trabjar
forms.get('/forms/dummypopulate',authRequired, async (_req, res) => {
    console.log(_req.body);
    try{

        const teachersToAdd = ['Luis', 'María', 'Sara', 'Pedro']
        const teachDpto = ['Mate', 'Español', 'Historia', 'Quimica']
        const teachesClass = ['Mate 1', 'Quimica Organica', 'Historia y el ambiente Global', 'Análisis y Expresión Verbal']
        for(let i = 0; i < teachersToAdd.length; i += 1){
            const teacher = new Teacher({name : teachersToAdd[i], department:teachDpto[i]});
            // eslint-disable-next-line no-await-in-loop
            const teach = await teacher.save();
            // eslint-disable-next-line no-underscore-dangle
            const classes = new Class({name:teachesClass[i],teacher:teach._id})
            // eslint-disable-next-line no-await-in-loop
            await classes.save();

        }
        
        
        
        

        res.status(200).json({
            msg : "ok"
        });
        }catch(error){
            console.log(error.message);
            res.json(error.message)
        }
    }
);
forms.post('/forms',authRequired, async (_req, res) => {
    console.log(_req.body);
    try{
        const formsRes = _req.body;
        const classess = await Class.findOne({name : _req.body.class});
        // eslint-disable-next-line no-underscore-dangle
        formsRes.class = classess._id
        
        console.log(formsRes);
        const classgrade = new ClassGrade(formsRes);
        const classg = await classgrade.save();
        console.log(classg);

        res.status(200).json({
            msg : "ok"
        });
        }catch(error){
            console.log(error.message);
            res.json(error.message)
        }
        
});
export default forms;
