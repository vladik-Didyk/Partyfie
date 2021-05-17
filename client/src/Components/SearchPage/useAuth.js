import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAcessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expireIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post(`httt://localhost:3001/login`, {
            code,
        })
        .then(res => {
            setAcessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expireIn)
            window.history.pushState({}, null, '/')
        })
            .catch(() => {
                window.location = '/'
            })
    }, [code])

    //useEffect to refesh the token before it expires

    useEffect(() => {
        if (!refreshToken || !expireIn) return
        const interval = setInterval(() => {
            axios.post(`httt://localhost:3001/refresh`, {
                refreshToken,
            })
            .then(res => {
                setAcessToken(res.data.accessToken)
                setExpiresIn(res.data.expireIn)
            })
                .catch(() => {
                    window.location = '/'
                })
        }, (expireIn - 60) * 1000)
        return () => clearInterval(interval)
    }, [refreshToken, expireIn])

    return accessToken

}
