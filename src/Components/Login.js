import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UAParser from "ua-parser-js";
import axios from 'axios'

export default class Login extends Component {
    state = {
        email: '',
        pass_user: ''
    }
    //event chance typing
    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {
  
    }
    onSubmit = async e => {
        e.preventDefault();
        var parser = new UAParser();
        //console.log(parser.getResult());
       // console.log(parser.getBrowser().name);
        //console.log(parser.getDevice().model);
        let device=""
        if(parser.getDevice().model===undefined){
            device = "PC"
        }else{
            device = parser.getDevice().vendor+" - "+parser.getDevice().model+" - "+parser.getDevice().type
        }
         
        const newLogin = {
            email: this.state.email,
            password: this.state.pass_user,
            timestamp: "Pendiente de enviar",
            device ,
            browser: parser.getBrowser().name
        }
        console.log(newLogin);
        
        const res = await axios.post('http://localhost:4001/login', newLogin)
        console.log(res);
         //redirect
          window.location.href = '/authentication'
          
    }

    render() {
        return (
            <div className="container p-4" style={{ height: "200px", width: "322px", marginTop: "150px", marginBottom: "370px" }}>
                <div className="card text-center">
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="card-body">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeInput}
                                    placeholder="Correo electrónico" 
                                    required/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="bi bi-key-fill" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="pass_user"
                                    name="pass_user"
                                    type="password"
                                    value={this.state.pass_user}
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Contraseña" 
                                    required/>
                            </div>
                            {/*redirect*/}
                            <span style={{ fontSize: "11px" }}>
                                <label>No tiene cuenta</label>
                                <Link to="/register"> Cree una</Link>
                            </span>
                            {/*Decide local Storage or session Storage */}
                            <div className="form-check" style={{ marginTop: "36px", marginBottom: "25px" }}>
                                <input className="form-check-input" type="checkbox" id="session" />
                                <label className="form-check-label" htmlFor="session">
                                    <span ><small > Mantener la sesión iniciada</small></span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
