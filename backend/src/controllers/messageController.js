import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { responseHandler } from "../helpers/responseHandler.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

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

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return responseHandler(res, {
        status: 200,
        success: true,
        message: "No conversation found",
        data: []
      });
    }

    const messages = conversation.messages;

    return responseHandler(res, {
      status: 200,
      success: true,
      message: "New Message created",
      data: messages
    });
  } catch (error) {
    console.error("Error in getMessages controller: ", error.message);
    return responseHandler(res, {
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};