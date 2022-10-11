import React from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        {/* <TwitterTweetEmbed tweetId={"858551177860055040"} /> */}
        <TwitterTweetEmbed tweetId={"1572693683048443907"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/crypto"}
          options={{ text: "#reactjs is awesome", via: "raj" }}
        />
      </div>
    </div>
  );
}

export default Widgets;

{
  /* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">1/ For the past ~6 months, contributors have been building the KZG Ceremony, a pre-req for protodanksharding / EIP-4844<br><br>Hopefully, in 2 weeks we&#39;ll be collecting a community contribution from the mainstage audience at <a href="https://twitter.com/EFDevcon?ref_src=twsrc%5Etfw">@EFDevcon</a>! 👀<br><br>↓ learn more ↓<a href="https://t.co/sERPinFPJj">https://t.co/sERPinFPJj</a></p>&mdash; trent.eth (@trent_vanepps) <a href="https://twitter.com/trent_vanepps/status/1573342059129229312?ref_src=twsrc%5Etfw">September 23, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
}

{
  /* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Join <a href="https://twitter.com/vdWijden?ref_src=twsrc%5Etfw">@vdWijden</a> <a href="https://twitter.com/barnabemonnot?ref_src=twsrc%5Etfw">@barnabemonnot</a> <a href="https://twitter.com/Infosecual?ref_src=twsrc%5Etfw">@Infosecual</a> <a href="https://twitter.com/Drigolvc?ref_src=twsrc%5Etfw">@drigolvc</a> and other technical experts to chat about the Merge Data Challenge *tomorrow* at 4pm UTC<a href="https://t.co/BUCVD8pXaA">https://t.co/BUCVD8pXaA</a></p>&mdash; dannyryan 🐼🔥 (@dannyryan) <a href="https://twitter.com/dannyryan/status/1572693683048443907?ref_src=twsrc%5Etfw">September 21, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
}
