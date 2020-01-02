import React, { Component } from "react";
import api from '../../services/api';

export default class StoreForm extends Component {
  state = {
    name: '',
    address: ''
  };

  async componentDidMount() {
    const data = this.props.location.state ? this.props.location.state.data : null;
    console.log(data)
    if (data) {
      await this.setState(
        { 
          id: data.id,
          name: data.name,
          address: data.address,
        }
      );
    }
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  submitForm = async e => {
    e.preventDefault()

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;

    if (name === '' || address === '') {
      alert("Preencha todos os campos!")
      return
    }
    let response;
    try {
      if (this.props.location.state) {
        response = await api.put('/stores?id=' + this.state.id, { "name": document.getElementById("name").value, "address": document.getElementById("address").value })
      } else {
        response = await api.post('/stores', { "name": document.getElementById("name").value, "address": document.getElementById("address").value })
      }
      alert("Sucesso!");
      console.log(response);
      document.location = "http://localhost:3000/cadastro/lojas";
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div id="container">
        <form onSubmit={this.submitForm}>
          <span>Nome da loja</span>
          <input id="name" type="text" value={this.state.name} onChange={(e) => this.handleName(e)} />
          <span>Endereço</span>
          <input id="address" type="text" value={this.state.address} onChange={(e) => this.handleAddress(e)} />
          <button type="submit">Finalizar</button>
        </form>
      </div>
    );
  }
}