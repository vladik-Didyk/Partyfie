import React, { useContext, useState } from 'react'
// import LocalUserContext from '../Context/LocalUserContext'
import css from './LogInPage.module.css'
import axios from 'axios'



const data = {
    email: 'v@gmail.com',
    password: 'qqqqqq'
}

const style = {
    border: null
}

const LogInPage = props => {

    const [globalData, setGlobalData] = useState(data)
    const [borderValidation, setBorderValidation] = useState(style)
    // const store = useContext(LocalUserContext).store


    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,6})*$/


    const onSubmit = event => {

        if (!globalData.email.match(emailValidation)) {
            setBorderValidation({ border: '1px solid red' })
            return
        }
        setGlobalData(data)
        event.preventDefault()
        // axios.post('/api/auth/LogIn', JSON.stringify(globalData), {
        //     headers: { "Content-Type": "application/json" }
        // })
        //     .then(e => {
        //         store.setItem('user', {
        //             _id: e.data.userId,
        //             token : e.data.token
        //         })
        //         props.setDataFromServer(e.data.user)
        //         props.setModal(props.modal)
        //     })

    }

    const handlerChange = event => {
        setGlobalData({ ...globalData, [event.target.name]: event.target.value })
    }

    const emailValidationChecker = event => {
        handlerChange(event)
        event.target.value.match(emailValidation) && setBorderValidation({ border: null })

    }

    return (
      <div className={css.globalContainer}>
        <div className={css.LogInPage}>
            <button type="button"
                className={css.btn_delete_LoginPage}
                onClick={() => props.setModal(props.modal)}>X</button>
            <form>
                <div className="form-row">
                    <div className={css.loginGroup} >
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email"
                            style={borderValidation}
                            onChange={emailValidationChecker}
                            name={'email'}
                            value={globalData.email}
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Email"
                        />
                    </div>

                    <div className={css.loginGroup}>
                        <label htmlFor="inputPassword4">Password &nbsp;</label>
                        <input type="password"
                            name={'password'}
                            value={globalData.password}
                            onChange={handlerChange}
                            className="form-control"
                            id="inputPassword1"
                            placeholder="Password" />
                    </div>
                </div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}>Log In
                    </button>
            </form>
        </div>
        </div>
    )



}


export default LogInPage