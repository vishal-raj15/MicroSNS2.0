// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jwt_decode from "jwt-decode";

// const refreshToken = async () => {
//   try {
//     const response = await axios.get("http://localhost:3001/api/users/token");
//     setToken(response.data.accessToken);
//     const decoded = jwt_decode(response.data.accessToken);
//     console.log(" frontend user details ", decoded);
//     setName(decoded.name);
//     setUserId(decoded.userId);
//     setUsername(decoded.username);

//     setExpire(decoded.exp);
//     console.log(username);
//     console.log(" this is my token ", token);
//   } catch (error) {
//     if (error.response) {
//       history.push("/");
//     }
//   }
// };

// const axiosJWT = axios.create();

// axiosJWT.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     if (expire * 1000 < currentDate.getTime()) {
//       const response = await axios.get(
//         "http://localhost:3001/api/users/token"
//       );
//       console.log(" this interceptor has been trigerred ");
//       config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//       setToken(response.data.accessToken);
//       const decoded = jwt_decode(response.data.accessToken);
//       setName(decoded.name);
//       setUserId(decoded.userId);
//       setExpire(decoded.exp);
//       setUsername(decoded.username);
//       setTest(decoded.username);
//     }

//     // setMe({ userId: userId });
//     // setMe((curr) => [...curr, { token: token }]);
//     // setMe((curr) => [...curr, { username: username }]);
//     // setMe((curr) => [...curr, { name: name }]);
//     // setMe((curr) => [...curr, { username: username }]);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
