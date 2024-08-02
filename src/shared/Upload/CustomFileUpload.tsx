"use client";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { HiMiniPhoto } from "react-icons/hi2";

const options = {
  accept: {
    "image/*": [".png", ".jpeg", ".jpg"],
  },
};

export default function CustomFileUpload({
  fileType = "image/*",
  selectedFile,
  initial,
  setSelectedFile,
}: {
  fileType?: string;
  selectedFile: File | null;
  initial?: string;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}) {
  const itemTemplate = () => {
    return selectedFile || initial ? (
      <div className="relative">
        <Image
          // \@ts-ignore
          src={
            initial || (selectedFile ? URL.createObjectURL(selectedFile) : "")
          }
          className={`object-cover rounded-lg h-[213px] max-h-full w-full max-w-full`}
          alt="Logo"
          width={0}
          height={0}
        />
        <div className="flex items-center gap-1 absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[var(--green-1)] bg-opacity-50">
          <HiMiniPhoto />
          <p className="">Change logo</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center text-center py-5 my-auto h-[213px]">
        <Image
          width={0}
          height={0}
          src="/svg/cloud.svg"
          alt="choose file"
          className="rounded-lg img-fluid !w-10 !h-10"
        />
        <p className="text-[var(--green-11)] md:w-[75%]">
          <p className="text-[var(--green-11)] text-bold">Click to upload</p> or
          drag and drop PNG, or JPG
        </p>
      </div>
    );
  };

  const onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = useCallback(
    (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
    [setSelectedFile]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop, ...options });

  return (
    <div className="flex flex-col gap-5">
      <div
        {...getRootProps()}
        className={`h-[213px] border border-[var(--green-1)] rounded-lg flex flex-col  w-full cursor-pointer`}
      >
        <input {...getInputProps()} accept={fileType} />

        {itemTemplate()}
      </div>
    </div>
  );
}
