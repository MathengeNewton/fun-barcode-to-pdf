import React from 'react';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barcode from 'react-jsbarcode';
import Image from 'react-bootstrap/Image'

import Logo from "./logo-svg.svg";

const BarcodePdfFormat = React.forwardRef((props,ref)=> {

  const codelist = props.codeList;

    return(
        <Container ref={ref}>
          <Row>
            {codelist.map((code)=>(
              <Col md={6}  xs={12} style={{display: 'flex'}}>
                <Row md={12} xs={12}>
                  <Col md={6} xs={6}>
                    <Image src={Logo} thumbnail={false} style={{height: '8rem',width:'10rem'}}/>
                  </Col>
                  <Col md={6} xs={6}>
                    <Barcode value={code} md={6}/>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
      </Container>
    )
});

export default BarcodePdfFormat;