import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact(){
    return (
        <div>
            <Container style={{marginTop:'5%', maxWidth:'65%'}}>
                <Row>
                    <Col style={{ backgroundColor:'green', margin:'1rem' }}>
                        <Col span={3} style={{ maxHeight:'15.65rem', flexDirection: 'column' }}>
                            <img src='./dev_profile/JM.jpg' alt='JiMin' title='홍지민'/>
                        </Col>
                        <Col md='6'>
                            <div>연락처 : </div>
                            <div>이메일 : </div>
                            <div>정보 : </div>
                        </Col>
                    </Col>
                    <Col style={{ backgroundColor:'blue', margin:'1rem'}}>
                        <img src='./dev_profile/JH.jpg' alt='JinHeok' title='장진혁'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src='./dev_profile/SH.jpg' alt='SungHyun' title='김성현'/>
                    </Col>
                    <Col>
                        <img src='./dev_profile/HM.jpg' alt='HyunMok' title='정현목'/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;