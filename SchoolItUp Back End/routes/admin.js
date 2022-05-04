const express = require('express')
const bcrypt = require("bcryptjs")
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject');
const Meval = require('../models/Monthly_Eval');
const User = require('../models/User');

const router = express.Router();

//CAN ONLY BE ACCESSED BY THE ADMIN
router.get('/', (req, res) => {
    res.send('ADMINS ROUTE, IF I AM SEEING THIS, THEN THAT MEANS I AM LOGGED IN AS AN ADMIN');
})

var i = 1;

/**********TEACHERS CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW TEACHER
router.post('/teachers/add', async (req, res) => {
    //console.log(req.body);

    //PASSWORD ENCRYPTION
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(req.body.pass, salt);

    const teacher = new User({
        first_name: req.body.first_name.toUpperCase(),
        last_name: req.body.last_name.toUpperCase(),
        mail: req.body.mail,
        birthDate: req.body.birthDate,
        adress: req.body.adress,
        pass: hashed,
        phoneNumber: req.body.phoneNumber,
        role: "TEACHER",
        cin: req.body.cin,
        etat_civil: req.body.etat_civil
    });

    try {
        await teacher.save();
        return res.status(201).json({
            message: "TEACHER ADD",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD TEACHER",
            reason: error.toString(),
            success: false
        });
    }
})

//LIST ALL TEACHERS AS ADMIN
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await User.find({
            role: "TEACHER"
        });
        res.json(teachers);
        console.log((i++) + ". LISTING ALL TEACHERS");
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC TEACHER BY NAME
router.get('/teachers/:teacherName', async (req, res) => {
    try {
        const teachers = await User.find({
            first_name: {
                $regex: '.*' + req.params.teacherName.toUpperCase() + '.*'
            },
            role: "TEACHER"
        })
        res.json(teachers);
        console.log((i++) + ". FINDING SPECIFIC TEACHER");
    } catch (error) {
        res.json(error);
    }
})

//UPDATE TEACHER
router.patch('/teachers/update/:teacherId', async (req, res) => {
    try {
        //PASSWORD ENCRYPTION
        const salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(req.body.pass, salt);
        const updatedTeacher = await User.updateOne(
            { _id: req.params.teacherId },
            {
                $set: {
                    first_name: req.body.first_name.toUpperCase(),
                    last_name: req.body.last_name.toUpperCase(),
                    mail: req.body.mail,
                    birthDate: req.body.birthDate,
                    adress: req.body.adress,
                    pass: hashed,
                    phoneNumber: req.body.phoneNumber,
                    cin: req.body.cin,
                    etat_civil: req.body.etat_civil
                }
            });
            return res.status(201).json({
                message: "TEACHER UPDATED",
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                message: "FAILURE TO UPDATE TEACHER",
                reason: error.toString(),
                success: false
            });
        }
})

//ARCHIVE SPECIFIC TEACHER BY THEIR ID
router.patch('/teachers/archive/:teacherId', async (req, res) => {
    try {
        const archivedTeacher = await User.updateOne(
            { _id: req.params.teacherId },
            {
                $set: {
                    archived: true
                }
            }
        );
        return res.status(201).json({
            message: "TEACHER ARCHIVED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ARCHIVE TEACHER",
            reason: error.toString(),
            success: false
        });
    }
})

/**********STUDENTS CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW STUDENT
router.post('/students/add', async (req, res) => {
    //console.log(req.body);

    //PASSWORD ENCRYPTION
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(req.body.pass, salt);

    const student = new User({
        first_name: req.body.first_name.toUpperCase(),
        last_name: req.body.last_name.toUpperCase(),
        //mail: req.body.mail,
        birthDate: req.body.birthDate,
        adress: req.body.adress,
        pass: hashed,
        //phoneNumber: req.body.phoneNumber,
        parents_status: req.body.parents_status,
        hosted_by: req.body.hosted_by,
        siblings: req.body.siblings,
        old_school: req.body.old_school,
        application_status: "PENDING"
    });

    try {
        await student.save();
        return res.status(201).json({
            message: "STUDENT ADDED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD STUDENT",
            reason: error.toString(),
            success: false
        });
    }
})

//LIST ALL STUDENTS AS ADMIN
router.get('/students', async (req, res) => {
    try {
        const students = await User.find({
            role: "STUDENT"
        });
        res.json(students);
        console.log((i++) + ". LISTING ALL STUDENTS");
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC STUDENT BY NAME
router.get('/students/:studentName', async (req, res) => {
    try {
        const students = await User.find({
            first_name: {
                $regex: '.*' + req.params.studentName.toUpperCase() + '.*'
            },
            role: "STUDENT"
        })
        res.json(students);
        console.log((i++) + ". FINDING SPECIFIC STUDENT");
    } catch (error) {
        res.json(error);
    }
})

//UPDATE STUDENT
router.patch('/students/update/:studentId', async (req, res) => {
    try {
        //PASSWORD ENCRYPTION
        const salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(req.body.pass, salt);
        const updatedStudent = await User.updateOne(
            { _id: req.params.studentId },
            {
                $set: {
                    first_name: req.body.first_name.toUpperCase(),
                    last_name: req.body.last_name.toUpperCase(),
                    //mail: req.body.mail,
                    birthDate: req.body.birthDate,
                    adress: req.body.adress,
                    pass: hashed,
                    //phoneNumber: req.body.phoneNumber,
                    parents_status: req.body.parents_status,
                    hosted_by: req.body.hosted_by,
                    siblings: req.body.siblings,
                    old_school: req.body.old_school
                }
            });
            return res.status(201).json({
                message: "STUDENT UPDATED",
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                message: "FAILURE TO UPDATE STUDENT",
                reason: error.toString(),
                success: false
            });
        }
})

//ARCHIVE SPECIFIC STUDENT BY THEIR ID
router.patch('/students/archive/:studentId', async (req, res) => {
    try {
        const archivedStudent = await User.updateOne(
            { _id: req.params.studentId },
            {
                $set: {
                    archived: true
                }
            }
        );
        return res.status(201).json({
            message: "STUDENT ARCHIVED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ARCHIVE STUDENT",
            reason: error.toString(),
            success: false
        });
    }
})

//SET STUDENT'S CURRENT CLASS
router.patch('/students/class/:studentId', async (req, res) => {
    try {
        const classedStudent = await User.updateOne(
            { _id: req.params.studentId },
            {
                $set: {
                    class: req.body.class
                }
            }
        );
        return res.status(201).json({
            message: "STUDENT'S CLASS SET",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO SET STUDENT'S CLASS",
            reason: error.toString(),
            success: false
        });
    }
})

//SET STUDENT'S PARENT
router.patch('/students/parent/:studentId', async (req, res) => {
    try {
        const parentedStudent = await User.updateOne(
            { _id: req.params.studentId },
            {
                $set: {
                    parent: req.body.parent
                }
            }
        );
        return res.status(201).json({
            message: "STUDENT'S PARENT SET",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO SET STUDENT'S PARENT",
            reason: error.toString(),
            success: false
        });
    }
})

/**********PARENTS CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW PARENT
router.post('/parents/add', async (req, res) => {
    //console.log(req.body);

    //PASSWORD ENCRYPTION
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(req.body.pass, salt);

    const parent = new User({
        first_name: req.body.first_name.toUpperCase(),
        last_name: req.body.last_name.toUpperCase(),
        mail: req.body.mail,
        birthDate: req.body.birthDate,
        adress: req.body.adress,
        pass: hashed,
        phoneNumber: req.body.phoneNumber,
        cin: req.body.cin,
        etat_civil: req.body.etat_civil
    });

    try {
        await parent.save();
        return res.status(201).json({
            message: "PARENT ADDED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ADD PARENT",
            reason: error.toString(),
            success: false
        });
    }
})

//LIST ALL PARENTS AS ADMIN
router.get('/parents', async (req, res) => {
    try {
        const parents = await User.find({
            role: "PARENT"
        });
        res.json(parents);
        console.log((i++) + ". LISTING ALL PARENTS");
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC PARENT BY NAME
router.get('/parents/:parentName', async (req, res) => {
    try {
        const parents = await User.find({
            first_name: {
                $regex: '.*' + req.params.studentName.toUpperCase() + '.*'
            },
            role: "PARENT"
        })
        res.json(parents);
        console.log((i++) + ". FINDING SPECIFIC PARENT");
    } catch (error) {
        res.json(error);
    }
})

//UPDATE PARENT
router.patch('/parents/update/:parentId', async (req, res) => {
    try {
        //PASSWORD ENCRYPTION
        const salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(req.body.pass, salt);
        const updatedParent = await User.updateOne(
            { _id: req.params.parentId },
            {
                $set: {
                    first_name: req.body.first_name.toUpperCase(),
                    last_name: req.body.last_name.toUpperCase(),
                    mail: req.body.mail,
                    birthDate: req.body.birthDate,
                    adress: req.body.adress,
                    pass: hashed,
                    phoneNumber: req.body.phoneNumber,
                    cin: req.body.cin,
                    etat_civil: req.body.etat_civil
                }
            });
            return res.status(201).json({
                message: "PARENT UPDATED",
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                message: "FAILURE TO UPDATE PARENT",
                reason: error.toString(),
                success: false
            });
        }
})

//ARCHIVE SPECIFIC PARENT BY THEIR ID
router.patch('/parents/archive/:parentId', async (req, res) => {
    try {
        const archivedParent = await User.updateOne(
            { _id: req.params.parentId },
            {
                $set: {
                    archived: true
                }
            }
        );
        return res.status(201).json({
            message: "PARENT ARCHIVED",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "FAILURE TO ARCHIVE PARENT",
            reason: error.toString(),
            success: false
        });
    }
})



/**********CLASS CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW Class
router.post('/classes/add', async (req, res) => {
    //console.log(req.body);
    const cls = new Class({
        grade: req.body.grade.toUpperCase(),
        schedule: req.body.schedule
    });
    try {
        const savedClass = await cls.save();
        res.json(cls);
        console.log((i++) + ". ADDED NEW CLASS");
    } catch (error) {
        res.json({ message: error });
    }
})

//LIST ALL CLASSES AS ADMIN
router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.find().populate('schedule', ['archived', '_id', 'type', 'scan']);
        res.json(classes);
        console.log((i++) + ". LISTING ALL CLASSES");
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC CLASS BY GRADE
router.get('/classes/:classGrade', async (req, res) => {
    try {
        const classes = await Class.find({
            first_name: {
                $regex: '.*' + req.params.classGrade.toUpperCase() + '.*'
            }
        })
        console.log((i++) + ". FINDING SPECIFIC CLASS")
        res.json(classes);
    } catch (error) {
        res.json(error);
    }
})

//UPDATE CLASS
router.patch('/classes/update/:classId', async (req, res) => {
    try {
        const updatedClass = await Class.updateOne(
            { _id: req.params.classId },
            {
                $set: {
                    grade: req.body.grade.toUpperCase(),
                    schedule: req.body.schedule
                }
            });
        console.log((i++) + ". UPDATED CLASS")
        res.json(updatedClass);
    } catch (error) {
        res.json({ message: error });
    }
})

//ARCHIVE SPECIFIC CLASS BY THEIR ID
router.patch('/classes/archive/:classId', async (req, res) => {
    try {
        const archivedClass = await Class.updateOne(
            { _id: req.params.classId },
            {
                $set: {
                    archived: true
                }
            }
        );
        res.json(archivedClass);
        console.log((i++) + ". ARCHIVED CLASS");
    } catch (error) {
        res.json(error);
    }
})

/**********SCHEDULE CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW SCHEDULE
router.post('/schedules/add', async (req, res) => {
    //console.log(req.body);
    const schedule = new Schedule({
        type: req.body.type.toUpperCase(),
        scan: req.body.scan,
        class: req.body.class
    });
    try {
        const savedSchedule = await schedule.save();
        console.log((i++) + ". ADDED NEW SCHEDULE");
        res.json(schedule);
    } catch (error) {
        res.json({ message: error });
    }
})

//LIST ALL SCHEDULES AS ADMIN
router.get('/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('class', ['_id', 'grade', 'archived']);
        console.log((i++) + ". GETTING ALL SCHEDULES")
        res.json(schedules);
    } catch (error) {
        res.json({ message: error });
    }
})

//FIND SPECIFIC SCHEDULE BY CLASS
router.get('/classes/:classGrade', async (req, res) => {
    try {
        const schedules = await Class.find({
            class: {
                $regex: '.*' + req.params.classGrade.toUpperCase() + '.*'
            }
        })
        res.json(schedules);
        console.log((i++) + ". FINDING SPECIFIC SCHEDULE")
    } catch (error) {
        res.json(error);
    }
})

//UPDATE SCHEDULE
router.patch('/schedules/update/:scheduleId', async (req, res) => {
    try {
        const updatedSchedule = await Schedule.updateOne(
            { _id: req.params.scheduleId },
            {
                $set: {
                    type: req.body.type.toUpperCase(),
                    class: req.body.class
                }
            });
        res.json(updatedSchedule);
        console.log((i++) + ". UPDATED SCHEDULES")
    } catch (error) {
        res.json({ message: error });
    }
})

//ARCHIVE SPECIFIC SCHEDULE BY ITS ID
router.patch('/schedules/archive/:scheduleId', async (req, res) => {
    try {
        const archivedSchedule = await Schedule.updateOne(
            { _id: req.params.scheduleId },
            {
                $set: {
                    archived: true
                }
            }
        );
        res.json(archivedSchedule);
        console.log((i++) + ". ARCHIVED SCHEDULE");
    } catch (error) {
        res.json(error);
    }
})


/**********SUBJECT CRUD OPERATIONS BY ADMIN**********/

