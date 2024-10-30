import { useState } from "react";

export default function usePeopleInConversation(
  listPeople,
  setListPeople,
  conversation,
  setConversation
) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState([...listPeople]);

  if (localData[localData.length - 1] !== "") localData.push("");

  const peopleRows = [];
  for (let i = 0; i < localData.length; i += 3) {
    peopleRows.push(localData.slice(i, i + 3));
  }

  const onDeletePeople = (index) => {
    const nameToDelete = localData[index];
    if (conversation.some((line) => line.name === nameToDelete)) {
      alert(
        `Cannot delete "${nameToDelete}" as they are involved in the conversation.`
      );
      return;
    }

    const newLocalData = [...localData];
    newLocalData.splice(index, 1);
    setLocalData(newLocalData);
    setListPeople(newLocalData);
  };

  const onAddPeople = (name) => {
    const newLocalData = [...localData];
    newLocalData.pop();
    newLocalData.push(name);
    if (hasDuplicates(newLocalData)) {
      alert(
        "There are duplicate names. Please remove duplicates before saving."
      );
      return;
    }
    setLocalData(newLocalData);
  };

  const handleEditing = () => {
    setIsEditing(true);
  };
  const hasDuplicates = (array) => {
    const uniqueItems = new Set(array);
    return uniqueItems.size !== array.length;
  };
  const handleSave = () => {
    if (hasDuplicates(localData)) {
      alert(
        "There are duplicate names. Please remove duplicates before saving."
      );
      return;
    }
    setIsEditing(false);
    setListPeople(localData);
  };
  const setName = (index, newName) => {
    const oldName = localData[index];
    const updatedData = localData.map((name, i) =>
      i === index ? newName : name
    );

    const updatedConversation = conversation.map((line) => {
      if (line.name === oldName) {
        return { ...line, name: newName };
      }
      return line;
    });

    setLocalData(updatedData);
    setListPeople(updatedData);
    setConversation(updatedConversation);
  };
  return {
    isEditing,
    peopleRows,
    onDeletePeople,
    onAddPeople,
    handleEditing,
    handleSave,
    setName,
  };
}
