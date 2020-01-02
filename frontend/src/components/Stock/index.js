import React from "react";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import API from '../../services/api';

export default class Stock extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedSupplier: null,
      selectedProduct: null,
      suppliers: [],
      suppliedProducts: [],
      products: [],
      quantity: 1,
      orders: [],
      sells: [],
      total: 0.0,
      currentSellin: 0.0,
    }
  }

  async componentDidMount() {
    let suppliers = await API.get('/suppliers');
    suppliers = suppliers.data;

    await this.setState({ suppliers });
  }

  async setSupplier(supplierId) {
    let index = this.state.suppliers.findIndex(supplier => supplier.name == supplierId.target.value);
    this.setState({ selectedSupplier: this.state.suppliers[index].id });

    let prods = await API.get('/products')
    this.state.products = prods.data
    // console.log(prods.data)
    // this.setState({ products: prods.data });
    // Fazer consulta de produtos fornecidos

    let tt = await API.get('/suppliers/products')
    let idx = tt.data.findIndex(supplier => supplier.id == this.state.selectedSupplier);
    console.log(tt.data[idx].products)
    this.setState({ products: tt.data[idx].products });
  }

  setProduct(event) {
    const idProd = event.target.value;
    const product = this.state.products.filter(prod => prod.id == idProd)[0];
    this.state.currentSellin = product.supplierproduct.seliin
    let cs = product.supplierproduct.seliin
    this.setState({ selectedProduct: product });
    this.setState({ currentSellin: cs });
  }

  addToCart() {
    let currentProduct = Object.assign({}, this.state.selectedProduct);
    currentProduct.quantity = this.state.quantity;

    let sells = this.state.sells;
    let orders = this.state.orders
    if (orders.some(order => order.productId == currentProduct.id)) {
      let index = orders.findIndex(order => order.productId == currentProduct.id);
      orders[index].quantity += currentProduct.quantity;
    } else {
      sells.push(currentProduct);
      let order = {
        productId: currentProduct.id,
        name: currentProduct.name,
        sellin: currentProduct.supplierproduct.sellin,
        quantity: currentProduct.quantity,
      }
      console.log('order')
      console.log(order)
      orders.push(order)
    }
    this.setState({ sells });
    this.setState({ orders });

    this.updateTotal();
  }

  async removeItem(id) {
    let sells = this.state.sells;
    sells = sells.filter(sell => sell.productId != id);
    await this.setState({ sells });
    this.updateTotal();
  }

  updateTotal() {
    this.setState({ total: this.state.orders.reduce((sum, i) => sum + (i.sellin * i.quantity || 0), 0) });
  }

  setSelected(event) {
    const idProd = event.target.value;
    const product = this.state.products.filter(prod => prod.productId == idProd)[0];
    this.setState({ selectedProduct: product });
  }

  setQuantity(event) {
    this.setState({ quantity: Number(event.target.value) });
  }

  async finish() {
    let body = {
      status: "entregue",
      orderDate: Date(),
      deliveryDate: Date(),
      userId: 1, //PEGAR ID DO USUARIO
      supplierId: this.state.selectedSupplier,
      products: this.state.orders,
    }

    try {
      let response = await API.post('/orders', body)
      console.log(response)
      if (response.status == 201) {
        alert("Sucesso!")
        document.location = "http://localhost:3000/estoque";
      }
      else {
        alert(`${response.code} ${response.message}`)
      }
    } catch (e) {
      alert(e);
    }


    console.log(JSON.stringify(body))
  }

  render() {
    return (
      <div className="center">
        <div style={{ width: '60%' }}>
          <div id="container">
            <form style={{ width: '100%' }}>
              <span style={{ textAlign: 'center', margin: '20px auto', fontWeight: 'bold' }}>
                Requisição de estoque
          </span>

              <span>Fornecedor</span>
              <select onChange={(e) => this.setSupplier(e)} style={{ height: '40px' }}>
                <option value={null} disabled selected>Escolha o fornecedor</option>
                {
                  this.state.suppliers
                    ? this.state.suppliers.map(supplier =>
                      <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.name}</option>
                    )
                    : null
                }
              </select>

              <div className="row">
                <span>Produtos que já forneceu:</span>
                {/* pegar os produtos que o fornecedor já forneceu */}
                <button className="btn-icon-label" style={{ float: 'right' }} onClick={() => this.handleNew()}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span style={{ paddingLeft: '3px' }}>
                    Novo
              </span>
                </button>
              </div>
              <table>
                <tbody>
                  {
                    this.state.suppliedProducts.length
                      ? this.state.suppliedProducts.map(prod =>
                        <tr key={prod.productId}>
                          <td>{prod.name}</td>
                        </tr>
                      )
                      : <tr key={null}>
                        <td>Não há produtos já fornecidos</td>
                      </tr>
                  }
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <div style={{ width: '80%' }}>
          <div id="container" style={{ display: 'block', marginTop: '40px' }}>
            <span style={{ textAlign: 'center', margin: '20px auto', fontWeight: 'bold' }}>Pedido</span>
            <table id="table" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '80%' }}>Produto</td>
                  <td style={{ width: '20%' }}>Quantidade</td>
                  <td style={{ width: '10%' }}></td>
                </tr>
                <tr>
                  <td>
                    <span>Produto</span>
                    <select onChange={(e) => this.setProduct(e)}>
                      <option value={null} disabled selected>Escolha o produto</option>
                      {
                        this.state.products
                          ? this.state.products.map(prod =>
                          <option key={prod.id} value={prod.id}>{prod.name} {'R$' + prod.supplierproduct.sellin}</option>
                          )
                          : null
                      }
                    </select>
                  </td>
                  <td>
                    <input className="qtd-input" type="number" min="1" value={this.state.quantity} onChange={(e) => this.setQuantity(e)} />
                  </td>
                  <td>
                    <button onClick={() => this.addToCart()}>
                      <ArrowForwardOutlinedIcon htmlColor="#fff" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <div className="bordered-div">
                      <table style={{ width: '100%', border: 'none' }}>
                        <tbody>
                          {this.state.orders.map(order =>
                            <tr key={order.productId}>
                              <td style={{ width: '5%' }}>
                                <span>{order.quantity}x</span>
                              </td>
                              <td style={{ width: '70%' }}>
                                <span>{order.name}</span>
                              </td>
                              <td style={{ width: '20%', textAlign: 'right' }}>
                                <span>R$ {(order.sellin * order.quantity).toFixed(2)}</span>
                              </td>
                              <td style={{ width: '5%' }}>
                                <span onClick={() => this.removeItem(order.productId)}>
                                  <CloseOutlinedIcon htmlColor="#f00" />
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ textAlign: 'right' }}>
                    <span>TOTAL:</span>
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '5px' }}>
                    <span>R$ {this.state.total.toFixed(2)}</span>
                  </td>
                </tr>
              </tbody>

            </table>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => this.finish()}>Finalizar Pedido</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}