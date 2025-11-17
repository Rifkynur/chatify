import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { isMessagesLoading, messages, selectedUser, getMessages } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser]);
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
      <p>Pesan</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
