import axios from 'axios'
import React, { useState } from 'react'
import css from './SignInPage.module.css'
// import MessageResponse from '../MessageResponse/MessageResponse.jsx';

const data = {
    email: '',
    password: '1',
    confirmPassword: '1',
    name: '',
    lastName: '',
    phoneNumber: ''
}

const styleInput = '1px solid red'

const style = {
    email: { border: null },
    confirmPassword: { border: null }
}

const SignInPage = props => {

    const [value, setValue] = useState(data)
    const [serverRes, setServerRes] = useState(null)
    const [border, setBorder] = useState(style)

    const handelChange = event => {
        setValue({ ...value, [event.target.name]: event.target.value });
    }

    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,6})*$/

    const onSubmit = () => {

        if (value.password !== value.confirmPassword) {
            setServerRes({ message: 'Passwords do not correct' })
            setBorder({ ...border, confirmPassword: { border: styleInput } })
            return
        }

        if (!value.email.match(emailValidation)) {
            setServerRes({ message: 'Email does not correct' })
            setBorder({ ...border, email: { border: styleInput } })
            return
        }
        setBorder(style)
        setServerRes(null)

    //     axios.post('/api/auth/SignIn', JSON.stringify(value), {
    //         headers: { "Content-Type": "application/json" }
    //     })
    //         .then(message => { setServerRes({ message: message?.response?.data.name }) })
    //         .then(() => {
    //             props.setModal({ ...props.modal, LogInPage: true })
    //         })
    //         .catch(error => {
    //             setServerRes({ message: error?.response?.data.name })
    //             setBorder({ ...border, email: { border: styleInput } })
    //             return
    //         })
    }

    const emailValidationChecker = event => {
        handelChange(event)
        event.target.value.match(emailValidation) && setBorder({ ...border, email: { border: null } })
        setServerRes(null)

    }

    const confirmPasswordHandel = event => {
        if (event.target.value === value.password) {
            setBorder({ ...border, confirmPassword: { border: null } })
        }
        handelChange(event)
    }

    return (

        <div className={css.globalContainer}>
        <div className={css.SignInPage}>

            <button type="button"
                className={css.btn_delete_SigninPage}
                onClick={() => props.setModal(props.modal)}
            >X
            </button>
            {/* {serverRes &&
                <MessageResponse serverRes={serverRes} />} */}
            <form>
                <div className="form-row">
                    <div className={css.signInGroup}>
                        <label htmlFor="inputEmail4">Email &nbsp; </label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Email"
                            value={value.email}
                            style={border.email}
                            onChange={emailValidationChecker}
                        />
                    </div>

                    <div className={css.signInGroup}>
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            id="inputPassword1"
                            placeholder="Password"
                            value={value.password}
                            onChange={handelChange} />
                    </div>
                    <div className={css.signInGroup}>
                        <label htmlFor="inputPassword4">Password Confirm</label>
                        <input type="password"
                            style={border.confirmPassword}
                            className="form-control"
                            name="confirmPassword"
                            id="inputPassword2"
                            placeholder="Password"
                            value={value.confirmPassword}
                            onChange={confirmPasswordHandel}

                        />
                    </div>
                </div>

                <div className={css.signInGroup}>
                    <label htmlFor="inputAddress">Name</label>
                    <input type="text"
                        className="form-control"
                        name="name"
                        placeholder="Vladik"
                        value={value.name}
                        onChange={handelChange} />
                </div>

                <div className={css.signInGroup}>
                    <label htmlFor="inputAddress">Last Name</label>
                    <input type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Durbatun"
                        value={value.lastName}
                        onChange={handelChange} />
                </div>

                <div className={css.signInGroup}>
                    <label htmlFor="inputAddress">Phone Number</label>
                    <input type="number"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="+972 5555555555"
                        value={value.phoneNumber}
                        onChange={handelChange} />
                </div>

                <button type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}>Submit
                    </button>
            </form>

        </div>
        </div>
    )

}

export default SignInPage