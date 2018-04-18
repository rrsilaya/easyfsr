import React, { Component } from 'react';
import { Card, Row, List } from 'antd';
import moment from 'moment';
import StackGrid from 'react-stack-grid';


import style from '../styles';

const { Item: ListItem } = List;

class Announcements extends Component {

  render() {
    const {
      announcement,
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
            dataSource={announcement}
            renderItem={announcement => (
              <ListItem>
                <Row style={style.listItem} justify="center">
                  <h3 className="text primary">{announcement.title}</h3>
                  <div>
                    <dl>
                      <dt>Body</dt>
                      <dd>{announcement.body}</dd>
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
