import React from 'react';
import logo_w from '../logo_w.png';

export class Header extends React.Component{
  render(){
    return (
      <div className="text-center bg-dark p-3" >
        <a href='https://pixelplex.io/' target="_blank">
          <img src={logo_w}/>
        </a>
      </div>
    );
  }
}
