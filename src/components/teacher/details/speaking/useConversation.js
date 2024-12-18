import {
  createConversation,
  updateConversation,
} from "api/study/speaking/conversationService";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useConversation(
  listPeople,
  conversation = [],
  setConversation,
  setError
) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();

  const handleAddNewLine = () => {
    const nameToAdd = listPeople ? listPeople[0] : "";
    const newConversation = [
      ...(conversation || []),
      {
        id: "-1",
        name: nameToAdd,
        serial: (conversation?.length || 0) + 1,
        content: "",
        speakingId: id,
        status: "ACTIVE",
      },
    ];
    setConversation(newConversation);
  };

  const handleEditing = () => {
    if (id === "-1") {
      setError("This lesson doesn't available yet.");
      return;
    }
    if (listPeople.length === 0 || listPeople[0] === "") {
      setError("Add people before add any conversation");
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setIsEditing(false);
      const listRequest = conversation.map((line) => {
        if (line.id === "-1") return createConversation(line);
        else return updateConversation(line.id, line);
      });
      const newData = await Promise.all(listRequest);
      console.log(newData);
      setConversation(newData);
    } catch (error) {
      console.error("Error saving conversation: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isEditing,
    isSaving,
    handleAddNewLine,
    handleEditing,
    handleSave,
  };
}
