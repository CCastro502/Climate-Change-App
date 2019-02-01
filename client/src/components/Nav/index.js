import React, { Component } from "react";
import "./style.css";
import { Modal } from 'react-materialize';

class Nav extends Component {
  state = {
    email: "",
    username: "",
    password: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  login = () => {

  }

  registerUser = () => {

  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Climate Change App
          </a>
          <div id="user-field">

            <Modal
              header='Modal Header'
              trigger={<a className="nav-link" id="register-link" onClick={this.registerUser}>register</a>}>
              <label htmlFor="search-field">Email: </label>
              <input className="form-control mr-sm-6" name="email" id="search-field" placeholder="abc@123.com" value={this.state.email} onChange={this.handleInputChange} />
              <label htmlFor="search-field">Username: </label>
              <input className="form-control mr-sm-6" name="username" id="search-field" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
              <label htmlFor="search-field">Password: </label>
              <input className="form-control mr-sm-6" name="password" id="search-field" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
              <label htmlFor="search-field">Repeat Password: </label>
              <input className="form-control mr-sm-6" name="password-repeat" id="search-field" placeholder="Repeat Password..."/>
              <button onClick={this.registerUser}>Register</button>
            </Modal>

            <input className="form-control mr-sm-2" type="search" placeholder="Username" name="username" id="username" value={this.state.username} onChange={this.handleInputChange} />
            <input className="form-control mr-sm-2" type="search" placeholder="Password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange} />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logIn}>Log In</button>

          </div>
        </nav>

      </>
    );
  }


}

export default Nav;