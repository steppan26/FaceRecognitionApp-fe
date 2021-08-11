import React, { Component } from 'react';
import './SignIn.css'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: "",
            signInPassword: "",
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    toggleBtnView = (btn, state) => {
        switch (state) {
            default:
                btn.setAttribute("value", "Sign in")
                btn.setAttribute("disabled", "false")
                break
            case "deactivate":
                btn.style.backgroundColor = "grey"
                btn.setAttribute("value", "Signing in...")
                btn.setAttribute("disabled", "true")
                break
            case "activate":
                btn.style.backgroundColor = "none"
                btn.setAttribute("value", "Sign in")
                btn.setAttribute("disabled", "false")

                break
        }
        return

    }

    onSubmitSignIn = (event) => {
        const {signInEmail, signInPassword} = this.state

        if(signInEmail && signInPassword){
            this.toggleBtnView(event.target, "deactivate")
            fetch(`${this.props.serverAddress}/signin`, {
                method: 'post',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    email : signInEmail,
                    password : signInPassword
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
            this.showErrorMessage(signInEmail, signInPassword)
        }
        return
    }

    render(){
        return(
            <article className="signInWrapper br3 ba b--black-10 mt4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <form id="sign_in" className="ba b--transparent ph0 mh0">
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address"></label>
                                <input
                                    className="input-box pa2 input-reset ba hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    placeholder="EMAIL"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="password"></label>
                                <input
                                    className="input-box pa2 input-reset ba hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    placeholder="PASSWORD"
                                />
                            </div>
                            <div className="">
                                <p className="loginErrorMsg" id="generalLoginError">There was a problem with either your email or your password</p>
                                <input
                                    className="btnRegister b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                    placeholder="Sign in"
                                    id="signinSubmit"
                                    onClick={this.onSubmitSignIn}
                                    />
                            </div>
                        </form>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;