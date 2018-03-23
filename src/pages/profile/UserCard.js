import React from 'react';
import { Tag, Icon, Card, Row, Col, Button, Avatar } from 'antd';
const { Meta } = Card;
const userData = 'Insert Table Here';

class UserCard extends React.Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    return (
      <div>
        <div className="header" style={{ padding: '30px' }}>
          <Row type="flex" justify="center" style={{ marginBottom: '15px' }}>
            <Avatar
              shape="square"
              icon="user"
              size="large"
              style={{ width: '128px', height: '128px', borderRadius: '50%' }}
            />
          </Row>
          <Row type="flex" justify="center" style={{ marginBottom: '15px' }}>
            <h2 style={{ color: 'white', fontSize: '40px' }}>
              Afable, Lorenz Matthew
            </h2>
          </Row>
          <Row
            {...gridConfig}
            type="flex"
            justify="center"
            style={{ marginBottom: '15px' }}
            gutter={16}
          >
            <Tag>employeeNo.</Tag>
            <Tag>officeNo.</Tag>
            <Tag>Committee</Tag>
            <Tag>ContractType</Tag>
            <Tag>Archived</Tag>
            <Tag>Admin/User</Tag>
          </Row>
        </div>

        <div className="details">
          <Row gutter={16}>
            <Col {...gridConfig}>
              <Card
                style={{ marginBottom: 16 }}
                title="Teaching Load in The College: "
              >
                {userData}
              </Card>
            </Col>
            <Col {...gridConfig}>
              <Card style={{ marginBottom: 16 }} title="Research Proposal">
                {userData}
              </Card>
            </Col>
            <Col {...gridConfig}>
              <Card style={{ marginBottom: 16 }} title="Consultation Hours">
                {userData}
              </Card>
            </Col>
            <Col {...gridConfig}>
              <Card style={{ marginBottom: 16 }} title="Other Data">
                {userData}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UserCard;
