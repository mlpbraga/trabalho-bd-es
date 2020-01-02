import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch, BrowserRouter as Router } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signin from './components/Signin';
// import Signup from './components/Signup';
import Home from './components/Home';
import Cashier from './components/Cashier';
import Stock from './components/Stock';
import Report from './components/Report';
import ListItems from './components/ListItems';
import UserForm from './components/UserForm';
import EmployeeForm from './components/EmployeeForm';
import CashierForm from './components/CashierForm';
import ProductForm from './components/ProductForm';
import StoreForm from './components/StoreForm';
import SupplierForm from './components/SupplierForm';
import _ from 'lodash';

import Sidebar from './components/Sidebar';

import './App.css';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//       )
//     }
//   />
// );


const PrivateRoute = ({ component, ...options }) => {
  const auth = isAuthenticated();
  if (auth) {
    return <Route {...options} component={component} />;
  } else {
    return <Route {...options} component={Signin} />;
  }
};


class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Header />
          <PrivateRoute exact path="/home" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Sidebar />
          <PrivateRoute exact path="/caixa" component={Cashier}/>
          <PrivateRoute exact path="/estoque" component={Stock}/>
          <PrivateRoute exact path="/relatorios" component={Report}/>
          <PrivateRoute exact component={ListItems} path={[
            "/cadastro/caixas", 
            "/cadastro/fornecedores",
            "/cadastro/funcionarios",
            "/cadastro/lojas",
            "/cadastro/produtos",
            "/cadastro/usuarios",
          ]} />
          <PrivateRoute exact path="/cadastro/usuarios/u/" component={UserForm} />
          <PrivateRoute exact path="/cadastro/funcionarios/func/" component={EmployeeForm} />
          <PrivateRoute exact path="/cadastro/fornecedores/forn/" component={SupplierForm} />
          <PrivateRoute exact path="/cadastro/lojas/l/" component={StoreForm} />
          <PrivateRoute exact path="/cadastro/caixas/c/" component={CashierForm} />
          <PrivateRoute exact path="/cadastro/produtos/p/" component={ProductForm} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
  
    

    // <HashRouter basename='/'>
    //   <div className="App">
    //     <Header/>
    //     {/* <Menu /> */}
    //     {/* <Route path="/home" component={Home}/> */}
    //     {/* <Route exact path="/signup" component={Signup}/> */}
    //     <Sidebar />
    //     <PrivateRoute path="/home" component={Home} />
    //     <Route path="/login" component={Login} />
    //     <Route path="/cadastro/usuarios" component={ListItems} />
    //     <Route path="/cadastro/lojas" component={ListItems} />
    //     <Route path="/cadastro/caixas" component={ListItems} />
    //     <Route path="/cadastro/funcionarios" component={ListItems} />
    //     <Route path="/cadastro/fornecedores" component={ListItems} />
    //     <Route path="/cadastro/produtos" component={ListItems} />
        
        
    //     <Footer/>
    //   </div>
    // </HashRouter>
  // );
}

export default App;
