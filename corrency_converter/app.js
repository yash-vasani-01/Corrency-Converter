let BASE_URL="https://v6.exchangerate-api.com/v6/565728a33f539938c558a566/pair";
import { countryList } from './codes.js'; 
let dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
let fromname=document.querySelector(".from select");
let toname=document.querySelector(".to select");

for(let select of dropdowns){
    for (let currcode in countryList) {  
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);
        if(select.name==="from"&&currcode==="USD"){
            newoption.selected="selected"
        }
        if(select.name==="to"&&currcode==="INR"){
            newoption.selected="selected"
        }
    }
    select.addEventListener("change",(evt)=>{
        changeflage(evt.target)
    });
    

}
const changeflage=(element)=>{
    let  currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

button.addEventListener("click",async(e)=>{
    e.preventDefault();
    let amount1=document.querySelector(".amount input");
    let amount=amount1.value
    if(amount===""||amount<0){
        amount=0;
        amount1.value="0";

    }
    
    
    const URL = `${BASE_URL}/${fromname}/${toname}`;
     try {
        let res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
})
