import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import Faculty from './Faculty';

import styles from './styles';
import person from './faculty-data'; //from facultyData to person
import { Input } from 'antd';
const Search = Input.Search;
const people = [
  {
    id: 1,
    name: 'Lorenz Matthew Afable',
    type: 'Admin',
  },
  {
    id: 2,
    name: 'Ralph Lawrence Silaya',
    type: 'Admin',
  },
  {
    id: 3,
    name: 'Erlen Mae Evangelista',
    type: 'Admin',
  },
  {
    id: 4,
    name: 'Kia Mei Somabes',
    type: 'Admin',
  },
  {
    id: 5,
    name: 'Trixia Belleza',
    type: 'Admin',
  },
  {
    id: 6,
    name: 'Allen Ponce de Leon',
    type: 'User',
  },
  {
    id: 7,
    name: 'Ai Salva',
    type: 'User',
  },
  {
    id: 8,
    name: 'Harold Roxas',
    type: 'User',
  },
  {
    id: 9,
    name: 'John Dewey Legaspi',
    type: 'User',
  },
  {
    id: 10,
    name: 'Tricia Leal',
    type: 'User',
  },
];

class FacultySearch extends Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          {person.map(faculty => (
            <Col span={16}>
              <Faculty title={faculty.name} description={faculty.type} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default FacultySearch;
