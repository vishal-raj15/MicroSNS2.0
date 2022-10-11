import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import "./Feed.css";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import { useRecoilState } from "recoil";
import { modalState, tokenState } from "../../atom/modalAtom";

const Feed = () => {
  const [test, setTest] = useRecoilState(modalState);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useRecoilState(tokenState);
  const [expire, setExpire] = useState("");

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    refreshToken();
    //getUsers();
    getPosts();
  }, []);

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
      console.log(" this is my token ", token);
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
        console.log(" this interceptor has been trigerred ");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setExpire(decoded.exp);
        setUsername(decoded.username);
        setTest(decoded.username);
      }

      // setMe({ userId: userId });
      // setMe((curr) => [...curr, { token: token }]);
      // setMe((curr) => [...curr, { username: username }]);
      // setMe((curr) => [...curr, { name: name }]);
      // setMe((curr) => [...curr, { username: username }]);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:3001/api/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check token ", token);

    setUsers(response.data);
    console.log("they are the users ", response.data);
  };

  const getPosts = async () => {
    const response = await axiosJWT.get(
      "http://localhost:3001/api/users/getPosts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    setPosts(data.data);

    console.log("they are the posts ", data.data);
  };

  const logout = async () => {
    const response = await axios.get("http://localhost:3001/api/users/logout");

    // const response = await axiosJWT.get(
    //   "http://localhost:3001/api/users/logout",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    if (response) console.log(" logged out ");
    else console.log(" error ");
    history.push("/");
  };

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

  return (
    <div className="feed">
      <div className="feed__header">
        <h1>Feed</h1>
      </div>

      {/* Tweetbox */}

      <TweetBox />

      <div>
        {Array.from(posts).map((val, key) => {
          return (
            <Post
              id={val.id}
              userId={val.userId}
              text={val.text}
              media={val.media}
              likes={val.likesCount}
              createdAt={val.createdAt}
              commentsCount={val.commentsCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiJzYWl0YW1hIiwidXNlcm5hbWUiOiJvbmVQdW5jaCIsImVtYWlsIjoib25lQG9uZS5jb20iLCJpYXQiOjE2NjQ1MjMzNDMsImV4cCI6MTY2NDYwOTc0M30.EiNj2XZY_BsB7V1gQHDg7X4ok4iDkFqRiiUwmHgKiIY
