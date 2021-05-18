import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import countries from './data/countries.json'
import { Link } from 'react-router-dom'


export default class Register extends Component {

    state = {
        title_card: "Datos Personales",

        fullName: '',
        id_card: '',
        civil_status: '',
        civil_status_list: ["Estado Civil", "Soltero", "Casado", "Divorsiado", "Separado en proceso", "Viudo", "Concubinato", "Otro"],
        instruction: '',
        instruction_list: ["Instrucción", "Eduación Primaria", "Educación Secundaria", "Tercer Nivel"],
        profession: '',

        etnia: '',
        etnia_list: ["Etnia", "Mestizo", "Mulato", "Morisco", "Castizo", "Zambo", "Blanco", "Cholo", "Otra"],
        gender: '',
        gender_list: ["Género", "Masculino", "Femenino"],
        birth: '',
        nationality: '',
        origin_country: '',

        email: '',
        cellPhone: '',

        username: '',
        password: '',
        pass_confirm: '',

        country: '',
        city: '',
        address: '',

        password_err: 'Debe completar este campo',
        err_pass_user_confirm: 'Debe completar este campo',
        id_card_err: 'Debe completar este campo',
        email_err: 'Debe completar este campo',
        cellPhone_err: 'Debe completar este campo',
        username_err: 'Debe completar este campo',

        list_fields: ["fullName", "id_card", "profession", "email", "cellPhone", "username", "city", "address", "civil_status", "instruction", "etnia", "gender", "nationality", "origin_country", "country", "password"],


        modalTitle: "",
        modalMsm: "",
        banModal: 0
    }
    onSubmit = async e => {
        e.preventDefault();
        const newRegister = {
            fullName: this.state.fullName,
            id_card: this.state.id_card,
            birth: this.state.birth.toString(),
            gender: this.state.gender,
            profession: this.state.profession,
            civil_status: this.state.civil_status,
            instruction: this.state.instruction,
            etnia: this.state.etnia,
            nationality: this.state.nationality,
            origin_country: this.state.origin_country,
            email: this.state.email,
            cellPhone: this.state.cellPhone,
            username: this.state.username,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address
        }
        const obj_fiels_err = {
            fullName: this.state.fullName,
            id_card: this.state.id_card,
            gender: this.state.gender,
            profession: this.state.profession,
            civil_status: this.state.civil_status,
            instruction: this.state.instruction,
            etnia: this.state.etnia,
            nationality: this.state.nationality,
            origin_country: this.state.origin_country,
            email: this.state.email,
            cellPhone: this.state.cellPhone,
            username: this.state.username,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
        }
        var list_fiels_err = []
        console.log(newRegister);

        let ban = 0
        for (let i in obj_fiels_err) {
            if (obj_fiels_err[i] === "") {
                ban = 1
                list_fiels_err.push(i)
            }
        }
        console.log(list_fiels_err);
        if (ban === 1) {
            //console.log("Popup de que hay campos sin llenar");
            document.getElementById("modalAccept").style.display = "none"
            this.setState({ banModal: 0, modalTitle: "Fallo Registro", modalMsm: "Los datos no se han registrado de forma correcta. Por favor revise que todos los campos este llenos" })
            for (let i in this.state.list_fields) {
                for (let j = 0; j < list_fiels_err.length; j++) {
                    if (list_fiels_err[j] === this.state.list_fields[i]) {
                        //message err
                        document.getElementById(this.state.list_fields[i]).style.borderColor = 'Red'
                        document.getElementById(this.state.list_fields[i] + '_err').style.display = 'Block'
                    }
                }
            }
        } else {
            console.log("Todo lleno");
            
            //console.log("Manda Request");
            //Request backend
            const res = await axios.post(process.env.REACT_APP_URL_BACKEND + 'register', newRegister)
            if (res.data.success === true) {
                //redirect
                document.getElementById("modalAccept").style.display = "block"
                this.setState({ banModal: 1, modalTitle: "Registro Exitoso", modalMsm: "Los datos se han registrado de forma correcta." })

                // window.location.href = '/authentication'
            } else {
                document.getElementById("modalAccept").style.display = "none"
                this.setState({ banModal: 0, modalTitle: "Fallo Registro", modalMsm: "Los datos no se han registrado" })
                // console.log("Credenciales incorrectas");

            }
            console.log(res);
            //redirect
            //window.location.href = '/'
            //console.log(newRegister);
            
        }
    }
    onChangeDateBirth = birth => {
        this.setState({ birth })
    }

