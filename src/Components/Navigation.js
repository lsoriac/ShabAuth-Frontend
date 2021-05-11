import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(50,50,50)" }}>
                <Link className="navbar-brand" to="/">ShapAuth
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
                    </ul>
                </div>
            </nav>
        )
    }
}
