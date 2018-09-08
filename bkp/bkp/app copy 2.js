
const BASE_URL = "http://data.fixer.io/api/latest?";
const ACCESS_KEY = "e834973e0a8734ff71e0e0d2774ebe42";

const aCurrencies = [
  { symbol: 'AED', name: 'UAE Dirham' },
  { symbol: 'AFN', name: 'Afghani' },
  { symbol: 'ALL', name: 'Lek' },
  { symbol: 'AMD', name: 'Armenian Dram' },
  { symbol: 'AOA', name: 'Kwanza' },
  { symbol: 'ARS', name: 'Argentine Peso' },
  { symbol: 'AUD', name: 'Australian Dollar' },
];

// <select>
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>

/* ==================================================
*
* =================================================== */
function initElemCurrencySelect(elemSelectionContainer) {
  const elemSelect = document.createElement("select");
  for (const currency of aCurrencies) {
    // console.log(currency);
    const elemOption = document.createElement("option");
    elemOption.value = currency.symbol;
    elemOption.innerText = `${currency.symbol} - ${currency.name}`;
    elemSelect.appendChild(elemOption);
  }
  elemSelectionContainer.appendChild(elemSelect);
}

/* ==================================================
*
* =================================================== */
function actionConvert(selFrom, selTo, elemAmtToConvert) {

  // Get user input
  const sSymbolFrom = selFrom.options[selFrom.selectedIndex].value;
  const sSymbolTo = selTo.options[selTo.selectedIndex].value;
  const sAmt = elemAmtToConvert.value;

  console.log(`from: ${sSymbolFrom}`);
  console.log(`to: ${sSymbolTo}`);
  console.log(`amt: ${sAmt}`);

  // build ajax url
  let urlConversion = BASE_URL;
  urlConversion += `access_key=${ACCESS_KEY}`;
  urlConversion += `&symbols=${sSymbolFrom},${sSymbolTo}`;
  console.log(urlConversion);

  // make AJAX call

  // perform conversion
  const oResponse =
  {
    success: true,
    timestamp: 1536341348,
    base: "EUR",
    date: "2018-09-07",
    rates: {
      ARS: 42.694451,
      AUD: 1.626778,
    },
  };

  let sErrorMsg = "";

  const elemResult = document.getElementById("result");

  if (oResponse.success) {
    const fRate1 = parseFloat(oResponse.rates[sSymbolFrom]);
    const fRate2 = parseFloat(oResponse.rates[sSymbolTo]);
    console.log(`rate1=${fRate1}`);
    console.log(`rate2=${fRate2}`);
    const fAmt = parseFloat(sAmt);
    const fCurr2 = (fRate2 / fRate1) * fAmt;

    // update display
    elemResult.innerText = fCurr2;
  } else {
    sErrorMsg = JSON.stringify(oResponse);
  }

  // handle error
  if (sErrorMsg) {
    elemResult.innerText = sErrorMsg;
  }


  // axios.get(urlConversion)
  //   .then((response) => {
  //     console.log("-- response --");
  //     console.log(`Data:${response.data}`);
  //   }) // then
  //   .catch((error) => {
  //     console.log("-- error --");
  //     console.log(`${error}`);
  //   }); // catch
}

/* ==================================================
*
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const selFromDiv = document.getElementById("from");
  const selToDiv = document.getElementById("to");
  const elemAmtToConvert = document.getElementById("amtToConvert");

  initElemCurrencySelect(selFromDiv);
  initElemCurrencySelect(selToDiv);

  function localActionConvert() {
    actionConvert(selFromDiv.querySelector("select"), selToDiv.querySelector("select"), elemAmtToConvert);
  }

  document.getElementById("convert-btn").onclick = localActionConvert;
});
