import React, { Component } from "react";
import api from '../../services/api';
import './styles.css';

const types = [
  'Preferencial',
  'Comum',
  'Caixa rápido',
];

const status = [
  'Ativo',
  'Inativo',
];

export default class CashierForm extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      number: undefined,
      storeId: undefined,
      type: undefined,
      status: undefined,
      stores: [],
      data: {}
    };
  }

  async componentDidMount() {
    const data = this.props.location.state ? this.props.location.state.data : null;
    if (data) {
      await this.setState(
        { 
          id: data.id,
          number: data.number,
          storeId: data.storeId,
          type: data.type,
          status: data.status
        }
      );
    }

    let response = await api.get('/stores');
    response = response.data;

    await this.setState({ stores: response });
  }

  handleValue(event) {
    this.setState({ number: event.target.value });
  }

  handleStore(event) {
    this.setState({ storeId: event.target.value });
  }

  handleType(event) {
    this.setState({ type: event.target.value });
  }

  handleStatus(event) {
    this.setState({ status: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const cashier = {
      number: Number(this.state.number),
      storeId: Number(this.state.storeId),
      type: this.state.type,
      status: this.state.status
    }

    try {
      let response
      if (this.props.location.state) {
        response = await api.put('/cashiers?id=' + this.state.id, cashier)
      } else {
        response = await api.post('/cashiers', cashier);
      }
      alert(response.data.message)
      document.location = "http://localhost:3000/cadastro/caixas";
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div id="container">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <span>Número do caixa</span>
          <input type="number" name="number" min="1" 
            value={this.state.number} onChange={(e) => this.handleValue(e)} />
          <span>Loja</span>
          <select name="storeId" value={this.state.storeId}
           onChange={(e) => this.handleStore(e)} >
            <option value={null} disabled selected>Escolha a loja</option>
            {
              this.state.stores
                ? this.state.stores.map(store => 
                    <option key={store.id} value={store.id}>{store.name}</option>
                  )
                : null
            }
          </select>
          <span>Tipo de caixa</span>
          <select name="type" value={this.state.type} 
            onChange={(e) => this.handleType(e)} >
            <option value={null} disabled selected>Escolha o tipo</option>
            {
              types.map((type, index) => 
                <option key={index} value={type.toLowerCase()}>{type}</option>
              )
            }
          </select>
          <span>Status</span>
          <div className="row">
            <fieldset id="group" value={this.state.status}
             onChange={(e) => this.handleStatus(e)} >
              <input type="radio" name="status" value={status[0].toLowerCase()} />{status[0]}
              <input type="radio" name="status" value={status[1].toLowerCase()} style={{marginLeft: '30%'}} />{status[1]}
            </fieldset>
          </div>
          <button type="submit" >Finalizar</button>
        </form>
      </div>
    );
  }
}