import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDrag } from "react-dnd";
import { useFooterStore, useMainStore, useNavbarStore } from "../store"; // Adjust the import path as necessary

const ImageWidget = ({ id, section, editedImgUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imgUrl, setImgUrl] = useState(editedImgUrl);

  const updateNavWidgetImage = useNavbarStore(
    (state) => state.updateNavWidgetImage
  );

  const updateMainWidgetImage = useMainStore(
    (state) => state.updateMainWidgetImage
  );

  const updateFooterWidgetImage = useFooterStore(
    (state) => state.updateFooterWidgetImage
  );

  const navWidgets = useNavbarStore((state) => state.widgets);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // const handleBlur = () => {
  //   setIsEditing(false);
  //   if (section === "navbar") {
  //     updateNavWidgetImage(id, imgUrl);
  //   }
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImgUrl(base64String);
        if (section === "navbar") {
          updateNavWidgetImage(id, base64String);
        } else if (section === "main") {
          updateMainWidgetImage(id, base64String);
        } else if (section === "footer") {
          updateFooterWidgetImage(id, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
    setIsEditing(false);
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "widget",
    item: { type: "image", id: id, section: section, imgUrl: editedImgUrl },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  return (
    <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex flex-col items-center justify-center px-2 font-medium text-center bg-white border rounded-lg shadow-md cursor-move w-max text-md "
      onDoubleClick={handleDoubleClick}
      tabIndex={0} 
    >
      {isEditing ? (
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="flex items-center justify-center w-full p-2"
        />
      ) : (
        imgUrl && (
          <Image
            src={imgUrl}
            alt="Uploaded Image"
            width={100} 
            height={100}
          />
        )
      )}

      {!isEditing && !imgUrl && <div className="text-black">Image</div>}
    </div>
  );
};

export default ImageWidget;
