import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.withCredentials = true;//백 & 서버 쿠키 공유 해결방법


const Logoout = (props) => {
    useEffect(() => {
        fetch('http://localhost:3001/User/Logout',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem(props.UserInfo)
                },
                credentials: 'include',
            }).then(res => res.json()).then(data => {
                if (data.result === 'true') {
                    console.log(localStorage);
                    localStorage.removeItem(props.UserInfo);
                    props.setUserInfo(false);
                    console.log(props);
                    alert('로그아웃 성공');
                }
            });
        console.log("this");
        //document.location.href = '/'
    });
    return (
        <Navigate to = '/'/>
    );
}
export default Logoout;
