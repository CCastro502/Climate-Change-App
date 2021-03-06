import React, { Component } from "react";
import "./style.css";
import { Modal } from 'react-materialize';
import Axios from 'axios';
import crypto from 'crypto';
import { Link } from 'react-router-dom';

class Nav extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    loginEmail: "",
    loginPassword: "",
    isModalOpen: false
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  genRandomString = length => {
    console.log("randomString: ", crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length));
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length);   /** return required number of characters */
  };

  sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value
    };
  };

  saltHashPassword = userpassword => {
    var salt = this.genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = this.sha512(userpassword, salt);
    return { salt: passwordData.salt, passwordHash: passwordData.passwordHash }
  }

  logOut = () => {
    sessionStorage.setItem("loggedIntoCCA", false);
    window.location.reload();
  }

  goToProfile = () => {
    return `/profile/${sessionStorage.getItem('email')}`;
  }

  isLoggedIn = () => {
    if (sessionStorage.getItem("loggedIntoCCA") === "true") {
      return (
        <>
          <a className="nav-link" id="register-link" onClick={this.logOut}>Log Out</a>
          <Link to={this.goToProfile()}><button id="profile">My Profile</button></Link>
        </>
      );
    } else {
      return (
        <>
          <Modal
            header='User Info'
            trigger={<a className="nav-link" id="register-link" onClick={this.registerUser}>register</a>}
          >
            <label htmlFor="search-field">Email: </label>
            <input className="form-control mr-sm-6" name="email" placeholder="abc@123.com" value={this.state.email} onChange={this.handleInputChange} />
            <label htmlFor="search-field">Password: </label>
            <input className="form-control mr-sm-6" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} type="password" />
            <label htmlFor="search-field">Repeat Password: </label>
            <input className="form-control mr-sm-6" name="passwordRepeat" id="password-repeat" placeholder="Repeat Password..." type="password" value={this.state.passwordRepeat} onChange={this.handleInputChange} />
            <button onClick={this.registerUser}>Register</button>
          </Modal>

          <input className="form-control mr-sm-2" type="search" placeholder="abc@123.com" name="loginEmail" id="email" value={this.state.loginEmail} onChange={this.handleInputChange} />
          <input className="form-control mr-sm-2" type="search" placeholder="Password" name="loginPassword" id="password" value={this.state.loginPassword} onChange={this.handleInputChange} type="password" />
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logIn} id="login">Log In</button>
        </>
      )
    }
  }

  logIn = () => {
    console.log(this.checkEmail(this.state.loginEmail));
    console.log(this.checkPassword());
    if (this.checkEmail(this.state.loginEmail) && this.checkPassword()) {
      console.log("Passed checks");
      const returnUser = { email: this.state.loginEmail, password: this.state.loginPassword };
      Axios.get(`/api/users/${this.state.loginEmail}/${this.state.loginPassword}`, returnUser)
        .then(res => {
          alert("You have logged in successfully");
          sessionStorage.setItem('loggedIntoCCA', true);
          sessionStorage.setItem('email', this.state.loginEmail);
          this.setState({ loginEmail: "", loginPassword: "" });
          return;
        })
        .catch(err => {
          alert("Log in attempt unsuccessful");
          this.setState({ loginPassword: "" })
        });
    } else {
      alert("Log in attempt unsuccessful");
      this.setState({ loginPassword: "" });
    }

  }

  checkEmail = password => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(password);
  }

  checkPassword = () => {
    if ((this.state.loginPassword).length > 7) {
      return true;
    } else {
      return false;
    }
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  registerUser = () => {

    if (this.checkEmail(this.state.email)) {

      if (this.state.password === this.state.passwordRepeat && this.state.password.length > 7) {

        const { salt, passwordHash } = this.saltHashPassword(this.state.password);

        const newUser = {
          email: this.state.email,
          passwordHash: passwordHash,
          salt: salt
        }

        Axios.post('/api/users', newUser)
          .then(res => {
            console.log("Successful: ", res);
            alert("You have successfully registered");
            this.closeModal();
            return res;
          })
          .catch(err => console.log(err));

      } else {

        return alert("Password did not match or was not long enough (must be 8 characters)");

      }

    } else {

      return alert("Incorrect email address");

    }

  };
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light" id="nav">
          <a className="navbar-brand" href="/" id="logo">
            <h1>
              Climate Change App
            </h1>
          </a>
          <div id="user-field">
            {this.isLoggedIn()}

          </div>
        </nav>

      </>
    );
  }


}

export default Nav;