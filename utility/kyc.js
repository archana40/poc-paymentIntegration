const axios = require('axios');
require("dotenv").config();
const ENV = process?.env

async function panDetails(pan, consent) {
    try {
        var data = JSON.stringify({
            "pan": pan,
            "consent": consent
           });
        var config = {
           method: 'post',
              url: 'https://testapi.karza.in/v3/pan-profile',
            headers: { 
              'Content-Type': 'application/json', 
              'x-karza-key':  ENV?.KYCSECRET
             },
       data : data
    };
      let readInfo = await axios(config)
      let reqKyc = readInfo.data
     if(reqKyc){
        const panData=reqKyc?.result
        return{
          legalName: '',
          ownerName: panData?.name,
          panNumber:panData?.pan,
          addr1: panData?.address?.buildingName,
          pincode:panData?.address?.pinCode,
          state: panData?.address?.state,
          city: panData?.address?.city,
          country: panData?.address?.country || "India",
       }
    } else{
      return {
        ownerName: '',
        legalName: '',
        addr1: '',
        panNumber:'',
        state: '',
        pincode:'',
        country: "India",
        city: '',
     }
  }      
} catch (error) {
    console.log(error);
     return {}
   }
}

async function gstDetails(consent, gstin){
   try {
       var data = JSON.stringify({
               "consent": consent,
               "gstin": gstin
             });

       var config = {
            method: 'post',
            url: 'https://testapi.karza.in/v2/gstdetailed',
            headers: { 
              'Content-Type': 'application/json', 
               'x-karza-key': ENV?.KYCSECRET
             },
         data : data
     };
     let readDetails = await axios(config);
     let reqGst = readDetails.data;
     if (reqGst) {
         const gstData = reqGst?.result;
     return{
        gstin: gstData?.gstin,
        legalName: gstData?.lgnm,
        ownerName: gstData?.contacted?.name,
        panNumber: gstData?.gstin.slice(2).substr(0, 10),
        addr1: gstData?.adadr[0]?.adr,
        pincode: gstData?.adadr[0]?.adr.split(",")[6].trim(),
        state: gstData?.stj,
        city: gstData?.adadr[0].adr.split(",")[4].trim(),
        country: 'India',
     }
    } else{
       return {
        gstin: '',
        legalName: '',
        ownerName: '',
        panNumber:'',
        addr1: '',
        pincode:'',
        state:'',
        city: '',
        country: 'India',
     }
    }
   } catch (error) {
     console.log(error);
     return {}
   }
}

module.exports = { panDetails, gstDetails }
