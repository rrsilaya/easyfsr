import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';

import styles from './styles';

const { Header, Content } = Layout;
const { Group: InputGroup } = Input;

class Login extends Component {
  render() {
    return (
      <Layout className="fullpage background clear">
        <Header className="background clear" style={styles.header}>
          <img alt="" style={styles.logo.top} />
        </Header>
        <Content>
          <div className="border" style={styles.pagecontainer}>
            <div style={styles.wrapper}>
              <div className="container border" style={styles.section}>
                Image
              </div>
              <div
                className="container border"
                style={{ ...styles.section, ...styles.login }}
              >
                <h1 className="super text primary">Lorem ipsum</h1>
                <p className="subtitle text meta">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et consectetur
                  adipiscing elit.
                </p>
                <Form>
                  <InputGroup compact size="large" style={styles.form}>
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Button type="primary" htmlType="submit" size="large">
                      Login
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Login;