    //event chance typing
    onChangeInput = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        //Error control change
        for (let i in this.state.list_fields) {
            if (e.target.name === this.state.list_fields[i]) {
                //message err
                document.getElementById(this.state.list_fields[i]).style.borderColor = 'Green'
                document.getElementById(this.state.list_fields[i] + '_err').style.display = 'None'
            }
        }
        //Error control change
        if (e.target.name === "password") {
            document.getElementById('password').style.borderColor = 'Green'
            document.getElementById('password_err').style.display = 'None'
            if (this.validSegurityPass(document.getElementById("password").value)) {
                this.setState({ password_err: "Verificado" })
                //icons svg
                document.getElementById('check').style.display = "Inline"
                document.getElementById('noCheck').style.display = "None"
                //message
                document.getElementById('password_err').style.color = 'Green'
                document.getElementById('password_err').style.display = 'Block'

            } else {
                //icons svg
                document.getElementById('check').style.display = "None"
                document.getElementById('noCheck').style.display = "Inline"
                //message err
                document.getElementById('password_err').style.color = 'Red'
                document.getElementById('password_err').style.display = 'Block'
            }
            this.validPassError()
        }
        if (e.target.name === "pass_confirm") {
            //message err
            document.getElementById('pass_confirm').style.borderColor = 'Green'
            document.getElementById('pass_user_confirm_err').style.display = 'None'
            this.validPassError()
        }
        if (e.target.name === "id_card") {
            if (this.validIdCard(document.getElementById("id_card").value) === true) {
                //message err
                document.getElementById('id_card').style.borderColor = 'Green'
                document.getElementById('id_card_err').style.display = 'None'
            } else {
                document.getElementById('id_card_err').style.display = 'Block'
            }
        }
        if (e.target.name === "email") {
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.exec(e.target.value)) {
                document.getElementById('email').style.borderColor = 'Green'
                document.getElementById('email_err').style.display = 'None'
            } else {
                this.setState({ email_err: "Dirección de correo no válida" })
                document.getElementById('email').style.borderColor = 'Red'
                document.getElementById('email_err').style.display = 'Block'
            }
        }
        if (e.target.name === "cellPhone") {
            if (this.validCellPhone(document.getElementById("cellPhone").value) === true) {
                //message err
                document.getElementById('cellPhone').style.borderColor = 'Green'
                document.getElementById('cellPhone_err').style.display = 'None'
            } else {
                this.setState({ cellPhone_err: "El número telefónico debe contener 10 dígitos" })
                document.getElementById('cellPhone').style.borderColor = 'Red'
                document.getElementById('cellPhone_err').style.display = 'Block'
            }
        }

        if (e.target.name === "username") {
            var noValido = /\s/;
            if (noValido.exec(e.target.value)) {
                this.setState({ username_err: "El nombre de usuario no debe contener espacios en blanco" })
                document.getElementById('username').style.borderColor = 'Red'
                document.getElementById('username_err').style.display = 'Block'
            } else {
                document.getElementById('username').style.borderColor = 'Green'
                document.getElementById('username_err').style.display = 'None'
            }
        }
      
    }

    changeFields(ban) {
        var obj_fields = [
            document.getElementById('data_1'),
            document.getElementById('data_2'),
            document.getElementById('data_3'),
            document.getElementById('data_4')
        ]
        var titles_card = [
            "Datos Personales", "Datos de Origen", "Datos de Seguridad y Contacto", "Datos de Localización"
        ]
        for (let i = 0; i < 4; i++) {
            if (obj_fields[i].style.display === "block") {
                obj_fields[i].style.display = "None"
                if (ban === 0) {
                    if (i !== 0) {
                        obj_fields[(i - 1)].style.display = "Block"
                        this.setState({ title_card: titles_card[i - 1] })
                        break;
                    }
                } else {
                    if (i !== 3) {
                        obj_fields[(i + 1)].style.display = "Block"
                        this.setState({ title_card: titles_card[i + 1] })
                        break;
                    }
                }
            }
        }
        this.changeIconsNextPrev(obj_fields[3].style.display, obj_fields[0].style.display)
    }

    changeIconsNextPrev(field_1, field_2) {
        if (field_1 === "block") {
            document.getElementById('btn_next').style.display = 'None'
            //document.getElementById('btn_previous').style.marginRight = '10px'
            document.getElementById('btn_end').style.display = 'Block'
        } else {
            document.getElementById('btn_next').style.display = 'inline-block'
            document.getElementById('btn_next').style.marginLeft = '100px'
            document.getElementById('btn_previous').style.marginRight = '100px'
            document.getElementById('btn_end').style.display = 'None'
        }
        if (field_2 === "block") {
            document.getElementById('btn_previous').style.display = 'None'
            document.getElementById('btn_next').style.marginLeft = '225px'
        } else {
            document.getElementById('btn_previous').style.display = 'inline-block'
            document.getElementById('btn_next').style.marginLeft = '100px'
            if (field_1 === "block") {
                document.getElementById('btn_previous').style.marginRight = '225px'
            } else {
                document.getElementById('btn_previous').style.marginRight = '100px'
            }
        }
    }

    validPassError() {
        // valid or invalid visual err
        if (document.getElementById("password").value === document.getElementById("pass_confirm").value) {
            document.getElementById('pass_user_confirm_err').style.display = 'None'
        } else {
            this.setState({ err_pass_user_confirm: 'Este campo debe ser igual a la contraseña ingresada' })
            document.getElementById('pass_confirm').style.borderColor = 'Red'
            document.getElementById('pass_user_confirm_err').style.display = 'Block'
        }
    }
    // validate segurity password 
    validSegurityPass(pass) {
        if (pass.length >= 8) {
            var upper = false;
            var lower = false;
            var num = false;
            var character = false;
            for (var i = 0; i < pass.length; i++) {
                if (pass.charCodeAt(i) >= 65 && pass.charCodeAt(i) <= 90) {
                    upper = true;
                }
                else if (pass.charCodeAt(i) >= 97 && pass.charCodeAt(i) <= 122) {
                    lower = true;
                }
                else if (pass.charCodeAt(i) >= 48 && pass.charCodeAt(i) <= 57) {
                    num = true;
                }
                else {
                    character = true;
                }
            }
            if (upper === false) {
                this.setState({ password_err: "Debe incluír almenos 1 letra Mayúscula" })
                document.getElementById('password').style.borderColor = 'Red'
            }
            if (lower === false) {
                this.setState({ password_err: "Debe incluír almenos 1 letra Minúscula" })
                document.getElementById('password').style.borderColor = 'Red'
            }
            if (num === false) {
                this.setState({ password_err: "Debe incluír almenos 1 Número" })
                document.getElementById('password').style.borderColor = 'Red'
            }
            if (character === false) {
                this.setState({ password_err: "Debe incluír almenos 1 Símbolo" })
                document.getElementById('password').style.borderColor = 'Red'
            }
            if (upper === true && lower === true && character === true && num === true) {
                return true;
            }
        } else {
            this.setState({ password_err: "Mínimo de 8" })
            document.getElementById('password').style.borderColor = 'Red'
        }
        return false;
    }
    validIdCard(cedula) {
        //Preguntamos si la cedula consta de 10 digitos
        if (cedula.length == 10) {
            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0, 2);
            //Pregunto si la region existe ecuador se divide en 24 regiones
            if (digito_region >= 1 && digito_region <= 24) {
                // Extraigo el ultimo digito
                var ultimo_digito = cedula.substring(9, 10);
                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) { var numero1 = (numero1 - 9); }

                var numero3 = cedula.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) { var numero3 = (numero3 - 9); }

                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) { var numero5 = (numero5 - 9); }

                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) { var numero7 = (numero7 - 9); }

                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) { var numero9 = (numero9 - 9); }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;
                //Suma total
                var suma_total = (pares + impares);
                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);
                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;
                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;
                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;
                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    return true
                } else {
                    this.setState({ id_card_err: "La cédula es incorrecta" })
                    document.getElementById('id_card').style.borderColor = 'Red'
                }
            } else {
                // imprimimos en consola si la region no pertenece
                this.setState({ id_card_err: "Esta cédula no pertenece a ninguna región" })
                document.getElementById('id_card').style.borderColor = 'Red'
            }
        } else {
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            this.setState({ id_card_err: "la cédula debe contener 10 Dígitos" })
            document.getElementById('id_card').style.borderColor = 'Red'
        }
        return false
    }
    validCellPhone(cell) {
        if (cell.length === 10) {
            return true
        }
        return false
    }
    async componentDidMount() {
        document.getElementById("navigation").style.display = "none"

        document.getElementById('data_1').style.display = 'Block'
        document.getElementById('data_2').style.display = 'None'
        document.getElementById('data_3').style.display = 'None'
        document.getElementById('data_4').style.display = 'None'

        document.getElementById('btn_next').style.display = 'inline-block'
        document.getElementById('btn_next').style.marginLeft = '225px'
        document.getElementById('btn_previous').style.marginRight = '225px'
        document.getElementById('btn_previous').style.display = 'None'

        document.getElementById('btn_end').style.display = 'None'

        document.getElementById('password_err').style.display = 'None'
        document.getElementById('pass_user_confirm_err').style.display = 'None'
        document.getElementById('check').style.display = "None"


        document.getElementById('birth').style.border = 'None'

        //hidden errors
        for (let i in this.state.list_fields) {
            document.getElementById(this.state.list_fields[i] + '_err').style.display = 'None'
        }

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
    onclickModal(a) {
        if (a === 1) {
            window.location.href = '/login'
        } else {

        }
    }

    render() {
        return (
            <div className="container p-4" style={{ height: "200px", width: "400px", textAlign: "center" }}>
                {/*Modal confirmation*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.modalTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.modalMsm}
                            </div>
                            <div className="modal-footer">
                                <button id="modalAccept" type="button" className="btn btn-primary" onClick={() => this.onclickModal(this.state.banModal)}>continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span style={{ fontSize: "30px", opacity: "0.6" }}><b>Shab Auth</b></span>
                <div className="card text-center" style={{ marginTop: "100px", border: "none" }}>
                    <div className="card-header">
                        {/*Change data pages*/}
                        <h5>{this.state.title_card}</h5>
                    </div>
                    <form onSubmit={this.onSubmit} >

                        <span style={{ fontSize: "11px" }}>
                            <label>¿Ya tiene cuenta?</label>
                            <Link to="/login"> Iniciar Sesión.</Link>
                        </span>
                        {/*Fields 1*/}
                        <div className="card-body" id="data_1">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }} >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillrulee="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Nombre"
                                />
                            </div>
                            {/*error 1*/}
                            <div id="fullName_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path fillrulee="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="id_card"
                                    name="id_card"
                                    type="number"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Cédula"
                                />
                            </div>
                            {/*error 2*/}
                            <div id="id_card_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.id_card_err}</small>
                                </span>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="civil_status"
                                    id="civil_status">
                                    {
                                        this.state.civil_status_list.map((p) =>
                                            (<option key={p} value={p} >{p}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="civil_status_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="instruction"
                                    id="instruction">
                                    {
                                        this.state.instruction_list.map((p) =>
                                            (<option key={p} value={p} >{p}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="instruction_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="profession"
                                    name="profession"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder=" Profesión"
                                />
                            </div>
                            {/*error 3*/}
                            <div id="profession_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>
                        </div>


                        {/*Fields 2 >*/}
                        <div className="card-body" id="data_2">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="etnia"
                                    id="etnia">
                                    {
                                        this.state.etnia_list.map((p) =>
                                            (<option key={p} value={p} >{p}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="etnia_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="gender"
                                    id="gender">
                                    {
                                        this.state.gender_list.map((p) =>
                                            (<option key={p} value={p} >{p}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="gender_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg></div>
                                </div>
                                <div className="form-control" >
                                    <DatePicker
                                        id="birth"
                                        name="birth"
                                        selected={this.state.birth}
                                        placeholderText="Fecha Nacimiento"
                                        className="input-group-date"
                                        display="disabled"
                                        onChange={this.onChangeDateBirth} //only when value has changed
                                    />
                                </div>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="origin_country"
                                    id="origin_country">
                                    <option key="pais_origen" value="" >País de Origen</option>
                                    {
                                        countries.countries.map((p) =>
                                            (<option key={p.code} value={p.name_es} >{p.name_es}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="origin_country_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="nationality"
                                    id="nationality">
                                    <option key="nacionalidad" value="" >Nacionalidad</option>
                                    {
                                        countries.countries.map((p) =>
                                            (<option key={p.code} value={p.name_es} >{p.name_es}</option>))
                                    }
                                </select>
                            </div>
                            {/*error 1*/}
                            <div id="nationality_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>
                        </div>


                        {/*Fields 3*/}
                        <div className="card-body" id="data_3">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }} >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillrulee="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Usuario" />
                            </div>
                            {/*error 6*/}
                            <div id="username_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.username_err}</small>
                                </span>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Correo electrónico" />
                            </div>
                            {/*error 4*/}
                            <div id="email_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.email_err}</small>
                                </span>
                            </div>


                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend" >
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="cellPhone"
                                    name="cellPhone"
                                    type="number"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Celular"
                                />
                            </div>
                            {/*error 5*/}
                            <div id="cellPhone_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.cellPhone_err}</small>
                                </span>
                            </div>
                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Contraseña" />
                            </div>


                            {/*error */}
                            <div id="password_err" style={{ color: "red" }}>
                                <span>
                                    <svg id="noCheck" xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <svg id="check" xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                    <small>{this.state.password_err}</small>
                                </span>
                            </div>


                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend" >
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="pass_confirm"
                                    name="pass_confirm"
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Confirmar contraseña"
                                />
                            </div>
                            {/*error */}
                            <div id="pass_user_confirm_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>{this.state.err_pass_user_confirm}</small>
                                </span>
                            </div>
                        </div>


                        {/*Fields 4*/}
                        <div className="card-body" id="data_4">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }} >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z" />
                                    </svg></div>
                                </div>
                                <select className="form-control" onChange={this.onChangeInput}
                                    name="country"
                                    id="country">
                                    <option key="pais" value="" >País</option>
                                    {
                                        countries.countries.map((p) =>

                                            (<option key={p.code} value={p.name_es} >{p.name_es}</option>))
                                    }
                                </select>

                            </div>
                            {/*error 1*/}
                            <div id="country_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend" >
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Ciudad"
                                />
                            </div>
                            {/*error 8*/}
                            <div id="city_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>

                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="icons-fields" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Dirección" />
                            </div>
                            {/*error 9*/}
                            <div id="address_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>
                        </div>

                        {/*Icons Prev and Next*/}
                        <span>
                            <svg id="btn_previous" onClick={() => this.changeFields(0)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(49,140,231)" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                            <svg id="btn_next" onClick={() => this.changeFields(1)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(49,140,231)" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </span>
                        <button data-toggle="modal" data-target="#exampleModal" id="btn_end" style={{ marginTop: "30px", background: "rgb(25, 118, 210)" }} type="submit" className="btn btn-primary btn-block">Finalizar</button>
                    </form>
                </div>
            </div>
        )
    }
}
