import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import serviceMap from '../../utils/serviceMap';
import api from '../../services/api';


export default class ListItems extends Component {
  constructor() {
    super();
    this.state = {
      path: '',
      items: [],
      primaryAttribute: '',
      service: '',
    };
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    const path = pathname.split('/')[2];
    await this.setState({path});
    const service = serviceMap[this.state.path].service;
    await this.setState({ service });

    let attr = '';
    if (this.state.service === '/cashiers') attr = 'number';
    else if (this.state.service === '/users') attr = 'username';
    else attr = 'name';

    await this.setState({ primaryAttribute: attr });
    
    try {
      let response = await api.get(this.state.service);
      response = response.data;
      await this.setState({ items: response });
    } catch (err) {
      alert(err);
    }
  }

  handleEdit(data) {
    const pathname = serviceMap[this.state.path].formPath;
    this.props.history.push({ pathname, state: { data }})
  }

  handleNew() {
    const path = serviceMap[this.state.path].formPath;
    this.props.history.push(path);
  }

  async handleDelete(data) {
    const r = window.confirm('Deseja remover o item ' + 
      data[this.state.primaryAttribute] + '?');
    if(r) {
      try {
        const response = await api.delete(this.state.service + '?id=' + data.id);
        alert('Success');
        document.location.reload(true);
      } catch (e) {
        alert(e);
      }
    }
  }

  render() {
    return (
      <>
        <h1 className="title">
          {serviceMap[this.state.path] ? serviceMap[this.state.path].title : ''}
        </h1>
        <div id="container">
          <table id="table" border="1" frame="void" rules="rows">
            <thead>
              <tr>
                <th></th>
                <th colSpan="2" className="novo">
                  <button className="btn-icon-label" onClick={() => this.handleNew()}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span style={{ paddingLeft: '3px' }}>
                      Novo
                    </span>
                  </button>
                </th>
              </tr>
              <tr>
                <th style={{ width: '70%' }} className="first">Nome</th>
                <th style={{ width: '30%' }} colSpan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.items
                  ? this.state.items.map(item =>
                    <tr key={item.id}>
                      <td>{item[this.state.primaryAttribute]} {this.state.primaryAttribute == 'number' ? ' - ID Loja: ' + item.storeId : '' }</td>

                      <td align="center">
                        <button className="action" onClick={() => this.handleEdit(item)} title='Editar'>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </td>
                      <td align="center">
                        <button className="action" onClick={() => this.handleDelete(item)} title='Excluir'>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  )
                  : <tr></tr>
              }
            </tbody>

          </table>
        </div>
      </>
    )
  }
}
