import React, { useState, useCallback, useEffect } from "react";
import "./uploadFile.css";
import Button from "../Button/Button";
import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { Spinner } from "@chakra-ui/react";

interface ClassName {
  container?: string;
  uploadFile?: string;
}

interface UploadFileProps {
  disabled?: boolean;
  maxFiles?: number;
  accept?: { [key: string]: string[] };
  name?: string;
  id?: string;
  className?: ClassName;
  onSelection?: (data: any) => void;
  value?: any;
  isError?: any;
  showLoader?: boolean;
  setUploadData?:(data:any) =>void
}

const UploadFile: React.FC<UploadFileProps> = ({
  disabled,
  maxFiles = 1,
  accept = {
    "text/csv": [".csv"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },
  name,
  id,
  className = {
    container: "",
    uploadFile: "",
  },
  onSelection,
  value = [],
  showLoader,
  setUploadData,
  isError,
  ...props
}) => {
  const [myFiles, setMyFiles] = useState<any>(value);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = [...myFiles, ...acceptedFiles];
    setMyFiles(newFiles);
    if (onSelection) {
      onSelection(newFiles);
    }

  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: maxFiles > 1,
    maxFiles: maxFiles,
    accept: accept,
  });

  const removeFile = (file) => () => {
    setUploadData?.({
      partner: null,
      client: null,
      file: null,
      pldFields: [],
      carrier: 'any'
    })
    let updatedFiles = [];
    setMyFiles((prev) => {
      updatedFiles = prev?.filter(cur => cur?.path !== file?.path);
      return updatedFiles;
    });
    if (onSelection) {
      onSelection(updatedFiles);
    }
  };

  // const removeAll = () => {
  //   setMyFiles([]);
  // };

  const files = myFiles.map((file) => (
    <li key={file.path}>
      {/* {file.path} - {file.size} bytes{" "} */}
      <Button
        context="text"
        onClick={removeFile(file)}
        suffixIcon={<TrashIcon />}
      >
        {file.path}
      </Button>
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div
      className={clsx(
        "oui-upload-file",
        disabled && "oui-upload-file--disabled",
        className.container
      )}
      {...props}
    >
      <div className={clsx("oui-upload-file__rectangle", className.uploadFile)}>
        <div
          {...getRootProps({
            className: `oui-upload-file__dropzone ${isError ? "!border-red-500 bg-opacity-10" : ""} ${isDragAccept ? "oui-upload-file__dropzone--accept" : ""}${isDragReject ? "oui-upload-file__dropzone--reject" : ""}`,
          })}
        >
          <input {...getInputProps()} id={id} disabled={disabled} />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[6.25rem] w-[6.25rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          <label className="oui-upload-file__label" htmlFor={id}>
            Drag and drop your file
          </label>
          <span className="oui-upload-file__sub-label">or</span>
          <div className="oui-upload-file__action-container">
            <Button
              type="button"
              onClick={open}
              disabled={disabled}
              context="outlined"
            >
              Browse file
            </Button>
          </div>
        </div>
      </div>
      {showLoader ? <Spinner /> :<aside>
        {files.length > 0 && <ul>{files}</ul>}
        {fileRejectionItems.length > 0 && <ul>{fileRejectionItems}</ul>}
      </aside> }
    </div>
  );
};

export default UploadFile;
