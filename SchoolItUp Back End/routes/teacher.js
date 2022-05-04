const express = require('express')
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject');
const Meval = require('../models/Monthly_Eval');
const Announcement = require('../models/Announcement');
const Comment = require('../models/Comment');
const Task = require('../models/Task');
const Deposit = require('../models/Deposit');

const router = express.Router();

//CAN ONLY BE ACCESSED BY THE TEACHER
router.get('/', (req, res) => {
    res.send('TEACHER ROUTE');
})


/**********MONTHLY EVALUATIONS CRUD OPERATIONS BY TEACHER**********/

//ADD A NEW MONTHLY EVALUATION
router.post('/mevals/add', async (req, res) => {
    //console.log(req.body);
    const meval = new Meval({
        productivity: req.body.productivity,
        participation: req.body.participation,
        behavior: req.body.behavior,
        productivity_average: req.body.productivity_average,
        student_eval: req.body.student_eval,
        teacher: req.body.teacher,
        subject: req.body.subject

    });

    try {
        const savedMeval = await meval.save();
        res.json(meval);
        console.log("TEACHER : ADDED NEW MONTHLY EVALUATION");
    } catch (error) {
        res.json({ message: error });
    }
})


//LIST ALL MONTHLY EVALUATIONS MADE BY SAID TEACHER
router.get('/mevals/:teacherId', async (req, res) => {
    try {
        const mevals = await Meval.find({
            teacher: req.params.teacherId
        })
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived'])
            .populate('subject', ['_id', 'name', 'grade', 'archived']);
        res.json(mevals);
        console.log("TEACHER :  LISTING ALL OF SAID TEACHER'S MONTHLY EVALUATIONS");
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC TEACHER BY NAME
/* router.get('/teachers/:teacherName', async (req, res) => {
    try {
        const teachers = await Teacher.find({
            first_name: {
                $regex: '.*' + req.params.teacherName.toUpperCase() + '.*'
            }
        })
        res.json(teachers);
        console.log((i++) + ". FINDING SPECIFIC TEACHER");
    } catch (error) {
        res.json(error);
    }
}) */

//UPDATE MONTHLY EVALUATION AS TEACHER
router.patch('/mevals/update/:mevalId', async (req, res) => {
    try {
        const updatedMeval = await Meval.updateOne(
            { _id: req.params.mevalId },
            {
                $set: {
                    productivity: req.body.productivity,
                    participation: req.body.participation,
                    behavior: req.body.behavior,
                    productivity_average: req.body.productivity_average,
                    student_eval: req.body.student_eval,
                    teacher: req.body.teacher,
                    subject: req.body.subject
                }
            });
        res.json(updatedMeval);
        console.log("TEACHER : UPDATED MONTHLY EVALUATION");
    } catch (error) {
        res.json({ message: error });
    }
})



/**********NOTE **********/
/********** DON'T SUPPOSE IT'S NECESSARY TO DELETE, NOR ARCHIVE A MONTHLY EVALUATION */

//ARCHIVE SPECIFIC MONTHLY EVALUATION BY THEIR ID
/* router.patch('/teachers/archive/:teacherId', async (req, res) => {
    try {
        const archivedTeacher = await Teacher.updateOne(
            { _id: req.params.teacherId },
            {
                $set: {
                    archived: true
                }
            }
        );
        res.json(archivedTeacher);
        console.log((i++) + ". ARCHIVED TEACHER");
    } catch (error) {
        res.json(error);
    }
}) */

/**********ANNOUNCEMENT CRUD OPERATIONS BY TEACHER**********/
router.post('/announcements/add', async (req, res) => {
    //console.log(req.body);
    const announcement = new Announcement({
        description: req.body.description,
        teacher: req.body.teacher,
        subject: req.body.subject
    });

    try {
        const savedAnnouncement = await announcement.save();
        res.json(announcement);
        console.log("TEACHER : ADDED NEW ANNOUNCEMENT");
    } catch (error) {
        res.json({ message: error });
    }
})

//LIST ALL ANNOUNCEMENTS MADE BY SAID TEACHER
router.get('/announcements/:teacherId', async (req, res) => {
    try {
        const ans = await Announcement.find({
            teacher: req.params.teacherId
        })
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived'])
            .populate('subject', ['_id', 'name', 'grade', 'archived']);
        res.json(ans);
        console.log("TEACHER :  LISTING ALL OF SAID TEACHER'S ANNOUNCEMENTS");
    } catch (error) {
        res.json({ message: error });
    }
})

//UPDATE ANNOUNCEMENT AS TEACHER
router.patch('/announcements/update/:ancId', async (req, res) => {
    try {
        const updatedAnc = await Announcement.updateOne(
            { _id: req.params.ancId },
            {
                $set: {
                    description: req.body.description,
                    teacher: req.body.teacher,
                    subject: req.body.subject
                }
            });
        res.json(updatedAnc);
        console.log("TEACHER : UPDATED ANNOUNCEMENT");
    } catch (error) {
        res.json({ message: error });
    }
})

//COMMENT ON AN ANNOUNCEMENT AS TEACHER
router.post('/announcements/comment/:idAnc', async (req, res) => {
    const cm = new Comment({
        content: req.body.content,
        teacher: req.body.teacher,
        announcement: req.params.idAnc
    });
    try {
        const savedCM = await cm.save();
        res.json(cm);
        console.log("TEACHER : ADDED NEW COMMENT");
    } catch (error) {
        res.json({
            message: error
        });
    }
})

/**********TASKS CRUD OPERATIONS BY TEACHER**********/
//ADD A NEW TASK
router.post('/tasks/add', async (req, res) => {
    //console.log(req.body);
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        class: req.body.class,
        subject: req.body.subject,
        teacher: req.body.teacher
    });

    try {
        await task.save();
        return res.status(201).json({
            message: "TASK ADDED",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD TASK",
            reason: error.toString(),
            success: false
        });
    }
})

//LIST ALL TASKS MADE BY SAID TEACHER
router.get('/tasks/:teacherId', async (req, res) => {
    try {
        const tasks = await Task.find({
            teacher: req.params.teacherId
        })
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived'])
            .populate('subject', ['_id', 'name', 'grade', 'archived'])
            .populate('class', ['_id', 'grade', 'archived']);
        return res.status(500).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: "A PROBLEM ACCURED",
            reason: error.toString(),
            success: false
        })
    }
})

//UPDATE TASK AS TEACHER
router.patch('/tasks/update/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.updateOne(
            { _id: req.params.taskId },
            {
                $set: {
                    description: req.body.description,
                    deadline: req.body.deadline
                }
            });
        return res.status(201).json({
            message: "TASK UPDATED",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO UPDATE TASK",
            reason: error.toString(),
            success: false
        });
    }
})

/*************DEPOSIT MANAGEMENT ************/
//ADD A MARK TO A DEPOSIT
router.patch('/add_mark/:depositId', async (req,res)=>{
    try {
        const updatedDeposit = await Deposit.updateOne(
            { _id: req.params.depositId },
            {
                $set: {
                    mark : req.body.mark,
                    side_notes : req.body.side_notes
                }
            });
        return res.status(201).json({
            message: "DEPOSIT MARKED",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO MARK DEPOSIT",
            reason: error.toString(),
            success: false
        });
    }
})



module.exports = router;