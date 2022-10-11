import React, { useState, useEffect } from "react";

import { useHistory, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCardSubtitle,
} from "@coreui/react";

const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [usercomment, setUsercomment] = useState([]);
  const [f, setF] = useState(0);

  const history = useHistory();

  useEffect(() => {
    refreshToken();
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

  const addComment = async (e) => {
    e.preventDefault();

    console.log("----------------------------------------------", comment);
    try {
      const auth = await axiosJWT.post(
        "http://localhost:3001/api/users/comment/add",
        {
          userId: userId,
          tweetId: props.pid,
          text: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push("/dashboard");
      console.log(" comment added   -------------------------");
      return auth;
    } catch (error) {
      console.log(error, "   -------------------------");

      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const getComments = async () => {
    const res = await axiosJWT.get(
      "http://localhost:3001/api/users/post/comment",
      {
        params: {
          tweetId: props.pid,
        },
      }
    );
    console.log(" comments ", res);
    setUsercomment(res.data.comments);
    console.log(" user comment ", res.data.comments);
    setF(1);
  };

  const deleteComment = async (cid, uid) => {
    console.log(" trying to delete c");
    if (String(userId) === String(uid)) {
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/users/comment/${cid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
              id: cid,
            },
          }
        );
        console.log(" succesfully deleted ");
        return res;
      } catch (error) {
        console.log(" ------------------", error);
      }
    } else {
      console.log(" unauthorized access ");
      alert(" unauthorized ");
    }
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <label>
          Add comment :
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <> comments : {usercomment.length}</>
      <button onClick={getComments}> show comments</button>
      {f ? (
        <>
          {Array.from(usercomment).map((val, key) => {
            return (
              <CCard className="w-75">
                <CCardBody>
                  <CCardTitle>{val.username}</CCardTitle>
                  <CCardText>{val["comments.text"]}</CCardText>
                </CCardBody>
                <CCardSubtitle
                  className="mb-2 text-medium-emphasis"
                  onClick={() =>
                    deleteComment(val["comments.id"], val["comments.userId"])
                  }
                >
                  delete
                </CCardSubtitle>
                <footer className="blockquote-footer">
                  {val["comments.createdAt"]}
                </footer>
              </CCard>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;

{
  /* <CCard className="w-75">
    <CCardBody>
      <CCardTitle>Card title</CCardTitle>
      <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
      <CButton href="#">Go somewhere</CButton>
    </CCardBody>
  </CCard> */
}
