import React from 'react'
import { Button } from '@material-ui/core';
import fetcher from '../api/fetcher';
import { validateLoginIn } from '../shared/validation';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                email: '',
                password: '',
            },
            formState: {},
            formMessages: {},
            validityState: {},
            messageError: '',
        }
    }

    onBlur = (fieldName, value) => {

        const nextState = { ...this.state.formState, [fieldName]: value };
        this.setState({ formState: nextState });
        validateLoginIn(nextState, fieldName)
            .done(this.handleValidationResult);
    }

    handleValidationResult = (result) => {
        const msgs = { ...this.state.formMessages };
        const validity = { ...this.state.validityState };

        result.tested.forEach((fieldName) => {
            if (result.hasErrors(fieldName)) {
                msgs[fieldName] = result.getErrors(fieldName)[0];
                validity[fieldName] = 'form-control is-invalid';
            } else if (result.hasWarnings(fieldName)) {
                msgs[fieldName] = result.getWarnings(fieldName)[0];
                validity[fieldName] = 'warning';
            } else {
                delete msgs[fieldName];
                validity[fieldName] = 'form-control is-valid';
            }
        });

        this.setState({ formMessages: msgs, validityState: validity });

    }
    loginIn = async () => {
        try {
            if (!validateLoginIn(this.state.formState).done(this.handleValidationResult).hasErrors()) {
                const data = await fetcher.post('/login', this.state.userData)
                if (data.status === 200) {
                    localStorage.setItem('token', data.data.token);      
                    this.props.history.push('/home')
                }
            }
        } catch (error) {
            this.setState({
                messageError: error.response.data,
                validityState: {
                    email: 'form-control is-invalid',
                    password: 'form-control is-invalid',
                },
            })
        }
    }

    onChangeHandler = event => {
        const target = event.target;
        const value = target.value;
        const savedData = { ...this.state.userData, [target.name]: value };
        this.setState({ userData: savedData });
        this.setState({ messageError: '' })
    }

    render() {
        return (

            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 " id="loginPageStyle">
                            <div className="form-group d-flex justify-content-center mt-5">
                                <img src={'https://www.finsmes.com/wp-content/uploads/2019/12/au10tix.jpg'} alt="Logo" width={'250px'}></img>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <img src={'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_ff59c75aedc43d5be237ec7739adcc1b/sendsafely.png'} alt="Logo" width={'250px'}></img>
                            </div>
                            <div className="form-group mt-5">
                                <div className="row">
                                    <input
                                        onBlur={() => this.onBlur('email', this.state.userData.email)}
                                        name="email"
                                        className={this.state.validityState.email || "form-control mt-1"}
                                        placeholder="Email"
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="text-danger">{this.state.formMessages.email}</label>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <div className="row">
                                    <input
                                        onBlur={() => this.onBlur('password', this.state.userData.password)}
                                        onChange={this.onChangeHandler}
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        className={this.state.validityState.password || "form-control mt-1"}
                                    />
                                    <label className="text-danger">{this.state.formMessages.password}</label>
                                </div>
                                <label className="text-danger">{this.state.messageError}</label>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-12 mt-3">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={this.loginIn}
                                    >Login</Button>
                                </div>
                                <div className="col-md-5"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Login;