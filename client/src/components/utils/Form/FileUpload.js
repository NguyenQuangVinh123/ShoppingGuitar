import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
const FileUpload = (props) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();
 
  const activeStyle = {
    borderColor: "#2196f3",
  };
  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const [upload, setUpload] = useState({
    uploading: false,
    uploadFiles: [],
  });
  const [reset,setReset] = useState(props.reset)
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUpload((preState) => ({
        ...preState,
        uploading: true,
      }));
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", acceptedFiles[0]);

      axios.post("/api/users/uploadimage", formData, config).then((res) => {
        setUpload((preState) => ({
          ...preState,
          uploading: false,
          uploadFiles: [...upload.uploadFiles, res.data],
        }));
      });
    }
  }, [acceptedFiles]);
 useEffect(() =>{
    props.imagesHandler(upload.uploadFiles);
    
 },[upload.uploadFiles])
//  if(props.reset){
//     resetTest()
//  }
//  const resetTest = async() =>{
//       await setUpload((preState) => ({
//           ...preState,
//           uploadFiles: [],
//       }));
//  }
useEffect(() => {
  console.log(reset)
  setUpload((preState) => ({
              ...preState,
              uploadFiles: [],
           }));
},[reset])
console.log(upload)

  const onpointermove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then((res) => {
      let images = upload.uploadFiles.filter((item) => {
        return item.public_id !== id;
      });
      setUpload((preState) => ({
            ...preState,
            uploadFiles: images,
          })
      );
    });
  };
 
  const showUploadImages = () => {

    if(upload.uploadFiles !== undefined){
      return upload.uploadFiles.map((item) => (
        <div
          className="dropzone_box"
          key={item.public_id}
          onClick={() => onpointermove(item.public_id)}
        >
          <div
            className="wrap"
            style={{ background: `url(${item.url}) no-repeat` }}
          ></div>
        </div>
      ));
    }
  };
  return (
    <div>
      <section>
        <div className="dropzone clear">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
           
          {upload.uploading ? (
            <div
              className="dropzone_box"
              style={{ textAlign: "center", paddingTop: "60px" }}
            >
              <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
            </div>
          ) : null}

          </div>
          {showUploadImages()}
       
        </div>
      </section>
    </div>
  );
};

export default FileUpload;
