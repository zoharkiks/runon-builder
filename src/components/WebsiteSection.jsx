"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { useMainStore, useNavbarStore, useFooterStore } from "../store";
import TextWidget from "./TextWidget";
import ImageWidget from "./ImageWidget";

import { useToast } from "@/components/ui/use-toast";

const WebsiteSection = () => {
  const { addNavbarWidget } = useNavbarStore();
  const { addMainWidget } = useMainStore();
  const { addFooterWidget } = useFooterStore();

  const navWidgets = useNavbarStore((state) => state.widgets);
  const mainWidgets = useMainStore((state) => state.widgets);
  const footerWidgets = useFooterStore((state) => state.widgets);

  const [, dropRefNav] = useDrop(() => ({
    accept: "widget",
    drop: (item) => {
      addNavbarWidget({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        section: "navbar",
      });
    },
  }));

  const [, dropRefMain] = useDrop(() => ({
    accept: "widget",
    drop: (item) => {
      addMainWidget({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        section: "main",
      });
    },
  }));

  const [, dropRefFooter] = useDrop(() => ({
    accept: "widget",
    drop: (item) => {
      addFooterWidget({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        section: "footer",
      });
    },
  }));

  return (
    <div className="flex flex-col justify-between col-span-9 p-2 border bg-accent border-accent gap-y-4">
      {/* Navbar Section */}
      <div
        ref={dropRefNav}
        className="flex items-center p-4 rounded-md bg-primary"
      >
        {navWidgets.length === 0 ? (
          <h1 className="text-white">Drag and drop navbar widgets here</h1>
        ) : (
          <div className="flex items-center justify-center space-x-7">
            {navWidgets.map((widget, index) => {
              switch (widget.type) {
                case "text":
                  return (
                    <TextWidget
                      section={widget.section}
                      editedText={widget.text}
                      id={widget.id}
                      key={index}
                    />
                  );
                case "image":
                  return (
                    <ImageWidget
                      editedImgUrl={widget.imgUrl}
                      section={widget.section}
                      id={widget.id}
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>

      {/* Main Section */}
      <div
        ref={dropRefMain}
        className="flex flex-grow p-4 rounded-md bg-primary"
      >
        {mainWidgets.length === 0 ? (
          <h1 className="text-white">Drag and drop main widgets here</h1>
        ) : (
          <div className="flex items-center justify-center space-x-6">
            {mainWidgets.map((widget, index) => {
              switch (widget.type) {
                case "text":
                  return (
                    <TextWidget
                      section={widget.section}
                      editedText={widget.text}
                      id={widget.id}
                      key={index}
                    />
                  );
                case "image":
                  return (
                    <ImageWidget
                      editedImgUrl={widget.imgUrl}
                      section={widget.section}
                      id={widget.id}
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div ref={dropRefFooter} className="flex p-4 rounded-md bg-primary ">
        {footerWidgets.length === 0 ? (
          <h1 className="text-white">Drag and drop footer widgets here</h1>
        ) : (
          <div className="flex items-center justify-center space-x-6 ">
            {footerWidgets.map((widget, index) => {
              switch (widget.type) {
                case "text":
                  return (
                    <TextWidget
                      section={widget.section}
                      editedText={widget.text}
                      id={widget.id}
                      key={index}
                    />
                  );
                case "image":
                  return (
                    <ImageWidget
                      editedImgUrl={widget.imgUrl}
                      section={widget.section}
                      id={widget.id}
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteSection;
