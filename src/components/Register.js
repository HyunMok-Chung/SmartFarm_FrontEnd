import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = (props) => {
    const [farmId, setfarmId] = useState(false);
    const onfarmIdHandler = (e) => {
        setfarmId(e.currentTarget.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        let body = {
            userId: props.UserInfo,
            farmId: farmId
        }
        console.log(body);
        fetch('http://localhost:3001/User/Register',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(data => {
                if (data.result === 'true')
                    alert("등록 완료");
                else alert("등록 실패 : 중복된 농장 이름입니다.");
            })
    }
    return (
        <div style={{textAlign:'center'}}>
            <img src='farm.jpeg' alt='SmartFarm' title='참고 이미지'
            style={{borderRadius:'18px', marginTop:'30px'}} />
            <Container className="panel" style={{ marginTop: '30px', marginBottom: '30px', maxWidth: '300px' }}>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Form.Control type="text" placeholder="FarmID" onChange={onfarmIdHandler} />
                            <div className="invalid-input">당신만의 농장이름을 지어보세요.</div>
                        </Col>
                    </Form.Group>
                </Form>
                <div className="d-grid gap-1">
                    <Button variant="warning" type="submit" size="sm" onClick={onSubmit}>
                        등록
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Register;