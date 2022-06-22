import React ,{useState} from "react";
//import Axios from"axios";
import "./App.css";

function Ken(){
	const [url1,setURL]= useState("");
	const [joke,setJoke ]= useState("");
	
	const getJoke= () =>{
		let baseURL='https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=';
		let contractAddress='0x7b8c062C9B8cbD756785E444FDcFCa79342a8Ee5';
		let userAddress='&address=0xb3f678A06d688D0a90787914f94d051b445b50C3';
		let block='&page=1&offset=100&startblock=0&endblock=27025780&sort=asc';
		let API_KEY='&key=MU7II9KNAHCJFU46FFD7PH5XVR6RY5I3RE';
		let apiURL = baseURL +contractAddress+userAddress+block+API_KEY;
		console.log(apiURL)
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
			setJoke(sum)
		});
	};
	const filterEthAddress= ()=>{
		let URLe="ethereum:0xb3f678A06d688D0a90787914f94d051b445b50C3@1";
		let split_string = URLe.split(":");
		split_string.shift();
		URLe = split_string.toString();
		split_string = URLe.split("@");
		console.log(split_string);
		URLe = split_string.toString();
		setURL(URLe)
	}
	
	return (
	 <div>
	   <button onClick={getJoke}>get JSON</button>
	 {joke}
	 {/* <button onClick={filterEthAddress()}>get URL</button>
	  {url1}  */}

	 </div>

	);
	
}
export default Ken;