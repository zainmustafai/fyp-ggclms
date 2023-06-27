import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
    readStatus: { type: Boolean, default: false },
    link: { type: String },
    importanceLevel: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

// POSSIBILITES
// Title: The title or subject of the notification.
// Content: The content or message of the notification.
// Type: The type of notification (e.g., course update, assignment deadline reminder, system announcement).
// Sender: The user or system that sent the notification.
// Receiver: The user who received the notification.
// Timestamp: The timestamp when the notification was sent.
// Read Status: A flag indicating whether the notification has been read by the receiver.
// Link: A link to a specific page or resource related to the notification.
// Importance Level: An indication of the importance or priority of the notification.
// Course ID: An optional reference to the course associated with the notification.
// Assignment ID: An optional reference to the assignment associated with the notification.
// Additional Metadata: Any additional metadata or custom fields specific to your application's notification system.
