import React, { useState, useRef } from "react";
import BarcodePdfFormat from './bars';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useReactToPrint } from 'react-to-print';
import Spinner from 'react-bootstrap/Spinner';

function App() {

  let characters = '0123456789';

  const [generating, setGenerating ] = useState(false);

  const [ postFix, setPostFix ] = useState('A');

  const componentRef = useRef();

  const [codeList, setCodeList ] = useState([]);

  const [preventRegenerate, setPreventRegenerate ] = useState(false);

  const [count, setCount ] = useState(500);

  const [showOutcome, setShowOutcome] = useState(false);

  const resetPage = () => {
    setCodeList([]);
    setPreventRegenerate(false);
  }

  const generateCodes = () => {
    setGenerating(true);
    let myList = [];
    let chaactersLength = characters.length;  
    let inn = 0 ;  
    while(inn < count){    
        let result = "";
  
        for ( let i = 0; i < 8 ; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * chaactersLength));
            // result.concat('A');
        };  
        myList.push('CYS'+result + postFix.toUpperCase());  
        inn++;
    };
    setCodeList(myList);
    setShowOutcome(true);
    setPreventRegenerate(true);
    setGenerating(false);
  } 

  let downloadCert = useReactToPrint({
    content:()=>componentRef.current,
});

  return (
    <Container>
      { generating ? (
          <Spinner animation="grow" variant="dark" />
      ) : null }      
        <Container style={{padding: '5rem'}}>
          <Row>
            <Col>
              <input 
                type="number" 
                name="count" 
                value={count}
                onChange={(e)=>setCount(e.target.value)}
              />
            </Col>
            <Col>
              <input 
                type="text" 
                name="count" 
                value={postFix}
                onChange={(e)=>setPostFix(e.target.value)}
              />
            </Col>
            { preventRegenerate ? null: (
              <Col>
                <Button onClick={generateCodes}>Run Script</Button>
              </Col>
            )}             
            { preventRegenerate ? (
              <Col>
                <Button onClick={downloadCert}>Download</Button> 
              </Col>
            ): null }
            <Col>
              <Button onClick={resetPage}>Reset</Button>
            </Col>
          </Row>
          
        </Container>
        <Container style={{padding: '.2rem'}}>
          {showOutcome ? (
            <BarcodePdfFormat ref={componentRef} codeList = {codeList}/>
          ): null}
        </Container>
    </Container>
  );
}

export default App;
