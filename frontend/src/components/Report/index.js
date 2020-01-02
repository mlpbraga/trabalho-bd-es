import React from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import API from '../../services/api';

export default class Report extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      secondDate: new Date(),
      month: null,
      year: null,
      products: [],
      cashiers: [],
      cashierValue: null,
      horas: 0.0,
      vendas: 0,
      stores: [],
      selectedStore: null,
      selectedCashier: null,
      formattedDate: null,
      storeData: []
    };
  }

  async componentDidMount() {
    let cashiers = await API.get('/cashiers');
    cashiers = cashiers.data;
    await this.setState({ cashiers });
    console.log(cashiers)

    let stores = await API.get('/stores');
    stores = stores.data;
    await this.setState({ stores });
    await this.setState({ selectedStore: this.state.stores[0].id });
  }

  async onChange(e) {
    await this.setState({ date: e })
    await this.setState({ month: e.getMonth() + 1 });
    await this.setState({ year: e.getYear() + 1900 });

    let markup = await API.get('/products/markup?month=' + this.state.month + '&year=' + this.state.year);
    markup = markup.data;
    await this.setState({ products: markup })
  }

  async onChangeSecond(e) {
    let day = e.getDate();
    if (day < 10) day = '0' + day.toString();
    
    let month = e.getMonth() + 1;
    if (month < 10) month = '0' + month.toString();
    let formattedDate = (e.getYear() + 1900).toString() + month + day;

    await this.setState({ secondDate: e })
    await this.setState({ formattedDate });
    
    console.log('/stores?id=' + this.state.selectedStore + '&date=' + this.state.formattedDate)
    let storeData = await API.get('/stores?id=' + this.state.selectedStore + '&date=' + this.state.formattedDate)
    storeData = storeData.data;

    await this.setState({ storeData });
    await this.setState({ horas: storeData.workHours.hours ? storeData.workHours.hours : 0, vendas: storeData.sales })
  }

  async setSelectedCashier(e) {
    await this.setState({ selectedCashier: e.target.value });
    console.log('/cashiers?id=' + this.state.selectedCashier);

    let valor = await API.get('/cashiers?id=' + this.state.selectedCashier)
    console.log(valor)
    valor = valor.data;

    await this.setState({ cashierValue: valor });
  }

  async setSelectedStore(event) {
    await this.setState({ selectedStore: event.target.value });

    let day = this.state.secondDate.getDate();
    if (day < 10) day = '0' + day.toString();
    
    let month = this.state.secondDate.getMonth() + 1;
    if (month < 10) month = '0' + month.toString();
    let formattedDate = (this.state.secondDate.getYear() + 1900).toString() + month + day;

    await this.setState({ formattedDate });

    console.log('/stores?id=' + this.state.selectedStore + '&date=' + this.state.formattedDate);
    let storeData = await API.get('/stores?id=' + this.state.selectedStore + '&date=' + this.state.formattedDate)
    storeData = storeData.data;

    await this.setState({ storeData });
    await this.setState({ horas: storeData.workHours.hours ? storeData.workHours.hours : 0, vendas: storeData.sales })
  }

  render() {
    return(
      <div className="center">
        <div id="container">
          <form style={{width: '40%'}}>
          <div className="row">
            <span>Produtos que mais geraram lucro líquido</span>

            <DatePicker
              showMonthYearPicker="true"
              dateFormat="MM/yyyy"
              selected={this.state.date}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <table>
            <tbody>
            {
              this.state.products.length
                ? this.state.products.map(prod =>
                  <tr key={prod.productId}>
                    <td>{prod.name}</td>
                    <td>R$ {prod.markup.toFixed(2)}</td>
                    <td>{prod.lastsale}</td>
                  </tr>
                  )
                : <tr key={null}>
                    <td>Não há dados para este período</td>
                  </tr>
            }
            </tbody>
          </table>
          </form>
          <form  style={{width: '40%'}}>
          <div>
            <span>Valor médio diário de um caixa</span>
            <select className="prod-select" defaultValue={this.state.stores[this.state.selectedStore]} onChange={(e) => this.setSelectedCashier(e)}>
              <option key={null} value={null} disabled>Selecione</option>
              {this.state.cashiers.map(cashier =>
                <option key={cashier.id} value={cashier.id}>{cashier.number} -  Loja: {cashier.storeId}</option>
              )}
            </select>
            <table>
            <tbody>
            {
              this.state.cashierValue
                ? this.state.cashierValue.avgByDay.map(day =>
                  <tr>
                    <td>Data: {day.sellDate}</td>
                    <td>Valor médio: R$ {day.avg.toFixed(2)}</td>
                  </tr>
                  )
                : <tr key={null}>
                    <td>Não há dados para este período</td>
                  </tr>
            }
            </tbody>
          </table>
          </div>
          </form>
          <form>
            <div className="row">
              <span>Horas trabalhadas/dia</span>

              <select className="prod-select" defaultValue={null} onChange={(e) => this.setSelectedStore(e)}>
                {this.state.stores.map(stores =>
                  <option key={stores.id} value={stores.id}>{stores.name}</option>
                )}
              </select>
              <DatePicker style={{ width: '30%' }}
                dateFormat="dd/MM/yyyy"
                selected={this.state.secondDate}
                onChange={(e) => this.onChangeSecond(e)}
              />
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Horas trabalhadas: {this.state.horas }</td>
                </tr>
                <tr>
                  <td>Vendas realizadas: {this.state.vendas}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    )
  }
}