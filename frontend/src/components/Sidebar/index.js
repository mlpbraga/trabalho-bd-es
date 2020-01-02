import React from 'react';
import { withRouter } from "react-router-dom";
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import './styles.css'

const Sidebar = (props) => {
  function hide() {
    const { pathname } = props.location;
    return pathname.match('/login') || pathname.match('/signup');
  }

  return (
    <div className='sidebar' style={{display: hide() ? 'none' : '' }}>
      <div className='side-element'>
        <div className='icon'>
          <MonetizationOnOutlinedIcon htmlColor='#fff' />
        </div>  
        <a href='/caixa' >
          Caixa
        </a>
      </div>

      <div className='side-element'>
        <div className='icon'>
          <PlaylistAddOutlinedIcon htmlColor='#fff' />
        </div>  
        <a href='/estoque' >
          Requisitar estoque
        </a>
      </div>

      <div className='side-element'>
        <div className='icon'>
          <BarChartOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/relatorios' >
          Relatórios
        </a>
      </div>

      <div className='side-element section'>
        <label className='section-label'>
          Cadastros
        </label>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <ComputerOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/cadastro/caixas'>
          Caixas
        </a>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <LocalShippingOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/cadastro/fornecedores'>
          Fornecedores
        </a>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <BusinessCenterOutlinedIcon htmlColor='#fff' />
        </div>  
        <a href='/cadastro/funcionarios' >
          Funcionários
        </a>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <StorefrontOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/cadastro/lojas'>
          Lojas
        </a>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <AddShoppingCartOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/cadastro/produtos'>
          Produtos
        </a>
      </div>
      <div className='side-element'>
        <div className='icon'>
          <PersonOutlineOutlinedIcon htmlColor='#fff' />
        </div>
        <a href='/cadastro/usuarios'>
          Usuários
        </a>
      </div>
    </div>
  )
};

export default withRouter(Sidebar);