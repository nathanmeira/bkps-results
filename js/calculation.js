let mapSector = {
  industry: 0.015,
  commerce: 0.01,
  service: 0.005
}

let elements = document.getElementsByClassName('calculation')

for(let i = 0; i < elements.length; i++){
  let element = elements[i]

  element.addEventListener('change', () => calcRecoveryMedia())
}

function calcRecoveryMedia() {
  let annualBillingValue = stringToFloat(document.getElementById('annual_billing').value)
  let monthlyPayrollValue = stringToFloat(document.getElementById('monthly_payroll').value)
  let segmentValue = stringToFloat(document.getElementById('segment').value)

  let sectorKey = document.getElementById('sector').value
  let sectorValue = stringToFloat(mapSector[sectorKey])

  let constValue = sectorValue * segmentValue

  let recoveryMedia = annualBillingValue * constValue + monthlyPayrollValue * 0.5

  let inputResult = document.getElementById('recovery_media')

  // add value to recovery media
  if (isNaN(recoveryMedia)) {
    inputResult.value = 0
    formatMoney(inputResult)
  } else {
    inputResult.value = recoveryMedia.toFixed(2)
    formatMoney(inputResult)
  }

  // add values to card by sector
  if(sectorKey === 'industry'){
    document.getElementById('industry_irpj_csll').textContent =
        toCurrency((recoveryMedia - (monthlyPayrollValue * 0.5)) * 0.15)
    document.getElementById('industry_pis_confins').textContent =
        toCurrency((recoveryMedia - (monthlyPayrollValue * 0.5)) * 0.7)
    document.getElementById('industry_inss').textContent =
        toCurrency(monthlyPayrollValue * 0.5)
    document.getElementById('industry_ipi').textContent =
        toCurrency((recoveryMedia - (monthlyPayrollValue * 0.5)) * 0.05)
    document.getElementById('industry_icms').textContent =
        toCurrency((annualBillingValue * constValue) * 0.1)
  } else if (sectorKey === 'commerce') {
    document.getElementById('commerce_irpj_csll').textContent =
        toCurrency((annualBillingValue * constValue) * 0.15)
    document.getElementById('commerce_pis_confins').textContent =
        toCurrency((annualBillingValue * constValue) * 0.6)
    document.getElementById('commerce_inss').textContent =
        toCurrency(monthlyPayrollValue * 0.5)
    document.getElementById('commerce_icms').textContent =
        toCurrency((annualBillingValue * constValue) * 0.15)
  } else if (sectorKey === 'service') {
    document.getElementById('service_irpj_csll').textContent =
        toCurrency((annualBillingValue * constValue) * 0.0)
    document.getElementById('service_pis_confins').textContent =
        toCurrency((annualBillingValue * constValue) * 0.0)
    document.getElementById('service_inss').textContent =
        toCurrency(monthlyPayrollValue * 0.75)
  }

  // show card by sector
  let sections = document.getElementsByClassName('section-sector')
  for(let i = 0; i < sections.length; i++) {
    if(sections[i]) sections[i].style.display = 'none'
  }

  let section = document.getElementById(sectorKey)
  if(section) section.style.display = 'block'
}

function formatMoney(input) {
  let charater = event.which
  let old = input.value.replace(/[^\d.-]|\./g, '')
  if (charater <= 105 && charater >= 96){
    old = old.substring(0, old.length -1)
    old = old + event.key
  }
  
  old = old ? `${parseInt(old)}`: 0

  if (old.length === 1)
    old = '0.0' + old
  else if (old.length === 2)
    old = '0.' + old
  else if (old.length > 2)
    old = old.substring(0, old.length -2) + '.' + old.substring(old.length -2)
  
  input.value = toCurrency(parseFloat(old))
}

function stringToFloat(value){
  if (!value)
    return 0
  else if (isNaN(value)) {
    value = value.replace(/\./g, '').replace(',', '.').replace('R$', '').trim()
    return parseFloat(value)
  } else
    return value
}

function toCurrency(value) {
  if (isNaN(value))
    return 'R$ 0,00'
  else
    return 'R$ ' + value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
}