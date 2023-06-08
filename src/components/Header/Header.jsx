import React from "react";
import "./header.scss";
import logo from "../../assets/logo.png";
import { Avatar } from "antd";

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <img src={logo} alt="" />
        <h3>Linkedin Downloader</h3>
      </div>
      <div className="header-right">
        <Avatar
          className="avatar-component"
          shape="circle"
          size="large"
          icon={
            <>
              <a
                target="_blank"
                className="avatar-link-element"
                href="https://github.com/tusharsoni014"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/71227235?v=4"
                  alt=""
                />
              </a>
            </>
          }
        />
      </div>
    </div>
  );
}
