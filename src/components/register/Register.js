import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    toggleBtnView = (btn, state) => {
        switch (state) {
            default:
                btn.setAttribute("value", "Register")
                btn.setAttribute("disabled", "false")
                break
            case "deactivate":
                btn.style.backgroundColor = "grey"
                btn.setAttribute("value", "Registering...")
                btn.setAttribute("disabled", "true")
                break
            case "activate":
                btn.style.backgroundColor = "none"
                btn.setAttribute("value", "Register")
                btn.setAttribute("disabled", "false")

                break
        }
        return

    }

    // ADDITION: function used for showing and hiding error messages relating to the email and password input fields
    showErrorMessage = (email, password, name) =>{
        const nameError = document.getElementById("registerNameError")
        const emailError = document.getElementById("registerEmailError")
        const passwordError = document.getElementById("registerPasswordError")

        if(!email){
            emailError.style.opacity = "100%"
        } else {
            emailError.style.opacity = "0%"
        }
        if(!password){
            passwordError.style.opacity = "100%"
        } else {
            passwordError.style.opacity = "0%"
        }
        if(!name){
            nameError.style.opacity = "100%"
        } else {
            nameError.style.opacity = "0%"
        }
    }

    onSubmitSignIn = (event) => {
        const {email, password, name} = this.state

        if(email && password && name){
            this.toggleBtnView(event.target, "deactivate")
            fetch('https://smart-brain-faceapp1.herokuapp.com/register', {
                method: 'post',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    email : this.state.email,
                    password : this.state.password,
                    name: this.state.name
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
            .then(this.toggleBtnView(event.target, "activate"))
            return
        } else { //if both email and password input fields are empty, then show error message
            this.showErrorMessage(email, password, name)
        }
        return
    }

    render() {
        return(
            <article className="signInWrapper br3 ba b--black-10 mt4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="signInTitle mv3">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name"></label>
                                <input
                                    className="input-box pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                    placeholder="NAME"
                                />
                                <p className="loginErrorMsg" id="registerNameError">Please input a name</p>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address"></label>
                                <input
                                    className="input-box pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    placeholder="EMAIL"
                                />
                                <p className="loginErrorMsg" id="registerEmailError">Please input a valid email address</p>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password"></label>
                                <input
                                    className="input-box pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    placeholder="PASSWORD"
                                />
                                <p className="loginErrorMsg" id="registerPasswordError">Please input a password</p>
                            </div>
                            <p className="loginErrorMsg" id="generalRegisterError">There was an error, you have not been registered</p>
                        </fieldset>
                        <div className="">
                            <input
                                className="btnRegister b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                placeholder="Register"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;