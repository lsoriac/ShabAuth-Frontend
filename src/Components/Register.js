import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'


export default class Register extends Component {

    state = {
        title_card: "Datos Personales",

        name: '',
        id_card: '',
        birth: '',
        gender: '',
        gender_list: ["Maculino", "Femenino"],

        profession: '',

        email: '',
        cel: '',

        user: '',
        pass: '',
        pass_confirm: '',

        country: '',
        city: '',
        address: '',

        err_pass: 'Debe completar este campo',
        err_pass_user_confirm: 'Debe completar este campo'
    }
    onSubmit = async e => {
        e.preventDefault();
        const newRegister = {
            email: this.state.email,
            id_card: this.state.id_card,
            username: this.state.user,
            password: this.state.pass,
            cellPhone: this.state.cel,
            birth: this.state.birth,
            gender: this.state.gender,
            profession: this.state.profession,
            fullName: this.state.name,

            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
        }
        //Request backend
        const res = await axios.post(process.env.REACT_APP_URL_BACKEND + 'register', newRegister)
        console.log(res);
        //redirect
        //window.location.href = '/'
        
       //console.log(newRegister);
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
        if (e.target.name === "pass") {
            document.getElementById('pass').style.borderColor = 'Green'
            document.getElementById('pass_user_err').style.display = 'None'
            if (this.validSegurityPass(document.getElementById("pass").value)) {
                this.setState({ err_pass: "Verificado" })
                //icons svg
                document.getElementById('check').style.display = "Inline"
                document.getElementById('noCheck').style.display = "None"
                //message
                document.getElementById('pass_user_err').style.color = 'Green'
                document.getElementById('pass_user_err').style.display = 'Block'

            } else {
                //icons svg
                document.getElementById('check').style.display = "None"
                document.getElementById('noCheck').style.display = "Inline"
                //message err
                document.getElementById('pass_user_err').style.color = 'Red'
                document.getElementById('pass_user_err').style.display = 'Block'
            }
            this.validPassError()
        }
        if (e.target.name === "pass_confirm") {
            //message err
            document.getElementById('pass_confirm').style.borderColor = 'Green'
            document.getElementById('pass_user_confirm_err').style.display = 'None'
            this.validPassError()
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
            "Datos Personales", "Datos de Contacto", "Datos de Seguridad", "Datos de Localización"
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
                        console.log(i);
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
        if (document.getElementById("pass").value === document.getElementById("pass_confirm").value) {
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
                this.setState({ err_pass: "Debe incluír almenos 1 letra Mayúscula" })
                document.getElementById('pass').style.borderColor = 'Red'
            }
            if (lower === false) {
                this.setState({ err_pass: "Debe incluír almenos 1 letra Minúscula" })
                document.getElementById('pass').style.borderColor = 'Red'
            }
            if (num === false) {
                this.setState({ err_pass: "Debe incluír almenos 1 Número" })
                document.getElementById('pass').style.borderColor = 'Red'
            }
            if (character === false) {
                this.setState({ err_pass: "Debe incluír almenos 1 Símbolo" })
                document.getElementById('pass').style.borderColor = 'Red'
            }
            if (upper === true && lower === true && character === true && num === true) {
                return true;
            }
        } else {
            this.setState({ err_pass: "Mínimo de 8" })
            document.getElementById('pass').style.borderColor = 'Red'
        }
        return false;
    }

