
import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import api from '../../services/api';
import './styles.css'
import constants from '../../utils/constants';
import { getToken } from '../../services/auth';
import $ from 'jquery';
// import {browserHistory} from  'react-router';

const { apiEndpoint } = constants;

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function loadingRender(content) {
  if (_.isEmpty(content) || content === ' ') {
    content = (<div className='loading'></div>)
  } else {
    content = ` ${decodeHtml(content)} `
  }
  return content;
}

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        {
          employeeId:1,
          name: 'Luísa Braga',
          rg: '24091308',
          cpf: '00060907290',
          address: 'Rua 1 dsadjdas',
          phoneNumber: '12323313',
          birthDate: '1007-10-10',
          role: 'gerente',
          salary: 1232.00,
        },
        {
          employeeId:2,
          name: 'Luísa Braga',
          rg: '24091308',
          cpf: '00060907290',
          address: 'Rua 1 dsadjdas',
          phoneNumber: '12323313',
          birthDate: '1007-10-10',
          role: 'gerente',
          salary: 1232.00,
        },
        {
          employeeId:3,
          name: 'Luísa Braga',
          rg: '24091308',
          cpf: '00060907290',
          address: 'Rua 1 dsadjdas',
          phoneNumber: '12323313',
          birthDate: '1007-10-10',
          role: 'gerente',
          salary: 1232.00,
        },{
          employeeId:4,
          name: 'Luísa Braga',
          rg: '24091308',
          cpf: '00060907290',
          address: 'Rua 1 dsadjdas',
          phoneNumber: '12323313',
          birthDate: '1007-10-10',
          role: 'gerente',
          salary: 1232.00,
        }
      ],
    };
    this.login = this.props.login;
  }

  render() {
    let { employees } = this.state;
    return (
      <div className='employee-page'>
        <ul className='list-container'>
          { employees.map((employee) => {
            return <li>{employee.employeeId} {employee.name} {employee.role}</li>
          })}
        </ul>
      </div>
    );
  };
};

export default withRouter(Project);