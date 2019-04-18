import React from 'react';
import {Redirect} from 'react-router-dom';

export  class RedirectToApp extends React.Component{
  render(){
    return <Redirect to="/articles"/>;
  }
}
