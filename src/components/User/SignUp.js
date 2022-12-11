import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
    //입력값 스테이트
    const [Id, setId] = useState(false);
    const [Password, setPassword] = useState(false);
    const [Name, setName] = useState(false);
    const [Email, setEamil] = useState(false);

    //유효성 관련 스테이트
    const [IdError, setIdError] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
    const [PwCheckError, setPwCheckError] = useState(false);
    const [EmailError, setEmailError] = useState(false);

    const onIdHandler = (e) => {
        const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; // 소문자,숫자 포함 8글자 이상
        if ((!e.target.value || (reg.test(e.target.value))))
            setIdError(false);
        else
            setIdError(true);
        setId(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        var reg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/ //영문,숫자 포함 10글자 이상
        if ((!e.target.value || (reg.test(e.target.value))))
            setPasswordError(false);
        else
            setPasswordError(true);
        setPassword(e.currentTarget.value);
    }

    const onPwCheckHandler = (e) => {
        if ((e.target.value === Password) && e.target.value)
            setPwCheckError(false);
        else
            setPwCheckError(true);
    }
    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onEmailHandler = (e) => {
        const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if ((!e.target.value || (reg.test(e.target.value))))
            setEmailError(false);
        else
            setEmailError(true);
        setEamil(e.currentTarget.value);
    }

    const isSubmitValid = () => {
        if (!(IdError || PasswordError || PwCheckError || EmailError))
            return (true)
        else
            return(false);
    }

    const onSubmit = (e) => {
        if (isSubmitValid()) {
            e.preventDefault();
            let body = {
                id: Id,
                pw: Password,
                name: Name,
                email: Email
            }
            console.log(body)
            fetch('http://localhost:3001/User/SignUp',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => {
                    if (data.result === 'true')
                        alert("회원가입 완료");
                    else alert("회원가입 실패");
                })
        }
        else
        {
            e.preventDefault()
            alert('회원가입 실패');
        }
    }

    return (
        <div>
            <Container className="panel" style={{ marginTop: '30px', marginBottom: '30px', maxWidth: '300px' }}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="text" placeholder="UserID" onChange={onIdHandler} />
                            {IdError && <div className="invalid-input">id는 영소문자 포함 8글자 이상이어야 합니다.</div>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="password" placeholder="Password" onChange={onPasswordHandler} />
                            {PasswordError && <div className="invalid-input">비밀번호는 영소문자 포함 10글자 이상이어야 합니다.</div>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="password" placeholder="Password Check" onChange={onPwCheckHandler} />
                            {PwCheckError && <div className="invalid-input">위의 비밀번호와 다릅니다.</div>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="text" placeholder="이름" onChange={onNameHandler} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col>
                            <Form.Control type="email" placeholder="Email" onChange={onEmailHandler} />
                            {EmailError && <div className="invalid-input">이메일 규격에 맞지않습니다.</div>}
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1">
                        <Button variant="primary" type="submit" size="sm" onClick={onSubmit}>
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default SignUp
//SignUp test
