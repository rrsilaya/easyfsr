import React, { Component } from 'react';
import { Icon, Upload } from 'antd';

class ProfileIcon extends Component {
  render() {
    const props = {
      name: 'profileIcon',
    };

    return (
      <div className="profileIcon">
        <Upload {...props} className="overlay">
          <Icon
            type="upload"
            className="set-cursor pointer"
            style={{ fontSize: 24 }}
          />
        </Upload>
        <img src="http://lorempixel.com/400/200/sports" alt="" />
      </div>
    );
  }
}

export default ProfileIcon;
