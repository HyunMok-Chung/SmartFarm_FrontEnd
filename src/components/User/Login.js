import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Login(props) {
    const [Id, setId] = useState(false);
    const [Password, setPassword] = useState(false);
    const [IsLogin, setIsLogined] = useState(false);

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let body = {
            id: Id,
            pw: Password
        }
        fetch('http://localhost:3001/User/Login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }).then(res => res.json()).then(data => {
                if (data.result === 'true') {
                    console.log(data.sessionID);
                    localStorage.setItem(Id, data.sessionID);
                    console.log(props);
                    props.setUserInfo(Id);
                    alert('로그인 성공!');
                    setIsLogined(true);
                }
                else if (data.result === 'checkId') {
                    alert('존재하지 않는 아이디입니다.');
                }
                else if (data.result === 'checkPw') {
                    alert('비밀번호가 일치하지 않습니다.');
                }
                else alert('로그인 실패');
            });
    }

    console.log(props.UserInfo,"this");
    return (
        <div>
            <Container className="panel" style={{ marginTop: '40px', marginBottom: '30px', maxWidth: '300px' }}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="text" placeholder="UserID" onChange={onIdHandler} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="password" placeholder="Password" onChange={onPasswordHandler} />
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1">
                        <Button variant="primary" type="submit" size="sm" onClick={onSubmit}>
                            로그인
                        </Button>
                        <Link to='/SignUp' style={{ display: 'inline-grid', textDecoration: 'none' }}>
                            <Button variant="success" size="sm">
                                회원가입
                            </Button>
                        </Link>
                    </div>
                </Form>
            </Container>
            <div>
                {IsLogin && <Navigate to = '/'></Navigate>}
            </div>
        </div>
    );
}

export default Login
