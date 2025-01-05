import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { responseHandler } from "../helpers/responseHandler.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    return responseHandler(res, {
      status: 201,
      success: true,
      message: "New Message created",
      data: newMessage
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    return responseHandler(res, {
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}