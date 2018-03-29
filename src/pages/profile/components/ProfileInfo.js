import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

class ProfileInfo extends Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };

    return (
      <Row type="flex" gutter={16} className="gridTiles">
        <Col {...gridConfig}>
          <Card title="Awards" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Research" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Community Service" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Consultation Hours" loading>
            Content
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ProfileInfo;
