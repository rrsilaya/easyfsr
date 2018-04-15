import React, { Component } from 'react';
import { Card, List, Row } from 'antd';

import style from '../../styles';

const { Item: ListItem } = List;

class AdminWork extends Component {
  componentDidMount() {
    this.props.getAdminWork(this.props.userID);
  }

  render() {
    const { adminWork } = this.props;

    return (
      <Card title="Administrative Works">
        <List
          size="small"
          style={style.list}
          dataSource={adminWork}
          renderItem={adminWork => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{adminWork.position}</h3>
                <div>
                  <dl>
                    <dt>Office Unit</dt>
                    <dd>{adminWork.officeUnit}</dd>
                  </dl>
                </div>
              </Row>
            </ListItem>
          )}
        />
      </Card>
    );
  }
}

export default AdminWork;
