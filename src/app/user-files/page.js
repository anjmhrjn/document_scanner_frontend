"use client";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";

import ProtectedRoute from "../../components/ProtectedRoute";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  // backgroundColor: "#fafafa",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function Dashboard() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-xl font-bold">Protected Dashboard</h1>
        <div {...getRootProps({ style, className: "p-8 cursor-pointer bg-blue-50" })}>
          <input {...getInputProps()} />
          <p>
            <MdOutlineCloudUpload className="text-blue-500" size={64} />
          </p>
          <p className="font-bold">
            Drop your files here, or{" "}
            <span className="text-blue-500">Browse</span>
          </p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    </ProtectedRoute>
  );
}