    async componentDidMount() {
        document.getElementById('data_1').style.display = 'Block'
        document.getElementById('data_2').style.display = 'None'
        document.getElementById('data_3').style.display = 'None'
        document.getElementById('data_4').style.display = 'None'

        document.getElementById('btn_next').style.display = 'inline-block'
        document.getElementById('btn_next').style.marginLeft = '225px'
        document.getElementById('btn_previous').style.marginRight = '225px'
        document.getElementById('btn_previous').style.display = 'None'

        document.getElementById('btn_end').style.display = 'None'

        document.getElementById('pass_user_err').style.display = 'None'
        document.getElementById('pass_user_confirm_err').style.display = 'None'
        document.getElementById('check').style.display = "None"


        document.getElementById('birth').style.border = 'None'

        //default value select List
        document.getElementById("gender").value = "Maculino"

        //hidden errors
        document.getElementById('name_err').style.display = 'None'
        document.getElementById('id_card_err').style.display = 'None'
        document.getElementById('profession_err').style.display = "None"
        document.getElementById('email_err').style.display = 'None'
        document.getElementById('cel_err').style.display = 'None'
        document.getElementById('user_err').style.display = 'None'
        document.getElementById('country_err').style.display = 'None'
        document.getElementById('city_err').style.display = "None"
        document.getElementById('address_err').style.display = 'None'
    }

    

    render() {
        return (
            <div className="container p-4" style={{ height: "200px", width: "322px", marginTop: "150px", marginBottom: "370px" }}>

                <div className="card text-center" >
                    <div className="card-header" style={{ background: "rgb(74,154,233)", color:"white"}}>
                        {/*Change data pages*/}
                        <h5>{this.state.title_card}</h5>
                    </div>
                    <form onSubmit={this.onSubmit} >
                        {/*Fields 1*/}
                        <div className="card-body" id="data_1">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }} >
                                <div className="input-group-prepend">
                                    <div className="input-group-text" style={{  backgroundColor:"rgb(74,154,233)"}}><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(255,255,255)" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillrulee="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Nombre" 
                                    required/>
                            </div>
                            {/*error 1*/}
                            <div id="name_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                        <path fillrulee="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="id_card"
                                    name="id_card"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Cédula" 
                                    required/>
                            </div>
                            {/*error 2*/}
                            <div id="id_card_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-calendar-event" viewBox="0 0 16 16">
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
                                        required
                                        onChange={this.onChangeDateBirth} //only when value has changed
                                    />
                                </div>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
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


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-archive-fill" viewBox="0 0 16 16">
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
                                    required
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


                        {/*Fields 2*/}
                        <div className="card-body" id="data_2">
                            <div className="input-group mb-2" style={{ marginTop: "30px" }} >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Correo electrónico" 
                                    required/>
                            </div>
                            {/*error 4*/}
                            <div id="email_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend" >
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-phone-fill" viewBox="0 0 16 16">
                                        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="cel"
                                    name="cel"
                                    type="number"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Celular"
                                    required
                                />
                            </div>
                            {/*error 5*/}
                            <div id="cel_err" style={{ color: "red" }}>
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
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillrulee="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Usuario"
                                    required />
                            </div>
                            {/*error 6*/}
                            <div id="user_err" style={{ color: "red" }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <small>Debe completar este campo</small>
                                </span>
                            </div>


                            <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="bi bi-key-fill" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="pass"
                                    name="pass"
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Contraseña" 
                                    required/>
                            </div>
                            

                            {/*error */}
                            <div id="pass_user_err" style={{ color: "red" }}>
                                <span>
                                    <svg id="noCheck" xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <svg id="check" xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                    <small>{this.state.err_pass}</small>
                                </span>
                            </div>


                            <div className="input-group mb-2 " >
                                <div className="input-group-prepend" >
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" fill="rgb(0,0,0)" className="bi bi-key" viewBox="0 0 16 16">
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
                                    required
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
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-map-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="País" 
                                    required/>
                            </div>
                            {/*error 7*/}
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
                                    <div className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
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
                                    required
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
                                    <div className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0,0,0)" className="bi bi-geo-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                                    </svg></div>
                                </div>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    placeholder="Dirección" 
                                    required/>
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

                        <button id="btn_end" style={{ marginTop: "30px", background: "rgb(49,140,231)" }} type="submit" className="btn btn-primary btn-block">Finalizar</button>
                    </form>
                </div>
            </div>

        )
    }
}
