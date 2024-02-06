import userModel from "../modals/userModal.js";

const addUser = async (req, res) => {
  try {
    const { name, email, phone, batch, domain } = req.body;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedBatch = batch.trim();
    const trimmedDomain = domain.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedBatch ||
      !trimmedDomain
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }
    if (trimmedPhone.length !== 10) {
      return res
        .status(400)
        .json({ error: "Phone number should be 10 digits." });
    }
    if (trimmedEmail.includes(" ")) {
      return res
        .status(400)
        .json({ error: "Email should not contain spaces." });
    }

    let check = await userModel.findOne({ email: trimmedEmail });

    if (!check) {
      let student = await userModel.create({
        fullname: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        batch: trimmedBatch,
        domain: trimmedDomain,
      });
    } else {
        
      return res.status(400).json({ error: "Email is already exist"});
    }
    // console.log(student);
    res.status(200).json("Successfully added.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const displayUser = async (req, res) => {
  try {
    let students = await userModel.find({});
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteUser=async(req,res)=>{
  try {
    console.log(req.body)
    let deleteStudent=await userModel.findByIdAndDelete(req.body.id)
    res.status(200).json('Deleted')
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const { fullname, email, phone, batch, domain } = updateData;
    const existingUserWithNewEmail = await userModel.findOne({ email: email, _id: { $ne: userId } });
    console.log(existingUserWithNewEmail,'emial esssss')
    if (existingUserWithNewEmail) {
      return res.status(400).json({ error: 'Email is already in use by another user.' });
    }
    const trimmedFullname = fullname.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedBatch = batch.trim();
    const trimmedDomain = domain.trim();

    if (!trimmedFullname || !trimmedEmail || !trimmedPhone || !trimmedBatch || !trimmedDomain) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedStudent = await userModel.findByIdAndUpdate(
      userId,
      { $set: { fullname: trimmedFullname, email: trimmedEmail, phone: trimmedPhone, batch: trimmedBatch, domain: trimmedDomain } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { displayUser, addUser,deleteUser,updateUser };
