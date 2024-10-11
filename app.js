const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        select.append(newoption);
        if(select.name==="from" && currCode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newoption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let img=element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src=newSrc;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async ()=>{
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=rate*amtVal;
    msg.innerText=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
};