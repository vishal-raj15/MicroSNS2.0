import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageIcon from "@material-ui/icons/Image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

function ComposeForm() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const history = useHistory();

  useEffect(() => {
    refreshToken();
    // upload();
    //getUsers();
  });

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      console.log(" frontend user details ", decoded);
      setName(decoded.name);
      setUserId(decoded.userId);
      setUsername(decoded.username);

      setExpire(decoded.exp);
      console.log(username);
      console.log(" this is my toke ", token);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoidGVzdDEiLCJ1c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlJanA3SW1sa0lqb3hMQ0p1WVcxbElqb2lkR1Z6ZERFaUxDSjFjMlZ5Ym1GdFpTSTZJblJsYzNReElpd2laVzFoYVd3aU9pSjBaWE4wTVVCbmJXRnBiQzVqYjIwaUxDSnlaV1p5WlhOb1ZHOXJaVzRpT2lKbGVVcG9Za2RqYVU5cFNrbFZla2t4VG1sSmMwbHVValZqUTBrMlNXdHdXRlpEU2prdVpYbEtNV015Vm5sSmFuQTNTVzFzYTBscWIzaE1RMHAxV1ZjeGJFbHFiMmxrUjFaNlpFUkZhVXhEU2pGak1sWjVZbTFHZEZwVFNUWkpibEpzWXpOUmVFbHBkMmxhVnpGb1lWZDNhVTlwU2pCYVdFNHdUVlZDYm1KWFJuQmlRelZxWWpJd2FVeERTbmxhVjFwNVdsaE9iMVpIT1hKYVZ6UnBUMjAxTVdKSGQzTkpiVTU1V2xkR01GcFhVa0prUTBrMlNXcEpkMDFxU1hSTlJHdDBUVlJzVlUxVVFUWk5SR2MyVFhwWmRVMUVRWGRYYVVselNXNVdkMXBIUmpCYVYxSkNaRU5KTmtscVNYZE5ha2wwVFVScmRFMVViRlZOVkVFMlRVUm5OazE2V1hWTlJFRjNWMmxLT1V4RFNuQlpXRkZwVDJwRk1rNXFUVEZQUkVsNVQwUlJjMGx0VmpSalEwazJUVlJaTWsxNldUSlBSRmswVGtnd0xsQXhXVzUxZHpOWlRtaEpWM290TlhCRFluTkZWbE5SWjNVM05tdDBMWFYyV2kxSmFVRTBNVFpNYURRaUxDSmpjbVZoZEdWa1FYUWlPaUl5TURJeUxUQTVMVEU1VkRFd09qQTRPak0yTGpBd01Gb2lMQ0oxY0dSaGRHVmtRWFFpT2lJeU1ESXlMVEE1TFRFNVZERXdPakV4T2pJMExqQXdNRm9pZlN3aWFXRjBJam94TmpZek5qVXhPVEUzTENKbGVIQWlPakUyTmpNM016Z3pNVGQ5LkVwYzkzRndPelFtQTJoRTZDeGhkbmtlOTI3OUpOVE9IcldFTTZSMDhuWWciLCJjcmVhdGVkQXQiOiIyMDIyLTA5LTE5VDEwOjA4OjM2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA5LTIwVDA1OjMxOjU3LjAwMFoifSwiaWF0IjoxNjYzNzMzOTAwLCJleHAiOjE2NjM4MjAzMDB9.g-n94KQJ5DWEMN1cpILUZCln6r5hTYeFgWasYPD94DY

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:3001/api/users/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const upload = async () => {
    const formData = new FormData();
    // const instance = Axios.create();
    formData.append("file", image[0]);
    formData.append("api_key", "261389389232866");
    formData.append("upload_preset", "lcwx1gzu");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    const cloudname = "dnt0lylln";
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;

    // await fetch(url, {
    //   method: "post",
    //   body: formData,
    // })
    //   .then((response) => {
    //     //let s =  response.json();
    //     console.log(s.json());
    //     // console.log(response.public_id);
    //     return response.json();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      if (response) {
        let s = await response.json();
        console.log(s.secure_url);
        const res = await axiosJWT.post(
          "http://localhost:3001/api/users/post",
          {
            text: description,
            media: s.secure_url,
            userId: userId,
            likesCount: likesCount,
            commentsCount: commentsCount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("check token ", token);
        return res;

        // const res = await axios.post(
        //   "http://localhost:3001/api/users/post",
        //   {
        //     text: description,
        //     media: s.secure_url,
        //     userId: props.userId,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${props.token}`,
        //     },
        //   }
        // );
        // if (res) {
        //   console.log(" image uploaded ");
        //   console.log(res);
        // } else console.log(" error ");

        //return response.json();
      }
    } catch (error) {
      console.log(error);
    }

    // Axios.post(
    //   `https://api.cloudinary.com/v1_1/pedro-machado-inc/image/upload`,
    //   formData
    // ).then((response) => {
    //   const fileName = response.data.public_id;

    //   Axios.post("http://localhost:3001/upload", {
    //     title: title,
    //     description: description,
    //     image: fileName,
    //     author: localStorage.getItem("username"),
    //   }).then(() => {
    //     history.push("/");
    //   });
    // });
    // return Axios.post(
    //   "https://api.cloudinary.com/v1_1/dnt0lylln/image/upload",
    //   formData,
    //   {
    //     headers: {
    //       mode: "no-cors",
    //       "Access-Control-Allow-Origin": "http://localhost:3000",
    //       credentials: "include",
    //     },
    //   }
    // ).then((response) => {
    //   const data = response.data;
    //   const fileURL = data.secure_url; // You should store this URL for future references in your app
    //   console.log(
    //     "------------------------------------------------------------"
    //   );

    //   console.log(data);
    //   console.log(fileURL);
    // });
  };

  return (
    <form className="compose-form">
      <div className="compose-form-container">
        {/* <Avatar /> */}
        <textarea
          className="compose-form-textarea"
          placeholder="What's happening?"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div className="compose-buttons">
        <Button className="compose-image-submit" component="label">
          <ImageIcon className="img" />
          <input
            type="file"
            hidden
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files)}
          />
        </Button>
        <Button className="compose-form-submit" onClick={upload}>
          Share
        </Button>
      </div>
    </form>
  );
}

export default ComposeForm;
