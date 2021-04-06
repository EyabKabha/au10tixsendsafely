import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Home from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import Setting from '@material-ui/icons/Settings';
import HomePage from './components/HomePage';
import AdminSettings from './components/AdminSettings';
import Search from './components/Search';
import Login from './components/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jsonwebtoken';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ctrPage: 0,
    }
  }

  onLogOutClick = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  onChangeHandler = (e, index) => {
    this.setState({ ctrPage: index })
    const token = localStorage.getItem('token')
    jwt.verify(token, 'AU10TIX@a!@Login', (err, decode) => {
      if (err) {
        if (err.message === 'jwt expired') {
          localStorage.clear();
          window.location.href = "/";
        }
      }
    })
  }

  PageShell = (Page, previous) => {

    return props => (
      <div className="page">
        <AppBar color="default" position="static" >
          <Tabs value={this.state.ctrPage} onChange={this.onChangeHandler}>
            <Tab label="Home" component={Link} to='/home' icon={<Home />} />
            <Tab label="Search" component={Link} to='/search' icon={<SearchIcon />} />
            <Tab label="Settings" component={Link} to='/adminsetting' icon={<Setting />} />
            <div style={{ marginLeft: '850px' }}>
              <img src={'./Au10tixLogo2.jpg'} alt="AU10TIX" width="120" height="70" />
            </div>

            <div style={{ marginLeft: '60px', marginTop: '15px' }}>
              <button className="btn-default" onClick={this.onLogOutClick}>Log out <FontAwesomeIcon icon={faSignOutAlt} size="xs" rotation={180} /></button>
            </div>

          </Tabs>
        </AppBar>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
          transitionName={props.match.path === "/one" ? "SlideIn" : "SlideOut"}
        >
          <Page {...props} />
        </ReactCSSTransitionGroup>

      </div>
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/adminsetting" component={this.PageShell(AdminSettings)} />
          <Route path="/search" component={this.PageShell(Search)} />
          <Route path="/home" component={this.PageShell(HomePage)} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
