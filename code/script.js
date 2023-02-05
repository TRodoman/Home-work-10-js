/*
 У папці calculator дана верстка макета калькулятора. 
Потрібно зробити цей калькулятор робочим.
* При натисканні на клавіші з цифрами - набір введених цифр має бути показаний на табло калькулятора.
* При натисканні на знаки операторів (`*`, `/`, `+`, `-`) на табло нічого не відбувається - програма чекає введення другого числа для виконання операції.
* Якщо користувач ввів одне число, вибрав оператор і ввів друге число, то при натисканні як кнопки `=`, так і будь-якого з операторів, в табло повинен з'явитися результат виконання попереднього виразу.
* При натисканні клавіш `M+` або `M-` у лівій частині табло необхідно показати маленьку букву `m` - це означає, що в пам'яті зберігається число. Натискання на MRC покаже число з пам'яті на екрані. Повторне натискання `MRC` має очищати пам'ять.
*/

const calc = {
  operand1: "",
  operand2: "",
  sign: "",

  memoryPlus: [],
  memoryMinus: [],
  res: "",
  sum: "",
  minus: "",
};

let inputDisplay = document.querySelector(".display > input");

document.querySelector(".keys").addEventListener("click", (e) => {
  if (validate(/[0-9.]/, e.target.value) && calc.sign === "") {
    calc.operand1 += e.target.value;
    show(calc.operand1);
  } else if (validate(/[+-/*]/, e.target.value)) {
    calc.sign = e.target.value;
  } 
  else if (validate(/[0-9.]/, e.target.value) &&
  calc.sign === "m+" &&
  calc.operand1 !== ""){
    calc.operand2 === '';
  }
  
  else if (validate(/[0-9.]/, e.target.value) &&
  calc.sign === "m-" &&
  calc.operand1 !== "" ){
    calc.operand2 === '';
  }
  else if (
    validate(/[0-9.]/, e.target.value) &&
    calc.sign !== "" &&
    calc.operand1 !== ""
  ) {
    calc.operand2 += e.target.value;
    show(calc.operand2);
    document.getElementById("eq").disabled = false;
  }

  if (calc.res !== "" && inputDisplay.value !== "0") {
  }

  console.log(calc);
});

// -----------------------------Память на кнопке ( М+ ) ------------------------------

document.querySelector("#sum").addEventListener("click", (e)=>{

  calc.memoryPlus.push(Number(inputDisplay.value));
  
    let sumN = 0;
  
    for (let i = 0; i < calc.memoryPlus.length; i++) {
      sumN += calc.memoryPlus[i];
    }
    calc.sum = sumN;
    
});

// ------------------------------Вычитание из памяти кнопкой ( М- ) -------------------


document.querySelector("#minus").addEventListener("click", (e) => {

  calc.memoryMinus.push(Number(inputDisplay.value));
  
  if (calc.sign === "m-") {
    calc.operand2 = 0;
  }
  document.getElementById("eq").disabled = true;
  
  let sumMin = 0;
  
  for (let j = 0; j < calc.memoryMinus.length; j++) {
    sumMin += calc.memoryMinus[j];
  }
  calc.minus = sumMin;
});


// -----------------------------Вывод полученного числа из памяти (Mrc) ----------------

let memoryFlag = false;

document.querySelector("#mrc").addEventListener("click", (e) => {
  let mrc = calc.sum - calc.minus;

   if(Number.isInteger(mrc) === false){

     inputDisplay.value = mrc.toFixed(2);
   }
   inputDisplay.value = mrc;
   console.log(mrc);

  if (mrc !== "") {
    memoryFlag = true;
    document.querySelector("#mrc").addEventListener("click",clearMrc);
  }

  console.log(mrc);
});

// -------------------------------------------------------------------------------------

const validate = (p, v) => p.test(v);

document.getElementById("eq").onclick = func;

document.getElementById("clear").onclick = clear;

// -----------------------вывод результатов на экран каклькулятора------------

function show(info) {
  const display = document.querySelector(".display > input");
  display.value = info;
}

// -----------------------Математические действия-----------------------------

function func() {
  let result;

  let num1 = Number(calc.operand1);
  let num2 = Number(calc.operand2);

  switch (calc.sign) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  inputDisplay.value = result;
  document.getElementById("eq").disabled = true;
  calc.res = result;
}

// ------------------------Сброс значений--------------------------------------

function clear() {
  calc.operand1 = "";
  calc.operand2 = "";
  calc.sign = "";
  inputDisplay.value = "0";
}


function clearMrc (){
  calc.sum = "",
  calc.minus = "",
  calc.res = "",
  mrc = "",
  calc.operand1 = "",
  calc.operand2 = "";
  calc.sign = "";
  calc.memoryPlus = [],
  calc.memoryMinus = [];
  inputDisplay.value = "0";
}