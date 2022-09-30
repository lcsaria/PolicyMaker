import React from "react";
import Header from "./template/Header";
import Header_v2 from "./template/Header_v2";
import Sidebars from "./template/Sidebar";

function Home() {
  return (
    <div>
      <Header_v2 />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebars />
        </div>
        <div id="content">
          <div className="container mt-5">
            <h1>PolicyMaker</h1>
            <p className="mt-5" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum
              dolor sit amet consectetur adipiscing. Urna neque viverra justo
              nec ultrices. Nisl nunc mi ipsum faucibus vitae. Tortor at risus
              viverra adipiscing at in tellus integer. Laoreet id donec ultrices
              tincidunt arcu non. Vel fringilla est ullamcorper eget nulla
              facilisi. Integer quis auctor elit sed vulputate mi sit. Consequat
              mauris nunc congue nisi vitae suscipit tellus. Odio ut enim
              blandit volutpat maecenas volutpat. Eget nullam non nisi est sit.
              Odio morbi quis commodo odio. Fusce id velit ut tortor pretium
              viverra. Urna nec tincidunt praesent semper feugiat nibh sed
              pulvinar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
