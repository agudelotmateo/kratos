const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instance

ibm_url="https://us-south.ml.cloud.ibm.com"
ibm_user="f27c8164-d085-472c-9038-5287fe292759"
ibm_pass="29bce665-f3ca-4405-8641-19fd0e3c99b7"

wml_credentials.set("url", ibm_url);
wml_credentials.set("username", ibm_user);
wml_credentials.set("password", ibm_pass);

function apiGet(url, username, password, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	const tokenHeader = "Basic " + btoa((username + ":" + password));
	const tokenUrl = url + "/v3/identity/token";

	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("GET", tokenUrl);
	oReq.setRequestHeader("Authorization", tokenHeader);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send();
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

function predict(quantity,purity){

	apiGet(wml_credentials.get("url"),
		   wml_credentials.get("username"),
		   wml_credentials.get("password"),
		   function (res) {
			   let parsedGetResponse;
			   try {
				   parsedGetResponse = JSON.parse(this.responseText);
			   } catch(ex) {
				   // TODO: handle parsing exception
			   }
			   if (parsedGetResponse && parsedGetResponse.token) {
				   const token = parsedGetResponse.token
				   const wmlToken = "Bearer " + token;
				   
				   const payload = `{"fields": ["insumo", "pureza"], "values": [[${parseInt(quantity)},${parseFloat(purity)}]]}`;
				   const scoring_url = "https://us-south.ml.cloud.ibm.com/v3/wml_instances/b04dc04b-98ad-45fb-9260-c6998a722d9b/deployments/a430a8b0-2fae-4af4-a525-b0f5271c9513/online";

				   apiPost(scoring_url, wmlToken, payload, function (resp) {
					   let parsedPostResponse;
					   try {
						   parsedPostResponse = JSON.parse(this.responseText).values;
					   } catch (ex) {
						   //...
					   }
					   console.log("Scoring response");
					   console.log(parsedPostResponse);
				   }, function (error) {
					   console.log(error);
				   });
			   } else {
				   console.log("Failed to retrieve Bearer token");
			   }
		   }, function (err) {
			   console.log(err);
		   });
}


predict(1000,1)
