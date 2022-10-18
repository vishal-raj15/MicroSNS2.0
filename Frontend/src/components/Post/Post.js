import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import "./Post.scss";
import { Avatar, Button, TextField } from "@material-ui/core";
import im from "./im.jpg";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { Alert, AlertTitle } from "@mui/material";
import { SettingsEthernet } from "@material-ui/icons";
import { tokenState, userIdState } from "../../atom/modalAtom";
import Moment from "react-moment";
import { useRecoilState } from "recoil";

const Post = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useRecoilState(userIdState);
  const [token, setToken] = useRecoilState(tokenState);
  const [expire, setExpire] = useState("");

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [totalcomment, setTotalComment] = useState("");
  const [f, setF] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showLike, setShowLike] = useState(false);
  const [postusername, setPostusername] = useState("");
  const [postname, setPostname] = useState("");
  const [likeCounter, setLikeCounter] = useState(props.likes);

  const date = props.createdAt;
  const history = useHistory();

  useEffect(() => {
    //refreshToken();
    getUsername(props.userId);
    //getComments();
    iLiked(props.id);
    //getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/token`
      );
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
  const axiosJWT = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:3001/api/users/token"
        );
        console.log(" this interceptor has been trigerred ");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setExpire(decoded.exp);
        //setLikeCounter(props.likes);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const deleteTweet = async (uid, pid) => {
    const decoded = jwt_decode(token);
    console.log("decoded ", decoded);
    console.log(" uid ", uid);
    console.log(" pid ", pid);

    if (String(decoded.userId) === String(uid)) {
      console.log(" let's see ");
      const response = await axios.delete(
        `http://localhost:3001/api/users/post/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: pid,
          },
        }
      );

      return response;
    } else {
      console.log(" unauthorized access ");
      alert(" unauthorized ");
    }
  };

  // const iLiked = async (pid) => {
  //   console.log(pid, userId);
  //   const response = await axiosJWT.get(
  //     `http://localhost:3001/api/users/iLiked/${pid}/${userId}`
  //   );

  //   console.log(" what ", response);

  //   return response;
  // };

  const likeTweet = async (pid) => {
    console.log(" liking tweet ,,,,,,,,,");
    const decoded = jwt_decode(token);
    const uid = decoded.userId;
    const data = { userId: uid, tweetId: pid };
    console.log(" like data ", data);

    if (showLike) {
      setShowLike(false);

      console.log(" likes count ", likeCounter);
      return axiosJWT
        .post(
          "http://localhost:3001/api/users/unlike",
          {
            userId: parseInt(uid),
            tweetId: pid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then((resp) => resp.data)
        .catch((error) => {
          console.log(error);
          alert(" what !!!!!");
        });
    } else {
      setShowLike(true);

      return axiosJWT
        .post(
          "http://localhost:3001/api/users/likeTweet",
          {
            userId: parseInt(uid),
            tweetId: pid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => resp.data)
        .catch((error) => {
          console.log(error);
          alert("You already liked this post!");
        });
    }
  };

  const iLiked = async (pid) => {
    const decoded = jwt_decode(token);
    const uid = decoded.userId;
    console.log(" checking it...");

    const resp = await axios.post("http://localhost:3001/api/users/iLiked", {
      userId: parseInt(uid),
      tweetId: pid,
    });

    if (resp.data.data != null) {
      console.log(" liked ok ", pid);
      console.log(resp.data);
      setShowLike(true);
    } else {
      console.log(" liked not ", pid);
      console.log(resp.data);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    console.log("----------------------------------------------", comment);
    try {
      const auth = await axiosJWT.post(
        "http://localhost:3001/api/users/comment/add",
        {
          userId: parseInt(userId),
          tweetId: props.id,
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

      // <Alert severity="success">
      //   <AlertTitle>Success</AlertTitle>
      //   This is a success alert — <strong>check it out!</strong>
      // </Alert>;

      alert(" Comment submitted ");

      console.log(" comment added   -------------------------");

      return auth;
    } catch (error) {
      console.log(error, "   -------------------------");

      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getComments = async () => {
    if (!f) {
      const res = await axiosJWT.get(
        "http://localhost:3001/api/users/post/comment",
        {
          params: {
            tweetId: props.id,
          },
        }
      );
      console.log(" comments ", res);
      setTotalComment(res.data.comments);
      setF(true);
      console.log(" user comment ", res.data.comments);
    } else {
      setF(false);
    }
  };

  // good way to fetch any id's info with get request
  const getUsername = async (id) => {
    console.log(" getting the info for ", id);

    try {
      const userinfo = await axios.get(
        `http://localhost:3001/api/users/getuser/${id}`,
        {
          params: {
            id: id,
          },
        }
      );
      console.log("userinfo ", userinfo);
      setPostusername(userinfo.data.username);
      setPostname(userinfo.data.name);

      return userinfo;
    } catch (error) {
      console.log(" eror for the user", error);
    }
  };

  const deleteComment = async (cid, uid, pid) => {
    console.log(" trying to delete c");
    if (String(userId) === String(uid)) {
      try {
        const res = await axiosJWT.post(
          `http://localhost:3001/api/users/comment`,
          {
            id: cid,
            tweetId: pid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(" succesfully deleted ");
        alert(" succesfully deleted ");

        return res;
      } catch (error) {
        console.log(" ------------------", error);
      }
    } else {
      console.log(" unauthorized access ");
      alert(" unauthorized ");
    }
  };

  // const getUsername = async () => {};

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar />
      </div>
      {/* <button
        onClick={() => {
          getUsername(props.userId);
        }}
      >
        {" "}
        check
      </button> */}
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h2>
              {postname}{" "}
              <span className="post__headerSpecial">@ {postusername}</span>
            </h2>
            <p1>
              <Moment fromNow>{date}</Moment>
            </p1>
          </div>
          <div className="post__headerDescription">
            <p>{props.text}</p>
          </div>
        </div>

        <img src={props.media} alt="" />

        <div className="compose-form-container">
          {/* {/* <Avatar /> */}
          <input
            className="compose-form-textarea"
            placeholder="what do you think ?"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <AddBoxRoundedIcon
            className="compose-form-textarea"
            onClick={addComment}
          />
        </div>

        {/* <div className="post_info">0 likes 0 comments </div> */}

        <div className="post__footer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <ChatBubbleOutlineIcon
              id="commentbox"
              fontSize="small"
              // style={{ color: "rgb(176, 174, 174)" }}
              onClick={getComments}
            />
            <p style={{ color: "rgb(176, 174, 174)" }}>
              {" "}
              {props.commentsCount}
            </p>
          </div>

          {/* this styling works here like with counter but not through className with same code */}
          {/* rgb(240, 46, 124) */}
          {showLike ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                id="like"
                fontSize="small"
                style={{ color: "rgb(240, 46, 124)" }}
                onClick={() => {
                  setLikeCounter(likeCounter + 1);

                  likeTweet(props.id);
                }}
              />
              <p style={{ color: "rgb(240, 46, 124)" }}> {likeCounter}</p>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  id="like"
                  fontSize="small"
                  style={{ color: "rgb(176, 174, 174)" }}
                  onClick={() => {
                    setLikeCounter(likeCounter - 1);
                    likeTweet(props.id);
                  }}
                />
                <p style={{ color: "rgb(176, 174, 174)" }}> {likeCounter}</p>
              </div>
            </>
          )}

          <RepeatIcon
            id="repeat"
            fontSize="small"
            // style={{ color: "rgb(176, 174, 174)" }}
            onClick={() => {}}
          />
          <DeleteIcon
            id="delete"
            fontSize="small"
            // style={{ color: "rgb(176, 174, 174)" }}
            onClick={() => {
              deleteTweet(props.userId, props.id);
            }}
          />
        </div>

        <div>
          {f && (
            <>
              {Array.from(totalcomment).map((val, key) => {
                return (
                  <>
                    {/* <Postcomment
                      username={val.username}
                      text={val["comments.text"]}
                      tx={val["comments.createdAt"]}
                      cid={val["comments.id"]}
                      uid={val["comments.userId"]}
                    /> */}
                    <div className="comment">
                      <div className="info">
                        <h2 className="comment-header">@ {val.username} </h2>
                        <p1>
                          <Moment fromNow>{val["comments.createdAt"]}</Moment>
                        </p1>
                      </div>
                      <p1 className="comment-body">
                        -- {val["comments.text"]}
                      </p1>

                      <p className="comment-footer">
                        <a
                          href="#"
                          className="comment-footer-delete"
                          onClick={() =>
                            deleteComment(
                              val["comments.id"],
                              val["comments.userId"],
                              props.id
                            )
                          }
                        >
                          Delete
                        </a>
                      </p>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// const Postcomment = (props) => {
//   const [token, setToken] = useRecoilState(tokenState);
//   const [userId, setUserId] = useRecoilState(userIdState);

//   const deleteComment = async (cid, uid) => {
//     console.log(" trying to delete c");
//     if (String(userId) === String(uid)) {
//       try {
//         const res = await axios.delete(
//           `http://localhost:3001/api/users/comment/${cid}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             data: {
//               id: cid,
//             },
//           }
//         );
//         console.log(" succesfully deleted ");
//         alert(" succesfully deleted ");

//         return res;
//       } catch (error) {
//         console.log(" ------------------", error);
//       }
//     } else {
//       console.log(" unauthorized access ");
//       alert(" unauthorized ");
//     }
//   };

//   return (
//     <div className="comment">
//       <div className="info">
//         <h2 className="comment-header">@ {props.username} </h2>
//         <p1>
//           <Moment fromNow>{props.tx}</Moment>
//         </p1>
//       </div>
//       <p1 className="comment-body">-- {props.text}</p1>

//       <p className="comment-footer">
//         <a
//           href="#"
//           className="comment-footer-delete"
//           onClick={() => deleteComment(props.cid, props.uid)}
//         >
//           Delete
//         </a>
//       </p>
//     </div>
//   );
// };

export default Post;