//ADD A NEW SUBJECT
router.post('/subjects/add', async (req, res) => {
    //console.log(req.body);
    const subject = new Subject({
        name: req.body.name.toUpperCase(),
        grade: req.body.grade,
        class: req.body.class,
        teacher: req.body.teacher
    });
    try {
        const savedSubject = await subject.save();
        console.log((i++) + ". ADDED NEW SUBJECT");
        res.json(subject);
    } catch (error) {
        res.json({ message: error });
    }
})

//LIST ALL SUBJECTS AS ADMIN
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find()
            .populate('class', ['_id', 'grade', 'archived'])
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived']);
        console.log((i++) + ". GETTING ALL SUBJECTS")
        res.json(subjects);
    } catch (error) {
        res.json({ message: error });
        console.log(error)
    }
})

//FIND SPECIFIC SUBJECT BY NAME
router.get('/subjects/:subjectName', async (req, res) => {
    try {
        const subjects = await Subject.find({
            class: {
                $regex: '.*' + req.params.classGrade.toUpperCase() + '.*'
            }
        })
            .populate('class', ['_id', 'grade', 'archived'])
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived']);
        res.json(schedules);
        console.log((i++) + ". FINDING SPECIFIC SUBJECT")
    } catch (error) {
        res.json(error);
    }
})

