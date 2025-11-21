import React, { isValidElement, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    isMessagesLoading,
    messages,
    selectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef();

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />;
        <MessageInput />
      </div>
    );

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId == authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avataer">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId == authUser._id
                      ? authUser?.profilePic || "/avatar.jpg"
                      : selectedUser?.profilePic || "/avatar.jpg"
                  }
                  alt="profile pic"
                  className="rounded-full object-cover size-full"
                />
              </div>
            </div>
            <div className="chat-header mb-1 ">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="image"
                  className="max-w-[100px] sm:max-w-[150px] rounded-md mb-2 object-cover"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
