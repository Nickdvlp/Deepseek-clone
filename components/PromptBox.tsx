"use client";

import React, { useState } from "react";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Textarea } from "./ui/textarea";

type PromptFormValues = {
  prompt: string;
};
interface Messages {
  message: string;
  response: string;
}
const PromptBox = ({
  chatId,
  onNewMessage,
}: {
  chatId: string;
  onNewMessage: (msg: Messages) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<PromptFormValues>({
    defaultValues: {
      prompt: "",
    },
  });
  const cleanReply = (rawReply: string) => {
    return rawReply.replace(/<think>[\s\S]*?<\/think>/, "").trim();
  };

  const saveMessageToDb = async (msg: string, id: string) => {
    await axios.post(`/api/messages/${id}`, { data: msg });
  };

  const saveReplyToDb = async (reply: string, id: string) => {
    await axios.patch(`/api/reply/${id}`, { data: reply });
  };

  const onSubmit = async (data: PromptFormValues) => {
    try {
      saveMessageToDb(data.prompt, chatId);
      setIsLoading(true);
      const res = await axios.post(`/api/prompt`, {
        prompt: data.prompt,
      });
      const reply = cleanReply(res.data.reply);

      saveReplyToDb(reply, chatId);
      onNewMessage({ message: data.prompt, response: reply });

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex gap-2 px-4 items-start flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        rows={2}
        placeholder="Enter a prompt..."
        className="mx-auto px-4 py-2 border-blue-950 resize-none"
        {...register("prompt")}
        disabled={isLoading}
      />
      <Button
        type="submit"
        className="bg-blue-900 cursor-pointer hover:bg-blue-950"
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "Send"}
      </Button>
    </form>
  );
};

export default PromptBox;
