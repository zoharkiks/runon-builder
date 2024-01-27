import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { useFooterStore, useMainStore, useNavbarStore } from "../store";

const TextWidget = ({ id, section, editedText }) => {
  const [isEditing, setIsEditing] = useState(false);
const [text, setText] = useState(editedText || 'Text Block');

  const updateNavWidgetText = useNavbarStore(
    (state) => state.updateNavWidgetText
  );
  const updateMainWidgetText = useMainStore(
    (state) => state.updateMainWidgetText
  );
  const updateFooterWidgetText = useFooterStore(
    (state) => state.updateFooterWidgetText
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (section === "navbar") {
      updateNavWidgetText(id, newText);
    } else if (section === "main") {
      updateMainWidgetText(id, newText);
    } else if (section === "footer") {

      updateFooterWidgetText(id, newText);
    }
  };
  const handleBlur = () => {
    setIsEditing(false);

    if (section === "navbar") {
      updateNavWidgetText(id, text);
    } else if (section === "main") {
      updateMainWidgetText(id, text);
    } else if (section === "footer") {
      updateFooterWidgetText(id, text);
    }
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "widget",
    item: { type: "text", id: id, section: section, text: editedText }, 
    collect: (monitor) => {
      if (monitor.isDragging()) {
      }
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));
  return (
    <div
      onDoubleClick={handleDoubleClick}
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex justify-center px-2 font-medium text-center bg-white border rounded-lg shadow-md cursor-move w-max text-md"
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default TextWidget;
