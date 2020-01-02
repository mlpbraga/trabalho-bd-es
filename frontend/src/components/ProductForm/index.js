import React, { Component } from "react";
import api from '../../services/api';

const validUnitFormats = [
  'quilo',
  'grama',
  'unidade',
];

export default class ProductForm extends Component {

  constructor() {
    super();
    this.state = {
      unitFormat: null,
    }
  }

  async componentDidMount() {
    const data = this.props.location.state ? this.props.location.state.data : null;
    console.log(data)
    if (data) {
      await this.setState(
        { 
          id: data.id,
          name: data.name,
          unitFormat: data.unitFormat,
        }
      );
    }
  }

  submitForm = async e => {
    e.preventDefault()

    let produto = document.getElementById("name").value;

    if (produto === '' || this.state.unitFormat == null) {
      alert("Preencha todos os campos!")
      return
    }
    let response 
    try {
      if (this.props.location.state) {
        response = await api.put('/products?id=' + this.state.id, {
          "name": produto,
          "unitFormat": this.state.unitFormat
        })
      } else {
        response = await api.post('/products', {
          "name": produto,
          "unitFormat": this.state.unitFormat
        })
      }
      console.log(response);
      alert("Sucesso!");
      document.location = "http://localhost:3000/cadastro/produtos";
    } catch (e) {
      alert(e);
    }
  }

  // setStore(event) {
  //   const id = event.target.value;
  //   this.setState({ selectedStore: this.state.stores.filter(store => store.id == id)[0] });
  // }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  setFormat(event) {
    let unitFormat = event.target.value
    this.setState({ unitFormat });
  }

  render() {
    return (
      <div id="container">
        <form onSubmit={this.submitForm}>
          <span>Nome do produto</span>
          <input id="name" className="input" type="text" value={this.state.name} onChange={(e) => this.handleName(e)} />
          {/* <span>Valor unitário</span>
          <input id="valor" type="number" />
          <span>Qtd. em estoque</span>
          <input id="qtd" type="number" /> */}
          <span>Formato unitário</span>
          <select onChange={(e) => this.setFormat(e)}  value={this.state.unitFormat} >
            <option value={null} disabled>Escolha o formato</option>
            {validUnitFormats.map(format =>
              <option value={format}>{format}</option>
            )}
          </select>
          <button type="submit">Finalizar</button>
        </form>
      </div>
    );
  }
}