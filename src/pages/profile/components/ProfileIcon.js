import React, { Component } from 'react';
import { Icon, Upload } from 'antd';

class ProfileIcon extends Component {
  handleUpload = e => {
    const data = new FormData();
    data.append('profileIcon', e.file.originFileObj);
    this.props.uploadIcon(this.props.user, data);
  };

  render() {
    const props = {
      name: 'profileIcon',
      showUploadList: false,
    };

    const { isUploadingIcon, user } = this.props;

    return (
      <div className="profileIcon">
        {this.props.showUploadIcon ? (
          <Upload {...props} className="overlay" onChange={this.handleUpload}>
            <Icon
              type="upload"
              className="set-cursor pointer"
              style={{ fontSize: 24 }}
            />
          </Upload>
        ) : null}
        <img src={user.profileIcon} alt="" />
      </div>
    );
  }
}

export default ProfileIcon;
