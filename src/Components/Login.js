import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UAParser from "ua-parser-js";

import axios from 'axios'

export default class Login extends Component {

    state = {
        email: '',
        pass_user: '',
        modalTitle2: "",
        modalMsm2: "",
        banModal2: 0
    }
    //event chance typing
    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {
        //console.log(process.env.REACT_APP_URL_BACKEND);
        document.getElementById("navigation").style.display = "none"
    }
    onSubmit = async e => {
        e.preventDefault();
        var parser = new UAParser();
        //console.log(parser.getResult());
        // console.log(parser.getBrowser().name);
        //console.log(parser.getDevice().model);
        let device = ""
        if (parser.getDevice().model === undefined) {
            device = "PC"
        } else {
            device = parser.getDevice().vendor + " - " + parser.getDevice().model + " - " + parser.getDevice().type
        }

        const newLogin = {
            email: this.state.email,
            password: this.state.pass_user,
            timestamp: Date.now(),
            device,
            browser: parser.getBrowser().name
        }
        console.log(newLogin);
        //Request backend
        const res = await axios.post(process.env.REACT_APP_URL_BACKEND + 'login', newLogin)
        console.log(res.data.success);
        //correct login (success = true)
        if (res.data.success === true) {
            //redirect
            //redirect
            document.getElementById("modalAccept2").style.display = "block"
            this.setState({ banModal2: 1, modalTitle2: "Credenciales Correctas", modalMsm2: "Se ha enviado un archivo con extensión (.shab) al correo. Verifique." })
        } else {
            document.getElementById("modalAccept2").style.display = "none"
            this.setState({ banModal2: 0, modalTitle2: "Fallo Inicio de Sesión", modalMsm2: "Credenciales incorrectas" })
        }
    }
    onclickModal(a) {
        if (a === 1) {
            window.location.href = '/authentication' //talves poner redireccion a algun correo
        } else {

        }
    }
    async componentDidMount() {
        let { headers, ban } = this.verifyAccessToken()
        //Exist token on localStorage ??
        console.log(ban);
        if (ban === 1) {
            console.log("nologed LocalStorage Vacio");
        } else {
            let res = {}
            try {
                res = await axios.get(process.env.REACT_APP_URL_BACKEND + 'verifytoken', { headers })
                /////aquii talves enviar el estado de loged o NOLOGED
                console.log(res);
            } catch (e) {
                console.log("errror", e);
            }
            //si es que el token sigue siendo válido (NO CADUCADO) -> redirigir a home O a PROVATE-PAGE
            //caso contrario (CADUCADO) -> REDIRIGIR A LOGIN O A HOME
            if (res !== {}) {
                //correct login (success = true)
                if (res.data.success === true) {  /////aquii talves enviar el estado de loged o NOLOGED
                    console.log("loged");
                    window.location.href = '/'
                    //desaparecer iniciar sesión
                } else {
                    //redirect
                }
            } else {

            }
        }
    }
    verifyAccessToken = () => {
        var headers = {}
        let ban = 0
        if (localStorage.getItem('login')) {
            let a = JSON.parse(localStorage.getItem('login'))
            headers = {
                authorization: a.token
            }
        }
        else {
            ban = 1
        }
        return { headers, ban }
    }

    render() {
        return (
            <div className="container p-4" style={{ height: "200px", width: "350px", textAlign: "center" }}>
                {/*Modal confirmation*/}
                <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel2">{this.state.modalTitle2}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.modalMsm2}
                            </div>
                            <div className="modal-footer">
                                <button id="modalAccept2" type="button" className="btn btn-primary" onClick={() => this.onclickModal(this.state.banModal2)}>continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span style={{ fontSize: "30px", opacity: "0.6" }}><b>Shab Auth</b></span>
                <div className="card text-center" style={{ marginTop: "100px", border: "none" }}>
                    <div className="card-header">
                        <h5>Login</h5>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="card-body">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
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
                                />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
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
                                />
                            </div>
                            {/*redirect*/}
                            <span style={{ fontSize: "11px" }}>
                                <label>No tiene cuenta</label>
                                <Link to="/register"> Cree una.</Link>
                            </span>

                            <button data-toggle="modal" data-target="#exampleModal2" style={{ marginTop: "50px" }} type="submit" className="btn btn-primary btn-block">Ingresar</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
