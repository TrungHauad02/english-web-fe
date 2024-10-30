import { deleteConversation } from "api/study/speaking/conversationService";

export default function useLine(conversation, setConversation, index) {
  const onChangeName = (event) => {
    const newConversation = [...conversation];
    newConversation[index] = {
      ...newConversation[index],
      name: event.target.value,
    };
    setConversation(newConversation);
  };

  const onChangeContent = (event) => {
    const newConversation = [...conversation];
    newConversation[index] = {
      ...newConversation[index],
      content: event.target.value,
    };
    setConversation(newConversation);
  };

  const onDeleteLine = async () => {
    const lineToDelete = conversation[index];

    if (lineToDelete.id !== "-1") {
      try {
        await deleteConversation(lineToDelete.id);
      } catch (error) {
        console.error("Error deleting conversation: ", error);
      }
    }
    const newConversation = conversation.filter((_, idx) => idx !== index);
    setConversation(newConversation);
  };

  const moveUp = () => {
    if (index === 0) return;
    const newConversation = [...conversation];
    [newConversation[index - 1], newConversation[index]] = [
      newConversation[index],
      newConversation[index - 1],
    ];
    newConversation[index - 1].serial = newConversation[index - 1].serial - 1;
    newConversation[index].serial = newConversation[index].serial + 1;
    setConversation(newConversation);
  };

  const moveDown = () => {
    if (index === conversation.length - 1) return;
    const newConversation = [...conversation];
    [newConversation[index], newConversation[index + 1]] = [
      newConversation[index + 1],
      newConversation[index],
    ];
    newConversation[index].serial = newConversation[index].serial + 1;
    newConversation[index + 1].serial = newConversation[index + 1].serial - 1;
    setConversation(newConversation);
  };

  return { onChangeName, onChangeContent, onDeleteLine, moveUp, moveDown };
}
