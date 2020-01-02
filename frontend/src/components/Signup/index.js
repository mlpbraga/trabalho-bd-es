import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import constants from '../../utils/constants';
import _ from 'lodash';
import api from '../../services/api';
import { login } from "../../services/auth";
import './styles.css';

const { apiEndpoint } = constants;

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    gender: "masc",
    birth: "",
    error: ""
  };
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  handleSignUp = e => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      gender,
      birth
    } = this.state;
    if (_.isEmpty(name)) {
      this.setState({ error: 'Preencha corretamente o campo "Nome".' });
      alert('ERROR: Preencha corretamente o campo "Nome".');
    }
    else if (_.isEmpty(email)) {
      this.setState({ error: 'Preencha corretamente o campo "Email".' })
      alert('ERROR: Preencha corretamente o campo "Email".')
    }
    else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ error: 'O campo "Email" não foi preenchido corretamente.' })
      alert('ERROR: O campo "Email" não foi preenchido corretamente.')
    }
    else if (_.isEmpty(password)) {
      this.setState({ error: 'O campo "Email" não foi preenchido corretamente.' })
      alert('ERROR: Preencha corretamente o campo "Senha".')
    }
    else if (_.isEmpty(gender)) {
      this.setState({ error: 'Preencha corretamente o campo "Gênero".' })
      alert('ERROR: Preencha corretamente o campo "Gênero".')
    }
    else if (_.isEmpty(birth)) {
      this.setState({ error: 'Preencha corretamente o campo "Data de nascimento".' })
      alert('ERROR: Preencha corretamente o campo "Data de nascimento".')
    }
    else { 
      const requestInfo = {
        method:'POST',
        body:JSON.stringify({
          username: email,
          email,
          name,
          birth: new Date(birth),
          gender,
          password,
        }),
        headers:new Headers({ 'Content-type' : 'application/json' }),
      };

      fetch(`${apiEndpoint}/users`,requestInfo)
      .then(response => {
          if(response.ok) {
              alert('Cadastro realizado.')
              return response.text();
  
          } else {
              throw new Error('Não foi possível cadastrar.');
          }
      })
      .then(async () => {
        const response = await api.post("/auth", { email, password });
        login(response.data.token);
        this.props.history.push("/project");
          // localStorage.setItem('token',token);
          // this.loadInfo();
      })
      .catch(error => {
          this.setState({msg:error.message});
      });
    };
  };

  handleOptionChange = (changeEvent) => {
    this.setState({
      gender: changeEvent.target.value
    });
  };


  render() {
    return (
      <div className='signup-container'>
        <div className='signup-warning'>
          Ao se cadastrar, você concorda que podemos utilizar a sua idade, o seu gênero e o seu julgamento a respeito dos comentários classificados. Não temos interesse de usar sua identidade em nossa pesquisa, o email é apenas um meio de realizar login no site.
        </div> 
        <div className='signup-form'>
          <form onSubmit={this.handleSignUp}>
            {this.state.error && <p className='erro-box'>{this.state.error}</p>}
            <div className='signup-input'>
              <label>Nome  </label>
              <input
                type="text"
                placeholder="Nome"
                onChange={e => this.setState({ name: e.target.value })}
                />
            </div>
            <div className='signup-input'>
              <label>Email  </label>
              <input
                type="email"
                placeholder="Endereço de e-mail"
                onChange={e => this.setState({ email: e.target.value })}
                />
            </div>
            <div className='signup-input'>
              <label>Senha  </label>
              <input
                type="password"
                placeholder="Senha"
                onChange={e => this.setState({ password: e.target.value })}
                />
            </div>
            <div className='signup-input'>
              <label>Data de nascimento  </label>
              <input
                type="date"
                placeholder="Data de nascimento"
                onChange={e => this.setState({ birth: e.target.value })}
                />
            </div>
            <div className='field'>
              <label className='radio-label'>Gênero:  </label>
              <div className='signup-input-radio'>
                <input type="radio" name='genero' value='fem' checked={this.state.gender === 'fem'} onChange={this.handleOptionChange} />   
                <label className='radio-label'> Feminino </label>
              </div>
              <div className='signup-input-radio'>
                <input type="radio" name='genero' value='masc' checked={this.state.gender === 'masc'} onChange={this.handleOptionChange} />
                <label className='radio-label'> Masculino </label>
              </div>
            </div>
            <button type="submit">Cadastrar</button>
            <Link className='link-button' to='/home'> Já sou cadastrado</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);