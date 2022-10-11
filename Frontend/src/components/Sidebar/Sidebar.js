import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PolymerIcon from "@material-ui/icons/Polymer";
import { Button } from "@material-ui/core";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import { useHistory } from "react-router-dom";

import axios from "axios";

const Sidebar = () => {
  const [test, setTest] = useRecoilState(modalState);
  const history = useHistory();

  const signOut = async () => {
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

  return (
    <div className="sidebar">
      <PolymerIcon className="sidebar__twitterIcon" />

      <SidebarOption active text="Home" Icon={HomeIcon} />
      <SidebarOption text="Explore" Icon={SearchIcon} />
      <SidebarOption text="Notification" Icon={NotificationsNoneIcon} />
      {/* <SidebarOption text="follow" Icon={PersonAddOutlinedIcon} /> */}
      <SidebarOption text="messages" Icon={MailOutlineIcon} />
      {/* <SidebarOption text={test} Icon={PermIdentityIcon} /> */}
      {/* <p> lets see : {test}</p> */}

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        @ {test}
      </Button>

      <Button
        variant="outlined"
        className="sidebar__tweet2"
        fullWidth
        onClick={signOut}
      >
        signOut
      </Button>
    </div>
  );
};

export default Sidebar;
