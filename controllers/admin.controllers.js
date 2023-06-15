import Teacher from "../models/teacher.model";
import User from "../models/user.model";

export const createNewTecher = async (req,res)=>{

    try {
        const user = new User(req.body.user);// Assuming req.body.user contains the user details
        await user.save();
        const teacherData = {
            user: user._id,
        };
        const teacher = await Teacher.create(studentData);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};