import React, { Component } from "react";
import api from '../../services/api';
export default class UserForm extends Component {

  constructor() {
    super();
    this.state = {
      employees: [],
    }
  }

  async componentWillMount() {
    let items = await api.get('/employees');
    console.log('employees', items.data)
    await this.setState({ employees: items.data })

    const data = this.props.location.state ? this.props.location.state.data : null;
    console.log(data)
    if (data) {
      await this.setState(
        { 
          id: data.id,
          username: data.username,
        }
      );

      if (data.employee) {
        const employeeId = data.employee.id;
        await this.setState({ selectedEmployee: employeeId })
      }
    }

    console.log(this.state.selectedEmployee)

  }

  handleSubmit() { }

  handleName(event) {
    this.setState({ username: event.target.value });
  }

  setEmployee(event) {
    const id = event.target.value;
    this.setState({ selectedEmployee: this.state.employees.filter(e => e.id == id)[0].id });
    console.log(this.state.employees.filter(e => e.id == id)[0].id)
  }

  submitForm = async e => {
    e.preventDefault()

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === '' || password === '' || this.state.selectedEmployee == null) {
      alert("Preencha todos os campos!")
      return
    }
    let response 
    try {
      if (this.props.location.state) {
        response = await api.put('/users?id=' + this.state.id, {
          "username": username,
          "password": password,
          "employeeId": this.state.selectedEmployee
        });
      } else {
        response = await api.post('/users', {
          "username": username,
          "password": password,
          "employeeId": this.state.selectedEmployee
        });
      }

      console.log(response);
      alert("Sucesso!");
      document.location = "http://localhost:3000/cadastro/usuarios";
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div id="container">
        <form onSubmit={this.submitForm}>
          <span>Nome de usuário</span>
          <input id="username" className="input" type="text" value={this.state.username} onChange={(e) => this.handleName(e)} />
          <span>Senha</span>
          <input id="password" type="password" />
          <span>Confirme a senha</span>
          <input type="password" />
          <span>Funcionário</span>
          <select onChange={(e) => this.setEmployee(e)} value={this.state.selectedEmployee}>
            <option value={null}>Escolha o funcionário</option>
            {this.state.employees.map(employee =>
              <option value={employee.id}>{employee.name}</option>
            )}
          </select>
          <button type="submit">Finalizar</button>
        </form>
      </div>
    );
  }
}