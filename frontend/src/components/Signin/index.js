import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from '../../services/api';
import { login } from "../../services/auth";

import './styles.css';

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };
  
  componentDidMount() {
    this._isMounted = true;
    window.scrollTo(0, 0)
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/auth", { username, password });
        login(response.data.token);
        document.location = "http://localhost:3000/caixa"
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <div id="container" className='siginin-container'>
        <form onSubmit={this.handleSignIn}>
          {this.state.error && <p className='error-box'>{this.state.error}</p>}
          <div className='signin-input'>
            <label>Usuário  </label>
            <input
              type="text"
              placeholder="Usuário"
              onChange={e => this.setState({ username: e.target.value })}
              />
          </div>
          <div className='signin-input'>
          <label>Senha  </label>
            <input
              type="password"
              placeholder="Senha"
              onChange={e => this.setState({ password: e.target.value })}
              />
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
          {/* <Link className='link-button' to='/signup'> Cadastrar</Link> */}
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);