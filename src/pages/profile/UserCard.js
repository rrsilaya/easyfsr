import React from 'react';
import { Icon, Card, Row, Col, Button, Avatar } from 'antd';
const { Meta } = Card;
const userData = 'Insert Table Here';

class UserCard extends React.Component {
  render() {
    const content = {};
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          actions={[
            <Icon type="edit">Edit</Icon>,
            <Icon type="exclamation">Alert</Icon>,
          ]}
          style={{ fontColor: 'black' }}
        >
          <Meta
            avatar={<Avatar size="large" icon="user" />}
            title={
              <h2 style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                Afable, Lorenz Matthew
              </h2>
            }
            description={
              <div>
                <h3>User Type: Admin</h3>
                <h3>Home Department: </h3>
                <br />
              </div>
            }
          />

          <Card
            style={{ marginBottom: 16 }}
            type="inner"
            title="I. Teaching Load in The College: "
          >
            {userData}
          </Card>

          <Card
            style={{ marginBottom: 16 }}
            type="inner"
            title="II. Research Proposal"
          >
            {userData}
          </Card>
        </Card>
      </div>
    );
  }
}

export default UserCard;
