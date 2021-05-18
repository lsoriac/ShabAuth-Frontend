import React, { Component } from 'react'
import axios from 'axios'
export default class IndexPage extends Component {
    async componentDidMount() {
        let { headers, ban } = this.verifyAccessToken()
        //Exist token on sessionStorage ??
        if (ban === 1) {
            console.log("nologed sessionStorage Vacio");
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
