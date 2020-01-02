import React from 'react';
import { withRouter } from "react-router-dom";
import Signin from '../Signin';
import Loader from '../Loader';
import './styles.css'

const Login = () => (
  <div className='login'>
    <div className='about'>
      <p>
        Esse sistema foi desenvolvido para que redes de supermercados possam gerenciar a compra e a venda de seus produtos, entrada e saída de seus funcionários gerenciar sua rede de supermercados com tranquilidade.
      </p>
      <p>
        Para entrar no sistema, cadastre insira seu login e senha no espaço abaixo, caso ainda não tenha um usuário cadastrado, entre em contato com o seu administrador.
      </p>
    </div>
    <div className='options'>
      <Signin />
    </div>
  </div>
);

export default withRouter(Login);