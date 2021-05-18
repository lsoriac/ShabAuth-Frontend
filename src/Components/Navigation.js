import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class Navigation extends Component {
    async componentDidMount() {
        let { headers, ban } = this.verifyAccessToken()
        //Exist token on sessionStorage ??
        if (ban === 1) {
            console.log("nologed sessionStorage Vacio");
            document.getElementById("login").style.display = "Block"
                    document.getElementById("register").style.display = "Block"
                    document.getElementById("close").style.display = "None"
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
                    document.getElementById("login").style.display = "None"
                    document.getElementById("register").style.display = "None"
                    document.getElementById("close").style.display = "Block"
                    //window.location.href = '/'
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
        if (sessionStorage.getItem('login')) {
            let a = JSON.parse(sessionStorage.getItem('login'))
            headers = {
                authorization: a.token
            }
        }
        else {
            ban = 1
        }
        return { headers, ban }
    }


    onClickClose = async () => {
        if (sessionStorage.getItem('login')) {
            sessionStorage.removeItem('login');
        } else {
            document.getElementById("close").style.display = "none"
        }
        window.location.href = '/'
    }
    render() {
        return (
            <nav id= "navigation" className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(25,118,210)" }}>
                <Link className="navbar-brand" to="/">ShabAuth
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" fill="currentColor" className="bi bi-caret-down-square" viewBox="0 0 16 16">
                        <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z" />
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z" />
                    </svg>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li style={{ marginLeft: "20px" }} className="nav-item" id="register">
                            <Link className="navbar-brand" to="/register">Registrarse
                        </Link>
                        </li>
                        <li style={{ marginLeft: "20px" }} className="nav-item" id="login">
                            <Link className="navbar-brand" to="/login">Iniciar Sesión
                        </Link>
                        </li>
                        <li style={{ marginLeft: "20px" }} className="nav-item" id="close" onClick={() => this.onClickClose()}>
                            <Link className="navbar-brand" to="/">Cerrar Sesión
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
