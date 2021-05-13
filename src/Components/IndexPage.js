import React, { Component } from 'react'

export default class IndexPage extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "rgb(255, 255, 255 )", color: "white", textAlign:"center" }}>
                <h2 style={{ paddingTop: "150px", color: "black" }}>Shab Auth</h2>
                <p className="lead"><i style={{ paddingTop: "150px", color: "black" }}>Es un sistema de autenticación seguro,  se basa en el envío y carga de un nuevo tipo de archivo (.shab) mediante correo electrónico</i> </p>
                <img className="fluid" style={{ height: "400px" }} src="./fondo.jpg" alt="Fenix - Corp - Computador" />
            </div>
        )
    }
}
