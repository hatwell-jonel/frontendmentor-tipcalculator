const billEl = document.querySelector("#bill");
const tipPercentEl =  document.querySelectorAll(".tip-percent");
const tipCustomEl = document.querySelector("#tip-custom");
const noOfPeopleEl = document.querySelector("#persons");
const resetEl = document.querySelector("#reset");
const amount = document.querySelectorAll(".amount");
const tipAmountEl = document.querySelector("#tip-amount");
const totalEl = document.querySelector("#total");
const error = document.querySelector(".error");

let bill = 0, tip = 0, persons = 1;

// BILL
billEl.addEventListener("input", (e) =>{
  bill = Number(billEl.value);
  calc();
})


// TIP PERCENTAGE
tipPercentEl.forEach(btn => {
  btn.addEventListener("click", (e) =>{
    tip = btn.value;
    let target = e.currentTarget;

    // WILL REMOVE THE ACTIVE BTN IF USER CHOOSE NEW PERCENTAGE
    tipPercentEl.forEach(item =>{
      if(item !== btn){
        item.classList.remove("active-btn");
      }
    });
    
    // WILL ADD ACTIVE IF USER CHOOSE NEW PERCENTAGE
    btn.classList.toggle("active-btn");

    // WILL DISABLE THE CUSTOM PERCENTAGE IF THE USER CHOOSE FROM BUTTONS THEN CALCULATE THE TIP
    if(target.classList.contains('active-btn')){
      tipCustomEl.disabled = true;
      tipCustomEl.value = "";
      calc();
    }
    else{
      tipCustomEl.disabled = false;
    }

  })  
})

// TIP CUSTOM
tipCustomEl.addEventListener("input", (e) =>{
  tip = Number(tipCustomEl.value);
  calc();
})

// NUMBER OF PEOPLE
noOfPeopleEl.addEventListener("input", (e) =>{
  persons = Number(noOfPeopleEl.value);

  if(persons <= 0){
    noOfPeopleEl.classList.add("is-invalid");
    error.style.visibility = "visible";
  }
  else{
    noOfPeopleEl.classList.remove("is-invalid");
    error.style.visibility = "hidden";
    calc();
  }
})

// RESET ALL
resetEl.addEventListener("click", (e) =>{
  billEl.value="";
  tipCustomEl.value="";
  tipCustomEl.disabled = false;
  noOfPeopleEl.value = 1;

  tipPercentEl.forEach(btn =>{
    btn.classList.remove("active-btn");
  })
  
  amount.forEach(element =>{
    element.innerHTML = "$ 00.00"
  })

})

// CALCULATION 
function calc(){
  if(bill >= 0 && persons >= 1){
    let tipAmount = (bill * tip) / 100;
    let total = tipAmount + bill;
    tipAmountEl.innerHTML = `$${(tipAmount/persons).toFixed(2)}`;
    totalEl.innerHTML = `$${(total/persons).toFixed(2)}`;
  }
}
