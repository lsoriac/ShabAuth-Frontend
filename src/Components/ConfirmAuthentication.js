import React, { Component } from 'react'
import axios from 'axios'

export default class ConfirmAuthentication extends Component {
    state = {
        account: ""
    }
    async componentDidMount() {
        let email = ""
        if (sessionStorage.getItem('param')) {
            let a = JSON.parse(sessionStorage.getItem('param'))
            email= a.email
            //console.log("Si hay correo");
        }
        else {
            //console.log("No hay correo");
        }
        this.setState({account: email})
        let headers = this.verifyAccessToken()
        const res = await axios.get(process.env.REACT_APP_URL_BACKEND + 'verifytoken', {headers})
        //console.log(res);
        //correct login (success = true)
        if (res.data.success === true) {
            //redirect
            //desaparecer iniciar sesión
        } else {
            //console.log("nologed");
            window.location.href = '/'
        }
        
        this.setState({account: email})
    }
    verifyAccessToken = ()=>{
        var headers ={}
        if (sessionStorage.getItem('login')) {
            let a = JSON.parse(sessionStorage.getItem('login'))
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
            <div className="container p-4" style={{ height: "200px", width: "350px", textAlign: "center" }}>
                
                <span style={{ fontSize: "30px", opacity: "0.6" }}><b>Shab Auth</b></span>
                <div className="card text-center" style={{ marginTop: "100px", border: "none" }}>
                    <div className="card-header">
                        <h5>Bienvenido</h5>
                    </div>

                        <div className="card-body">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="account"
                                    name="account"
                                    type="text"
                            
                                    value={this.state.account}
                                    className="form-control"
                                />   
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
