import React from 'react';
import { Tag, Card, Row, Col, Avatar } from 'antd';

const userData = 'Insert Table Here';

class UserCard extends React.Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    return (
      <div>
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
