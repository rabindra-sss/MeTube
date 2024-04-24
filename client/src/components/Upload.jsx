import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  background-color: #000000ad;
  width: 100%;
  height: 100%;
  z-index: 500;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  

  background-color: ${({theme})=>theme.bgLighter};
  color: ${({theme})=>theme.text};

  width: 600px;
  height: 600px;

  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: start;
  position: relative;
`;

const Close= styled.div`
  top: 10px;
  right: 10px;
  position: absolute;
  cursor: pointer;
`
const Title = styled.h1`
  text-align: center;
`
const Input = styled.input`
 background-color: transparent;
 border: 1px solid ${({theme})=>theme.soft};
 border-radius: 3px;
 padding: 10px;
 color: ${({theme})=>theme.text};
`
const Desc = styled.textarea`
 background-color: transparent;
 border: 1px solid ${({theme})=>theme.soft};
 border-radius: 3px;
 padding: 10px;
 color: ${({theme})=>theme.text};
`
const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({theme})=>theme.soft};
  color: ${({theme})=>theme.text};
  border: none;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`
const Label= styled.label`
  font-size: 14px;
`
export default function Upload({setOpen}) {
  const [img, setImg] = useState(null);
  const [video, setVideo]= useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc]= useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [duration, setDuration] = useState(0);
  const [timestr, settimestr] = useState(null);

  const [videoData, setVideoData] = useState({});

  const navigate= useNavigate();

  const handleTags= (e)=>{
    const string= e.target.value;

    const tags= string.split(',');
    setTags(tags);
    setVideoData((prev)=>{
      return {...prev,"tags":tags}
    })

  }

  const handleChange= (e)=>{
    setVideoData((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  // Method 1: get duration of a video :  fast 
  const loadVideo = file => new Promise((resolve, reject) => {
    try {
        let video = document.createElement('video')
        video.preload = 'metadata'

        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);
            resolve(video.duration)
        }

        video.onerror = function () {
            reject("Invalid video. Please select a video file.")
        }
        if(file)
        video.src = window.URL.createObjectURL(file)
    } catch (e) {
        reject(e) 
    }
  })
  const getDuration = async(file)=>{
    const duration = await loadVideo(file)
    setDuration(duration);
    //console.log(duration);
  }

  // Method2: get duration of a video
const getVideoDuration = file =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const media = new Audio(reader.result);
    media.onloadedmetadata = () => resolve(media.duration);
  }; 
  if(file)
  reader.readAsDataURL(file);
  reader.onerror = error => reject(error);
});
  


//   var f_duration =0; //store duration
// document.getElementById('audio').addEventListener('canplaythrough', function(e){
//  //add duration in the input field #f_du
//  f_duration = Math.round(e.currentTarget.duration);
//  document.getElementById('f_du').value = f_duration;
//  URL.revokeObjectURL(obUrl);
// });

// //when select a file, create an ObjectURL with the file and add it in the #audio element
// var obUrl;
// document.getElementById('fup').addEventListener('change', function(e){
//  var file = e.currentTarget.files[0];
//  //check file extension for audio/video type
//  if(file.name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
//  obUrl = URL.createObjectURL(file);
//  document.getElementById('audio').setAttribute('src', obUrl);
//  }
// });


  const fileUpload= (file, urlType)=>{
    
    const storage = getStorage();
    const filename= new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      urlType==='thumbnail' ? setImgPerc(Math.round(progress)): setVideoPerc(Math.round(progress));
      switch (snapshot.state) {
        case 'paused':
          //console.log('Upload is paused');
          break;
        case 'running':
          //console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    // () => {
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoData((prev)=>{
                return {...prev, [urlType]:downloadURL}
              })
              setVideoURL(downloadURL)
        });
        
       
      }
    );

  }

  useEffect(()=>{ 
    // video && fileUpload(video, "videoURL");
    const setdurationtime = async()=>{
      
      const duration1 = await loadVideo(video)
      setDuration(duration1);

    function formatTime(seconds) {
      return [
          parseInt(seconds / 60 / 60),
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
      ]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1")
  }
     settimestr(formatTime(duration1));
    }
    setdurationtime();
  },[video]);
    
  useEffect(()=>{img && fileUpload(img, "thumbnail")},[img]);


  const handleUpload = async (e)=>{
    e.preventDefault();

    video && await fileUpload(video, "videoURL");
    videoData.duration= duration;
    
    //console.log(videoData);
    
    if(videoURL) 
    {
      //console.log('hi')
      const res= await axios.post('http://localhost:8800/api/video/create', videoData )

    setOpen(false);
    
    setVideo(null);
    setVideoURL(null);
    res.status===200 && navigate(`/video/${res.data.video._id}`)}
    
  }
  //console.log(videoData)
  return (
    <Container>
        <Wrapper>
           <Close onClick={()=>setOpen(false)}>X</Close>
           <Title> Upload a new video</Title>

           <Label>Video: {(duration!==0) && timestr}</Label>

          { videoPerc>0 ? ("Uploading: "+ videoPerc+ '%') : <Input id="my-video" type='file' accept='video/*' onChange={(e)=>setVideo(e.target.files[0])}></Input>}
           <Input type='text'placeholder='Title' name= 'title' onChange={handleChange}></Input>
           <Desc type='text' placeholder='Description' rows={8} name= 'description' onChange={handleChange}></Desc>
           <Input type='text' placeholder='Separate the tags with commas' name= 'tags' onChange={handleTags}></Input>

           <Label>Thumbnail:</Label>
           { imgPerc>0 ? ("Uploading: "+ imgPerc+'%') :
            <Input type='file' accept='image/*' onChange={(e)=>{setImg(null); setImg(e.target.files[0])}}></Input>}

           <Button onClick={handleUpload}>Upload</Button>
           {/* <Desc></Desc>
           <Video></Video> */}
        </Wrapper>
    </Container>
  )
}
