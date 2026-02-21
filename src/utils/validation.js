const validator = require("validator");

const validatSigupdata = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (firstName.length == 0 || lastName.length == 0) {
    throw new Error("Please Enter the Name");
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("Invlaid Name");
  } else if (lastName.length < 2 || lastName.length > 50) {
    throw new Error("Invlaid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invlaid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEnteredTask = (body) => {
  const { title, description, dueDate } = body;

  if (!title || title.trim().length <= 2) {
    throw new Error("Please Enter the proper title");
  }

  if (!description || description.trim().length <= 5) {
    throw new Error("Please Enter the proper description");
  }

  if (!dueDate) {
    throw new Error("Due date is required");
  }

  const today = new Date();
  const due = new Date(dueDate);

  today.setUTCHours(0, 0, 0, 0);
  due.setUTCHours(0, 0, 0, 0);

  if (due < today) {
    throw new Error("Please Enter Valid Date");
  }
};

module.exports = {
  validatSigupdata,
  validateEnteredTask,
};
