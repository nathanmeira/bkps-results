let elements = document.getElementsByClassName('calculation')

for(let i = 0; i < elements.length; i++){
  let element = elements[i]
  let inputResult = document.getElementById('recovery_media')
  
  element.addEventListener('change', function () {
    let result = calcRecoveryMedia()
    
    if (isNaN(result)) {
      inputResult.value = 0
      formatMoney(inputResult)
    } else {
      inputResult.value = result
      formatMoney(inputResult)
    }
  })
}

function calcRecoveryMedia() {
  let annualBilling = stringToFloat(document.getElementById('annual_billing').value)
  let monthlyPayroll = stringToFloat(document.getElementById('monthly_payroll').value)
  let sector = stringToFloat(document.getElementById('sector').value)
  let segment = stringToFloat(document.getElementById('segment').value)
  
  return annualBilling * (sector * segment) + monthlyPayroll * 0.5
}

function formatMoney(input) {
  let charater = event.which;
  let old = input.value.replace(/[^\d.-]/g, '').replace('.', '');
  if (charater <= 105 && charater >= 96){
    old = old.substring(0, old.length -1);
    old = old + event.key;
  }
  
  old = old ? `${parseInt(old)}`: 0
  
  if (old.length === 1)
    old = '0,0' + old;
  else if (old.length === 2)
    old = '0,' + old;
  else if (old.length > 2)
    old = old.substring(0, old.length -2) + ',' + old.substring(old.length -2);
  
  input.value = 'R$ ' + old;
}

function stringToFloat(value){
  value = value.replace('R$ ', '').trim()
  return parseFloat(value)
}