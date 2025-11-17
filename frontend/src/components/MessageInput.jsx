import React, { useState } from "react";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {};
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview Image"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
              onClick={removeImage}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            name=""
            id=""
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full rounded-lg input-sm sm:input-md"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name=""
            id=""
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text && !imagePreview}
          className="btn btn-sm btn-circle"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
