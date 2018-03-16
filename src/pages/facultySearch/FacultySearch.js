import React, { Component } from 'react';
import { Row, Col, Button, Icon, Dropdown, Menu } from 'antd';

import Faculty from './Faculty';

import styles from './styles';
import person from './faculty-data'; //from facultyData to person
import { Input } from 'antd';
const Search = Input.Search;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Name</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="#">Date</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Salary Grade</Menu.Item>
  </Menu>
);
const menu2 = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Help</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="#">Option1</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Option2</Menu.Item>
  </Menu>
);

class FacultySearch extends Component {
  render() {
    return (

      <div>
        <div> 
            <Search
            placeholder="input faculty name"
            onSearch={value => console.log(value)}
            style={{ width: 325, margin: 10, right: 10 }}
            enterButton

          />
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Account Type 
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Last Updated 
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;

          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#" title="Sort by"> Sort by &nbsp;
              <Icon type="layout" />
            </a>
          </Dropdown>
           &emsp;&emsp;
          <Dropdown overlay={menu2} trigger={['click']}>
            <a className="ant-dropdown-link" href="#" title="Other options">
              <Icon type="bars" size = "medium" />
            </a>
          </Dropdown>
         
        </div>
        <Row gutter={16} >
          {person.map(faculty => (
            <Col span={16}>

              < Faculty title={faculty.name} />
            
              
            </Col>
            

            
          ))}
        </Row>
      </div>
    );
  }
}

export default FacultySearch;


