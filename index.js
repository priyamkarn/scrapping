const axios = require('axios');
const qs = require('qs');

const url = "https://parents.kletech.ac.in/kletechparentsupply/index.php";

const headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive",
  "Content-Type": "application/x-www-form-urlencoded",
  "Cookie": "_ga_HLWRDTM589=GS1.1.1738772524.1.0.1738772533.0.0.0; _ga=GA1.3.1465269053.1725091744; _gid=GA1.3.1406038012.1738772538; _ga_8STQ320BLB=GS1.3.1738772538.5.1.1738772801.0.0.0; 5bd4aa82278a9392700cda732bf3f9eb=1m6t48ksah0qd4n2dl0hov1lu0",
  "Origin": "https://parents.kletech.ac.in",
  "Referer": "https://parents.kletech.ac.in/kletechparentsupply/",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
  "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Microsoft Edge";v="132"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"'
};

const data = qs.stringify({
  "username": "01fe20bcs299",
  "dd": "17 ",
  "mm": "04",
  "yyyy": "2001",
  "passwd": "MlJxMHlqMHdtMTBXLWdZMGoyNERkLTF3MTFaNzRh",
  "remember": "No",
  "security_code": "tg9rpd",
  "security_check": "UAAyZZLF",
  "option": "com_user",
  "task": "login",
  "return": "",
  "7cb74c597b41a011f61305112c34ad12": "1",
  "usn": ""
});

axios.post(url, data, { headers })
  .then(response => {
    console.log("Response Data:", response.data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
