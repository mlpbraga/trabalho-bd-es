import React from 'react';
import { withRouter } from "react-router-dom";
import Sidebar from '../Sidebar';
import Employee from '../Employee';

import './styles.css'

const Home = () => (
  <div className='home'>
    <Sidebar />
    <Employee /> 
  </div>
);

export default withRouter(Home);