import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useConversation(
  listPeople,
  conversation = [],
  setConversation
) {
  const [isEditing, setIsEditing] = useState(false);
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
      },
    ];
    setConversation(newConversation);
  };

  const handleEditing = () => {
    if (id === "-1" || listPeople.length === 0 || listPeople[0] === "") return;
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    handleAddNewLine,
    handleEditing,
    handleSave,
  };
}
