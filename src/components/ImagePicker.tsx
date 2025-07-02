"use client";
import { useRef, useState } from "react";
import { Strings } from "./types";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";

export default function ImagePicker({ label, name }: Strings) {
  const [pickImage, setPickImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const buttonHandler = () => {
    imageInput.current?.click();
  };

  const imageHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPickImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <label htmlFor={name}>{label}</label>
        {/* the label is clickable, i will comment it out first */}
        {/* <span>{label}</span> */}
        <div className="flex items-center gap-4">
          <input
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
            onChange={imageHandlerChange}
            hidden
            required
          />

          <div className="relative flex flex-col justify-center items-center text-sm/tight aspect-square border shadow-md rounded-md w-32 overflow-hidden text-center">
            {!pickImage && <p className="p-4">Please pick an image.</p>}
            {pickImage && (
              <Image
                src={pickImage}
                alt="User Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
          </div>

          {/*Need to use client, since your visitor need to upload photo from
          their side*/}
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 w-1/3 bg-green-700 text-white border-2 text-md rounded-full focus:border-amber-400 focus:border-2 hover:cursor-pointer hover:bg-green-800"
            type="button"
            onClick={buttonHandler}
          >
            <MdOutlineFileUpload className="text-xl" /> Upload your Image
          </button>
        </div>
      </div>
    </>
  );
}
