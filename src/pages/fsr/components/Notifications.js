import React, { Component } from 'react';
import { Card, Row, List } from 'antd';
import moment from 'moment';
import StackGrid from 'react-stack-grid';


import style from '../styles';

const { Item: ListItem } = List;

class Notifications extends Component {

  render() {
    const {
      notification,
    } = this.props;

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        duration={0}
        gridRef={grid => (this.grid = grid)}
      >
        <Card title="Annonuncements" loading>
          <List
            size="small"
            style={style.list}
            dataSource={notification}
            renderItem={notification => (
              <ListItem>
                <Row style={style.listItem} justify="center">
                  <h3 className="text primary">{notification.title}</h3>
                  <div>
                    <dl>
                      <dt>Message</dt>
                      <dd>{notification.message}</dd>
                    </dl>
                  </div>
                </Row>
              </ListItem>
            )}
          />
        </Card>
      </StackGrid>
    );
  }
}

export default ProfileInfo;
