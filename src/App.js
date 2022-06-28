import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import $ from "jquery";
import icon from './img/group_1.png';
import icon1 from './img/Image1.png';
import backgroundImg from './img/headerPathMob2.png';
import './App.css';


function App() { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [joke,setJoke ]= useState("");
  //ken add
  const [name, setName] = useState("");
	const [result, setResult] = useState("");
  //
  const [copySuccess, setCopySuccess] = useState('');

    const copyToClipBoard = async copyMe => {
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };
  // const classes = useStyles();
  const qrRef = useRef(null);

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
  }

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name)
  
  
  };
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
      
      //for check it is ethereum address
      let ethAdd = result.slice(0,11);
      if(ethAdd=="ethereum:0x"){
      let URLe=result;
      
      //extract  ethereum address remove ethereum:0xb794f5ea0ba39494ce839613fffba74279579268@2
      let split_string = URLe.split(":");
      split_string.shift();
      URLe = split_string.toString();
      split_string = URLe.split("@");
      URLe = split_string[0].toString();
      setScanResultWebCam(URLe);
      if(URLe.length>=1){
      setIsShown(current => !current);
      }
    }else {
      setScanResultWebCam("not a valid ethereum address");
    }

    }
   }




     //<ken add >

     const clearname = useRef(null);
     const clearquantity = useRef(null);
     const clearTel = useRef(null);
    
  const handleSumbit = (e) => {

    e.preventDefault();
    const form = $(e.target);
    $.ajax({
       type: "POST",
       url: form.attr("action"),
       data: form.serialize(),
       success(data) {
         setResult(data);
         setScanResultWebCam("");
         clearname.current.value = '';
         clearquantity.current.value = '';
         clearTel.current.value = '';
      },
    });
   };
  //  const myStyle={
  //   backgroundImage:"url("+{backgroundImg}+")",
  //           height:'100vh',
  //           marginTop:'-70px',
  //           fontSize:'50px',
  //           backgroundSize: 'cover',
  //           backgroundRepeat: 'no-repeat',
  //           };

  return (   
    
    <div className="App"style={{ backgroundImage:`url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat', }} >
      {/* <button className="btn">buy now</button> */}
         <img src={icon1} className="img.w"/>
         <br/>
                        {/* <input type='text' value={scanResultWebCam} ></input> */}
                         <button onClick={handleClick}  ><img src={icon}/></button>
                         {isShown && (
                         <QrReader
                         delay={300}
                         style={{width: '100%' ,height:'100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                        
                         />
                         
                         )}
                         <br/>
                    
                        <form className='App.formt'
                          action="http://localhost/reactphp/server.php"
                          method="post"
                          onSubmit={(event) => handleSumbit(event)}
                        >
                          <label htmlFor="name" className='formt'>Wallet address: </label>
                          <br />
                          <input
                            
                            type="text"
                            id="address"
                            name="address"
                            value={scanResultWebCam}
                            onChange={(event) => handleChange(event)}
                            required
                          />
                          <br /><label htmlFor="name">name: </label>
                          <br />
                          <input
                             ref={clearname}
                              type="text"
                              id="name"
                              name="name"
                              required
                          />
                        <br /><label htmlFor="name">Tel: </label>
                        <br />
                          <input
                          ref={clearTel}
                              type="number"
                              id="Tel"
                              name="Tel"
                              required
                          />
                           <br /><label htmlFor="name">quantity: </label>
                           <br />
                          <input
                          ref={clearquantity}
                              type="number"
                              id="quantity"
                              name="quantity"
                              min="1" max="999"
                              required
                          />
                            <br />
                          <button type="submit" >Submit</button>
                          {/* <button onClick={getJoke}>get URL</button>
                          {joke} */}
                        </form>
                        <h1>{result}</h1>
                        
                        <div class="footerLink">Verm City Limited © 2022 - All Rights Reserved</div>
                      </div>
                      
                        
    
  );
}


const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
      
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
      
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
    
}));


export default App;
