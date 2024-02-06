import adminModel from "../modals/adminModal.js";
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
    // console.log(check);
    if (!check) {
      let student = await userModel.create({
        fullname: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        batch: trimmedBatch,
        domain: trimmedDomain,
      });
    } else {
        console.log('else aahn mone')
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
    console.log(students);
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export { displayUser, addUser };
