"use client";
import React from "react";

import { useDrop } from "react-dnd";
import { useFooterStore, useMainStore, useNavbarStore } from "../store";

import TextWidget from "./TextWidget";
import ImageWidget from "./ImageWidget";

import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";

const TrashBin = () => {
  const { removeNavbarWidget } = useNavbarStore();
  const { removeMainWidget } = useMainStore();
  const { removeFooterWidget } = useFooterStore();

  const [{ isOver }, dropRef] = useDrop({
    accept: "widget",
    drop: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        removeMainWidget(item.id);
        removeNavbarWidget(item.id);
        removeFooterWidget(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`p-4 text-white transition-colors border-2 border-dashed rounded-lg trash-bin ${
        isOver && "bg-red-500"
      } text-center flex-grow justify-center flex items-center `}
    >
      Drag Here to Delete
    </div>
  );
};

const Sidebar = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col col-span-3 p-4 bg-primary ">
      <h1 className="text-white">Elements</h1>

      <div className="flex flex-col justify-between h-full space-y-20">
        <div className="flex mt-10 space-x-4 ">
          <TextWidget />
          <ImageWidget />
        </div>

        <TrashBin />
        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => {
              toast({
                title: "Your Website Has Been Saved 💖",
              }),
                console.log("Website Saved");
            }}
            variant="outline"
          >
            Save The Website
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
