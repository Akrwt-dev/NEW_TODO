const mongoose = require("mongoose");
const todologo = require("../assets/to-do-list.png")
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photoURL: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


taskSchema.virtual("remainingDays").get(function () {
  if (!this.dueDate) return null;

  const today = new Date();
  const due = new Date(this.dueDate);


  today.setUTCHours(0, 0, 0, 0);
  due.setUTCHours(0, 0, 0, 0);

  const diffMs = due - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
});

module.exports = mongoose.model("Task", taskSchema);