import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from '@material-ui/core/CircularProgress'
const FileUpload = (props) => {
  const { acceptedFiles, getRootProps, getInputProps ,isDragActive,isDragAccept,isDragReject } = useDropzone();

  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);  
  const [upload,setUpload] = useState({
      uploading : false,
      uploadFiles : [],
  });
  useEffect(() => {
        if(acceptedFiles.length > 0){
            setUpload((preState) => ({
                ...preState,
                uploading : true
            }))
            let formData  = new FormData();
            const config = {
                header : {'content-type' : 'nultipart/form-data'}
            }
            formData.append("file",acceptedFiles[0]);

            axios.post('/api/users/uploadimage',formData,config)
                .then(res => {
                    console.log(res.data)
                    setUpload((preState) => ({
                        ...preState,
                        uploading : false,
                        uploadFiles : [...upload.uploadFiles,res.data]
                    },()=>{
                        props.imageHandler(upload.uploadFiles)
                    }))
                })
        }
  },[acceptedFiles])
  const onpointermove = (id) => {

  }
  const showUploadImages = () => {
        upload.uploadFiles.map(item => (
            <div className='dropzone_box' key={item.public_id} onClick={() => onpointermove(item.public_id)}>
                    <div className="wrap">
                    <CircularProgress  style={{color:'#00bcd4'}} thickness={7} />

                    </div>
            </div>
        ))
  }
  return (
    <section>
        <div className="dropzone clear">
            <div {...getRootProps({ style })}>
            
                <input {...getInputProps()} />
                <div className='wrap'>
                <FontAwesomeIcon icon={faPlusCircle} />

                </div>
            </div>
            {
            upload.uploading ? 
            <div className='dropzone_box' style= {{ textAlign : "center",paddingTop : "60px"}}>
                <CircularProgress  style={{color:'#00bcd4'}} thickness={7} />
            </div>
            : null
        }
      </div>
      
        {showUploadImages()}
        
    </section>
  );
};

export default FileUpload;
