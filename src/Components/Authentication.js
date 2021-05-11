import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
//import axios from 'axios'

export default class Autentication extends Component {
    state = {
        auth: [],
        content: []
    }
    onSubmit = async e => {
        e.preventDefault();
        const newMail = {
            auth: this.state.auth.name,
            content: this.state.content[0]
        }
        /*
        console.log(newMail);
        const res2 = await axios.post('http://localhost:4000/send-email', newMail)
        //console.log("aaaaaaa", res2);
*/
    }

    //event chance typing
    onChangeInput = (e) => {
        var contenido = []
        this.setState({
            [e.target.name]: e.target.files[0]
        })

        var archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = (function (archivo) {
            return function (e) {
                if (e.target.result !== undefined) {
                    contenido.push(e.target.result)
                }
            };
        })(archivo);
        lector.readAsText(archivo)
        this.setState({ content: contenido })
    }
    async componentDidMount() {

    }


    render() {
        return (
            <div className="container p-4" style={{ height: "200px", width: "322px", marginTop: "150px", marginBottom: "370px" }}>
                <div className="card text-center">
                    <div className="card-header">
                        <h4>Autenticación</h4>
                    </div>
                    <form action="upload-script-url" encType="multipart/form-data" onSubmit={this.onSubmit} method="post">
                        <div className="card-body">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-file-earmark-fill" viewBox="0 0 16 16">
                                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="auth"
                                    name="auth"
                                    type="file"
                                    className="form-control"
                                    //value={this.state.auth}
                                    onChange={this.onChangeInput}
                                />
                            </div>



                            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "60px" }}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
