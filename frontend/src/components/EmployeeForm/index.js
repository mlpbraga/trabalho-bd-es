import React, { Component } from "react";
import DatePicker from "react-datepicker";
import api from '../../services/api';

import "react-datepicker/dist/react-datepicker.css";
import '../../styles.css'
import './styles.css'


const roles = [
  'Embalador',
  'Operador de caixa',
  'Repositor',
  'Balconista',
  'Auxiliar',
  'Subgerente',
  'Gerente'
];

export default class EmployeeForm extends Component {
  state = {
    birthDate: new Date(),
    role: '',
  };

  async componentDidMount() {
    const data = this.props.location.state ? this.props.location.state.data : null;
    console.log(data)
    if (data) {
      await this.setState(
        { 
          id: data.id,
          name: data.name,
          rg: data.rg,
          cpf: data.cpf,
          address: data.address,
          birthDate: data.birthDate ? new Date(data.birthDate.split('T')[0]) : new Date(),
          role: data.role,
          phoneNumber: data.phoneNumber,
          salary: data.salary,
        }
      );
    }
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleRg(event) {
    this.setState({ rg: event.target.value });
  }

  handleCpf(event) {
    this.setState({ cpf: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  handlePhone(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleSalary(event) {
    this.setState({ salary: event.target.value });
  }

  handleRole(event) {
    this.setState({ role: event.target.value });
  }

  handleChange = date => {
    this.setState({
      birthDate: date
    });
  };

  handleSubmit() { }

  setRole(event) {
    let role = event.target.value
    this.setState({ role });
  }

  submitForm = async e => {
    e.preventDefault()
    console.log(this.state.role)

    let name = document.getElementById('name').value
    let rg = document.getElementById('rg').value
    let cpf = document.getElementById('cpf').value
    let address = document.getElementById('address').value
    let phoneNumber = document.getElementById('phoneNumber').value
    let salary = document.getElementById('salary').value

    console.log(name)
    console.log(rg)
    console.log(cpf)
    console.log(address)
    console.log(phoneNumber)
    console.log(this.state.birthDate)
    console.log(this.state.role)
    console.log(salary)

    let response;
    try {
      if (this.props.location.state) {
        response = await api.put('/employees?id=' + this.state.id, {
          "name": name,
          "rg": rg,
          "cpf": cpf,
          "address": address,
          "phoneNumber": phoneNumber,
          "birthDate": this.state.birthDate,
          "role": this.state.role.toLowerCase(),
          "salary": salary
        });
      } else {
        response = await api.post('/employees', {
          "name": name,
          "rg": rg,
          "cpf": cpf,
          "address": address,
          "phoneNumber": phoneNumber,
          "birthDate": this.state.birthDate,
          "role": this.state.role.toLowerCase(),
          "salary": salary
        })
      }
      console.log(`resposta ${response}`)
      alert("Sucesso!")
      document.location = "http://localhost:3000/cadastro/funcionarios";
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div id="container">
        <form onSubmit={this.submitForm}>
          <span>Nome completo</span>
          <input id="name" className="input" type="text" value={this.state.name} onChange={(e) => this.handleName(e)} />
          <span>RG</span>
          <input id="rg" type="number" min="1" value={this.state.rg} onChange={(e) => this.handleRg(e)}/>
          <span>CPF</span>
          <input id="cpf" type="number" min="1" value={this.state.cpf} onChange={(e) => this.handleCpf(e)} />
          <span>Endereço</span>
          <input id="address" type="text" value={this.state.address} onChange={(e) => this.handleAddress(e)} />
          <span>Telefone</span>
          <input id="phoneNumber" type="number" min="1" value={this.state.phoneNumber} onChange={(e) => this.handlePhone(e)}/>
          <span>Data de nascimento</span>
          <DatePicker className="w-20" dateFormat="dd/MM/yyyy" selected={this.state.birthDate} onChange={(e) => this.handleChange(e)} />
          <span>Função</span>
          <select onChange={(e) => this.setRole(e)} value={this.state.role.toLowerCase()}>
            {roles.map(role =>
              <option value={role.toLowerCase()}>{role}</option>
            )}
          </select>
          <span>Salário</span>
          <input id="salary" type="number" min="1" step="0.01"  value={this.state.salary} onChange={(e) => this.handleSalary(e)}/>
          <button type="submit">Finalizar</button>
        </form>
      </div>
    );
  }
}