//UPDATE SUBJECT
router.patch('/subjects/update/:subjectId', async (req, res) => {
    try {
        const updatedSubject = await Subject.updateOne(
            { _id: req.params.subjectId },
            {
                $set: {
                    name: req.body.name.toUpperCase(),
                    grade: req.body.grade,
                    class: req.body.class,
                    teacher: req.body.teacher
                }
            });
        res.json(updatedSubject);
        console.log((i++) + ". UPDATED SUBJECT")
    } catch (error) {
        res.json({ message: error });
    }
})

//ARCHIVE SPECIFIC SUBJECT BY ITS ID
router.patch('/subjects/archive/:subjectId', async (req, res) => {
    try {
        const archivedSubject = await Subject.updateOne(
            { _id: req.params.subjectId },
            {
                $set: {
                    archived: true
                }
            }
        );
        res.json(archivedSubject);
        console.log((i++) + ". ARCHIVED SUBJECT");
    } catch (error) {
        res.json(error);
    }
})


/********** MONTHLY EVALUATIONS OPERATIONS AS ADMIN **********/

//LIST ALL MONTHLY EVALUATIONS AS ADMIN
router.get('/mevals', async (req, res) => {
    try {
        const mevals = await Meval.find()
            .populate('teacher', ['_id', 'first_name', 'last_name', 'archived'])
            .populate('subject', ['_id', 'name', 'grade', 'archived']);
        res.json(mevals);
        console.log("ADMIN :  LISTING ALL MONTHLY EVALUATIONS");
    } catch (error) {
        res.json({ message: error });
    }
})


module.exports = router;