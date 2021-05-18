import React, { Component } from 'react'
import axios from 'axios'

export default class ConfirmAuthentication extends Component {
    async componentDidMount() {
        let headers = this.verifyAccessToken()
        const res = await axios.get(process.env.REACT_APP_URL_BACKEND + 'verifytoken', {headers})
        console.log(res);
        //correct login (success = true)
        if (res.data.success === true) {
            //redirect
            console.log("loged");
            //desaparecer iniciar sesión
        } else {
            console.log("nologed");
            //window.location.href = '/'
        }
    }
    verifyAccessToken = ()=>{
        var headers ={}
        if (localStorage.getItem('login')) {
            let a = JSON.parse(localStorage.getItem('login'))
            headers = {
                authorization: a.token 
            }
        }
        else{
            
        }
        return headers
    }
    render() {

       
        return (
            <div>
                Esto solo aparece cuando está autenticado
            </div>
        )
    }
}
