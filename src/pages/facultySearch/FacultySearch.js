import React, { Component } from 'react';
import { Row, Col, Button, Icon, Dropdown, Menu, Input, Table } from 'antd';
import data from './faculty-data';

const Search = Input.Search;

class FacultySearch extends Component {
  state = {
    filterDropdownVisible: false,
    data,
    searchText: '',
    filtered: false,
  };
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0
                        ? [<span className="highlight">{match[0]}</span>, text]
                        : text,
                  )}
              </span>
            ),
          };
        })
        .filter(record => !!record),
    });
  };
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.filtered ? '#666666' : '#aaa' }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          );
        },
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
          {
            text: 'Administrator',
            value: 'Administrator',
          },
          {
            text: 'Faculty Member',
            value: 'Faculty Member',
          },
          {
            text: 'Committee Head',
            value: 'Committee Head',
          },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
      },
    ];
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

export default FacultySearch;
