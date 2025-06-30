"use client";
import { useRef } from "react";
import { Strings } from "./types";

export default function ImagePicker({ label, name }: Strings) {
  const imageInput = useRef<HTMLInputElement>(null);
  const buttonHandler = () => {
    imageInput.current?.click();
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <label htmlFor={name}>{label}</label>
        <div className="">
          <input
            type="file"
            className="hidden"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
          />
          {/*Need to use client, since your visitor need to upload photo from
          their side*/}
          <button
            className="p-4 bg-green-700 text-white border-2 text-md rounded-md focus:border-amber-400 focus:border-2 hover:cursor-pointer hover:bg-green-800"
            type="button"
            onClick={buttonHandler}
          >
            Upload your Image
          </button>
        </div>
      </div>
    </>
  );
}
