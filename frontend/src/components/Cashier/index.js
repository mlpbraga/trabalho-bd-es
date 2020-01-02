import React from "react";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import './styles.css';
import API from '../../services/api';

export default class Cashier extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: [],
      cashiers: [],
      selectedProduct: null,
      selectedStore: null,
      products: [],
      sells: [],
      total: 0.0,
      quantity: 1,
      finalSell: null
    }
  }

  async componentDidMount() {
    let products;
    let stores;

    try {
      stores = await API.get('/stores');
      stores = stores.data;
      await this.setState({ stores });
      await this.setSelectedStore(stores[0]);
      await this.setCashiers(this.state.selectedStore);
      // await this.setSelectedCashier(this.state.selectedStore.cashiers[0].id);

      products = await API.get('/products?store=' + this.state.selectedStore.id);
      products = products.data;
      await this.setState({ products });
    } catch (e) {
      console.log(e);
    }
    this.setState({ selectedProduct: this.state.products[0] })
    this.updateTotal();
  }

  async setSelectedStore(store) {
    await this.setState({ selectedStore: store });
  }

  async setSelectedCashier(cashierId) {
    await this.setState({ selectedCashier: cashierId });
  }

  getStores() {}

  getCashiers(storeId) {}

  async setCashiers(store) {
    await this.setState({ cashiers: store.cashiers });
  }

  addToCart() {
    let currentProduct = Object.assign({}, this.state.selectedProduct);
    currentProduct.quantity = this.state.quantity;

    let sells = this.state.sells;
    if (sells.some(sell => sell.productId == currentProduct.productId)) {
      let index = sells.findIndex(sell => sell.productId == currentProduct.productId);
      sells[index].quantity += currentProduct.quantity;
    } else {
      sells.push(currentProduct);
    }
    this.setState({ sells });

    this.updateTotal();
  }

  async removeItem(id) {
    let sells = this.state.sells;
    sells = sells.filter(sell => sell.productId != id);
    await this.setState({ sells });
    this.updateTotal();
  }

  updateTotal() {
    this.setState({ total: this.state.sells.reduce((sum, i) => sum + (i.sellout * i.quantity || 0), 0) });
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
    let sells = JSON.parse(JSON.stringify(this.state.sells));
    sells.forEach(sell => {
      delete sell.createdAt;
      delete sell.updatedAt;
      delete sell.id;
      delete sell.product;
      delete sell.storeId;
      delete sell.name;
      delete sell.stock;
    });

    const finalSell = {
      sellDate: Date.now(),
      cashierId: 1,
      sells
    }

    console.log(finalSell)
    try {
      if (!finalSell.sells.length) {
        throw new Error('Carrinho vazio');
      }
      await API.post('/cashiers/products', finalSell)
      if (!alert("Finalizada com sucesso")) document.location = "http://localhost:3000/caixa";
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div id="container" style={{ display: 'block' }}>
        <table id="table" style={{ margin: '0px auto', border: '0' }}>
          <tbody>
            <tr>
              <td> 
                <div>
                  <span>Loja</span>
                  <select className="store-cashier-select" defaultValue={null} onChange={(e) => this.getCashiers(e)}>
                    <option key={null} value={null} disabled>Escolha a loja</option> 
                    {this.state.stores.map(store =>
                      <option key={store.productId} value={store.productId}>{store.name}</option>
                    )}
                  </select>
                </div>
              </td>
              <td> 
                <div>
                  <span>Caixa</span>
                  <select className="store-cashier-select" defaultValue={null} onChange={(e) => this.getCashiers(e)}>
                    <option key={null} value={null} disabled>Escolha o caixa</option> 
                    {this.state.cashiers.map(cashier =>
                      <option key={cashier.id} value={cashier.cashierId}>{cashier.number}</option>
                    )}
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="table" style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td style={{ width: '80%' }}>Produto</td>
              <td style={{ width: '20%' }}>Quantidade</td>
              <td style={{ width: '10%' }}></td>
            </tr>
            <tr>
              <td>
                <select className="prod-select" defaultValue={this.state.products[0]} onChange={(e) => this.setSelected(e)}>
                  {this.state.products.map(prod =>
                    <option key={prod.productId} value={prod.productId}>{prod.product.name} - R$ {prod.sellout.toFixed(2)}</option>
                  )}
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
                      {this.state.sells.map(sell =>
                        <tr key={sell.productId}>
                          <td style={{ width: '5%' }}>
                            <span>{sell.quantity}x</span>
                          </td>
                          <td style={{ width: '70%' }}>
                            <span>{sell.product.name}</span>
                          </td>
                          <td style={{ width: '20%', textAlign: 'right' }}>
                            <span>R$ {(sell.sellout * sell.quantity).toFixed(2)}</span>
                          </td>
                          <td style={{ width: '5%' }}>
                            <span onClick={() => this.removeItem(sell.productId)}>
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
          <button onClick={() => this.finish()}>Finalizar Venda</button>
        </div>
      </div>
    );
  }
}
