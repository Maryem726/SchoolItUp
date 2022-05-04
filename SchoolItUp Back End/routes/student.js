const express = require('express');
const router = express.Router();

const Deposit = require('../models/Deposit');
const Task = require('../models/Task');

//CAN ONLY BE ACCESSED BY STUDENT
router.get('/', (req, res) => {
    res.send('STUDENT ROUTE');
})


/**********DEPOSIT CRUD OPERATIONS BY TEACHER**********/

//ADD A DEPOSIT
router.post('/deposit/add', async (req, res) => {
    //console.log(req.body);
    const assocaitedTask = Task.findById(req.body.task);
    const ddlr = false;
    const ddl = new Date(assocaitedTask.get('deadline'));
    if (Date.now() < ddl) {
        ddlr = true;
    }
    const deposit = new Deposit({
        task: req.body.task,
        img_location: req.body.img_location,
        img_type: req.body.img_type,
        deadline_respected: ddlr,
        student: req.body.student
    });

    try {
        await deposit.save();
        return res.status(201).json({
            message: "DEPOSIT ADDED",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD DEPOSIT",
            reason: error.toString(),
            success: false
        });
    }
})

//GET DEPOSIT OF TASK MADE BY SAID STUDENT
router.get('/deposit/:taskId/:studentId', (async (req, res) => {
    try {
        const deposit = await Deposit.findOne({
            student: req.params.studentId,
            task: req.params.taskId
        });
        res.status(200).json(deposit);
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO GET DEPOSIT",
            reason: error.toString(),
            success: false
        });
    }
}))

//UPDATE A DEPOSIT
router.patch('/deposit/update/:depositId', async (req, res) => {
    const assocaitedTask = Task.findById(req.body.task);
    const ddlr = false;
    const ddl = new Date(assocaitedTask.get('deadline'));
    if (Date.now() < ddl) {
        ddlr = true;
    }
    try {
        const deposit = await Deposit.updateOne(
            { _id: req.params.depositId },
            {
                $set: {
                    task: req.body.task,
                    img_location: req.body.img_location,
                    img_type: req.body.img_type,
                    deadline_respected: ddlr,
                }
            }
        );
        return res.status(201).json({
            message: "DEPOSIT UPDATED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO UPDATE DEPOSIT",
            reason: error.toString(),
            success: false
        });
    }
})


module.exports = router;