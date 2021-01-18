import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import AdminSettings from './AdminSettings';
import Search from './Search';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allTabs : ['/', '/tab2', '/tab3'],
      ctrPage: 0,
      flag: false,
    }
  }
  onChangeHandler =  (e, index) => {
    this.setState({ ctrPage: index })
  }

   PageShell = (Page, previous) => {
    return props => (
      <div className="page">
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
        <AppBar color="default" position="static">
          <Tabs value={this.state.ctrPage} onChange={this.onChangeHandler}>
            <Tab label="Home"  component={Link} to='/'/>
            <Tab label="Search" component={Link} to='/search'/>
            <Tab label="admin" component={Link} to='/adminsetting'/>
            <div style={{marginLeft:'850px'}}>
           <img src={'./Au10tixLogo2.jpg'} alt="AU10TIX" width="120" height="70"/>

            </div>
          </Tabs>
        </AppBar>
        <Switch>
            <Route path="/adminsetting" component={this.PageShell(AdminSettings)} />
            <Route path="/search" component={this.PageShell(Search)} />
            <Route path="/" component={this.PageShell(HomePage)} />
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
