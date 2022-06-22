import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import $ from "jquery";



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

  const classes = useStyles();
  const qrRef = useRef(null);

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
  }

  
  const handleChange = (e) => {
    setName("e.target.value");
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
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
      console.log("start")
      let URLe=result;
      console.log("1:"+URLe)

      let split_string = URLe.split(":");
      split_string.shift();
      console.log("2:"+split_string)
      URLe = split_string.toString();
      split_string = URLe.split("@");
      console.log("3: +"+split_string);
      URLe = split_string[0].toString();
      console.log("4: +"+URLe);

        setScanResultWebCam(URLe);
        setIsShown(current => !current);


    }
   }




     //<ken add >


  
  const handleSumbit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
       type: "POST",
       url: form.attr("action"),
       data: form.serialize(),
       success(data) {
         setResult(data);
      },
    });
   };
   // ken add
   const getJoke= () =>{
		let baseURL='https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=';
		let contractAddress='0x7b8c062C9B8cbD756785E444FDcFCa79342a8Ee5';
		let userAddress='&address=0xb3f678A06d688D0a90787914f94d051b445b50C3';
		let block='&page=1&offset=100&startblock=0&endblock=27025780&sort=asc';
		let API_KEY='MU7II9KNAHCJFU46FFD7PH5XVR6RY5I3RE';
		let apiURL = baseURL +contractAddress+userAddress+block+API_KEY;
		fetch(apiURL)
		.then((response)=> response.json())
		.then((data)=>{
			let etherscanData = data.result;
		console.log(etherscanData)
		let sum=""
			for (var key in etherscanData) {
				if (etherscanData.hasOwnProperty(key)) {
					console.log(key + " -> " + etherscanData[key].tokenID);
					sum+=("blockNumber:"+etherscanData[key].blockNumber+"tokenID :"+etherscanData[key].tokenID+"<br>");
				}
			}
			// setJoke(sum)
		});
	};

  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
              <CardContent>
                  {/* <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          <Button className={classes.btn} variant="contained" 
                            color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid> */}
                      {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Code: {scanResultFile}</h3>
                      </Grid> */}
{/* 
                  </Grid> */}
              </CardContent>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                     
                        <input type='text' value={scanResultWebCam} ></input> <button onClick={handleClick}>show qr scran</button>
                        
                       
                         {isShown && (
                         <QrReader
                         delay={300}
                         style={{width: '50%' ,height:'50%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                        
                         />
                         
                         )}
                         <br/>
                         <button >submit</button>
                          
                         {/* //<h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
                    
                      </Grid>
          </Card>
          {/* <div className="App">
			<form
				action="http://localhost/reactphp/server.php"
				method="post"
				onSubmit={(event) => handleSumbit(event)}
			>
				<label htmlFor="name">Nametest: </label>
				<input
					type="text"
					id="name"
					name="name"
					 value={name}
					// onChange={(event) => handleChange(event)}
				/>
				<br />
				<button type="submit" >Submit</button>
        <button onClick={getJoke}>get URL</button>
        {joke}
			</form>
			<h1>{result}</h1>
		</div> */}

    {/* <div>

  <button onClick={() =>{this.getTxn()}}>check API</button>
    </div> */}
    </Container>
    
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
