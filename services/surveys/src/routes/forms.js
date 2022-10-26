import express from 'express';
import mongoose from 'mongoose';
// import { authRequired } from '../middleware/auth-required';
import Teacher from '../models/teacherSchema'
import Class from '../models/classSchema'
import {mongodbUri} from '../config'

// import ClassGrade from '../models/classGrade'

const forms = express();



mongoose.connect(
    mongodbUri, 
    {useNewUrlParser: true, useUnifiedTopology:true}
    ).then(console.log("\n--------------\nDB ONLINE\n-------------"))
/*
forms.use('/forms', authRequired,  (_req, res) => {
    res.status(200).json({
        pong: new Date().getTime(),
    });
});
*/

forms.post('/forms', async (_req, res) => {
    console.log(_req.body);
    try{
        const teacher = new Teacher({name : 'luis'});
    const teach = await teacher.save();
    // eslint-disable-next-line no-underscore-dangle
    const classes = new Class({name:'mates',teacher:teach._id})
    const classs = await classes.save();
    console.log(classs);

    res.status(200).json({
        msg : "ok"
    });
    }catch(error){
        console.log(error.message);
        res.json(error.message)
    }
    
});
export default forms;
