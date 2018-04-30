import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Home from './page/Home'
import Main from './page/Main'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: '',
      password: '',
      person: '',
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (studID,pass,pers) => {
    this.setState({studentID: studID, password: pass, person: pers});
  } 

  render() {

    return (
        <div>
          <Route exact path="/" render={()=><Home handleLogin={this.handleLogin} />} />
          <Route path="/Main" render={()=><Main studentID={this.state.studentID} person={this.state.person}/>} />
        </div>
    )
  }
}

export default App