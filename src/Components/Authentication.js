import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Autentication extends Component {
    state = {
        auth: [],
        content: [],
        selectedFile: null,
        ext: ''
    }
    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
    };
    onSubmit = async e => {
        e.preventDefault();
        const newMail = {
            auth: this.state.auth.name,
            content: this.state.content[0]
        }

        //console.log(newMail);
        //const res2 = await axios.post('http://localhost:4001/authfile', newMail)
        //console.log("aaaaaaa", res2);

    }
    onFileUpload = async e => {
        let email = ""
        if (sessionStorage.getItem('param')) {
            let a = JSON.parse(sessionStorage.getItem('param'))
            email= a.email
            console.log("Si hay correo");
        }
        else {
            console.log("No hay correo");
        }
        var fileInput = document.getElementById('auth');
        var filePath = fileInput.value;
        var allowedExtensions = /(.shab)$/i;
        if (allowedExtensions.exec(filePath)) {
            document.getElementById('auth').style.borderColor = 'Green'
            document.getElementById('ext_err').style.display = 'None'
            console.log("Extension válida");

            // Create an object of formData 
            const formData = new FormData();

            // Update the formData object 
            formData.append(
                "myShab",
                this.state.selectedFile,
                this.state.selectedFile.name,
                this.state.selectedFile.timestamp = Date.now()

            );
            formData.append("email", email);

            // Details of the uploaded file 
            //console.log(this.state.selectedFile);

            // Request made to the backend api 
            // Send formData object 
            let data = {}
            //Request backend
            const res = await axios.post(process.env.REACT_APP_URL_BACKEND + 'authfile', formData)
            console.log(res)
            if (res.data.success === true) {
                console.log("Ha sido autenticado");

                //create token on local storage
                data = {
                    token: res.data.token
                }
                sessionStorage.setItem('login', JSON.stringify(data))
                //redirect
                window.location.href = '/private-page'

            } else {
                console.log("Hubo un error al confirmar el archivo");
            }
        } else {
            if (this.state.selectedFile){
                this.setState({ ext: "El archivo "+this.state.selectedFile.name+"no cumple con la extensión solicitada (.shab)" })
            }else{
                this.setState({ ext: "No ha subido ningun archivo" })
            }
            
            document.getElementById('auth').style.borderColor = 'Red'
            document.getElementById('ext_err').style.display = 'Block'
            console.log("Extension no válida");
        }
    };

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
        document.getElementById('ext_err').style.display = 'None'

        let { headers, ban } = this.verifyAccessToken()
        //Exist token on sessionStorage ??
        console.log(ban);
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
                                    name="myShab"
                                    type="file"
                                    className="form-control"
                                    accept=".shab"
                                    onChange={this.onFileChange}
                                />
                            </div>
                            {/*error 1*/}
                            <div id="ext_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.ext}</small>
                                </span>
                            </div>
                            <button onClick={this.onFileUpload} className="btn btn-primary btn-block" style={{ marginTop: "60px" }}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
