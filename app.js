/*
  Currency converter from in-class hackathon.  Goal
  was to find and use a public API.

  Used https://fixer.io/
  login: edphelps1@yahoo.com / n-m
  Allowed 1000 calls to a limited API.

  The allowed API forced the base currency to always be
  EUR so the conversion process gets the conversion rates
  of both currencies from Euros and then calculates the conversion
  from the first to the second.

  List of possible currencies came from another site that had
  a long list of currencies (then edited to the JS array/object format).
  Therefore there could be a currency that isn't recognized by the API.
  I didn't do much error checking

*/

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
  { symbol: 'AWG', name: 'Aruban Guilder/Florin' },
  { symbol: 'AZN', name: 'Azerbaijanian Manat' },
  { symbol: 'BAM', name: 'Konvertibilna Marka' },
  { symbol: 'BBD', name: 'Barbados Dollar' },
  { symbol: 'BDT', name: 'Taka' },
  { symbol: 'BGN', name: 'Bulgarian Lev' },
  { symbol: 'BHD', name: 'Bahraini Dinar' },
  { symbol: 'BIF', name: 'Burundi Franc' },
  { symbol: 'BMD', name: 'Bermudian Dollar' },
  { symbol: 'BND', name: 'Brunei Dollar' },
  { symbol: 'BOB', name: 'Boliviano' },
  { symbol: 'BRL', name: 'Brazilian Real' },
  { symbol: 'BSD', name: 'Bahamian Dollar' },
  { symbol: 'BTN', name: 'Ngultrum' },
  { symbol: 'BWP', name: 'Pula' },
  { symbol: 'BYR', name: 'Belarussian Ruble' },
  { symbol: 'BZD', name: 'Belize Dollar' },
  { symbol: 'CAD', name: 'Canadian Dollar' },
  { symbol: 'CDF', name: 'Congolese Franc' },
  { symbol: 'CHF', name: 'Swiss Franc' },
  { symbol: 'CLP', name: 'Chilean Peso' },
  { symbol: 'CNY', name: 'Yuan' },
  { symbol: 'COP', name: 'Colombian Peso' },
  { symbol: 'CRC', name: 'Costa Rican Colon' },
  { symbol: 'CUP', name: 'Cuban Peso' },
  { symbol: 'CVE', name: 'Cape Verde Escudo' },
  { symbol: 'CZK', name: 'Czech Koruna' },
  { symbol: 'DJF', name: 'Djibouti Franc' },
  { symbol: 'DKK', name: 'Danish Krone' },
  { symbol: 'DOP', name: 'Dominican Peso' },
  { symbol: 'DZD', name: 'Algerian Dinar' },
  { symbol: 'EGP', name: 'Egyptian Pound' },
  { symbol: 'ERN', name: 'Nakfa' },
  { symbol: 'ETB', name: 'Ethiopian Birr' },
  { symbol: 'EUR', name: 'Euro' },
  { symbol: 'FJD', name: 'Fiji Dollar' },
  { symbol: 'FKP', name: 'Falkland Islands Pound' },
  { symbol: 'GBP', name: 'Pound Sterling' },
  { symbol: 'GEL', name: 'Lari' },
  { symbol: 'GHS', name: 'Cedi' },
  { symbol: 'GIP', name: 'Gibraltar Pound' },
  { symbol: 'GMD', name: 'Dalasi' },
  { symbol: 'GNF', name: 'Guinea Franc' },
  { symbol: 'GTQ', name: 'Quetzal' },
  { symbol: 'GYD', name: 'Guyana Dollar' },
  { symbol: 'HKD', name: 'Hong Kong Dollar' },
  { symbol: 'HNL', name: 'Lempira' },
  { symbol: 'HRK', name: 'Croatian Kuna' },
  { symbol: 'HTG', name: 'Gourde' },
  { symbol: 'HUF', name: 'Forint' },
  { symbol: 'IDR', name: 'Rupiah' },
  { symbol: 'ILS', name: 'New Israeli Shekel' },
  { symbol: 'INR', name: 'Indian Rupee' },
  { symbol: 'IQD', name: 'Iraqi Dinar' },
  { symbol: 'IRR', name: 'Iranian Rial' },
  { symbol: 'ISK', name: 'Iceland Krona' },
  { symbol: 'JMD', name: 'Jamaican Dollar' },
  { symbol: 'JOD', name: 'Jordanian Dinar' },
  { symbol: 'JPY', name: 'Yen' },
  { symbol: 'KES', name: 'Kenyan Shilling' },
  { symbol: 'KGS', name: 'Som' },
  { symbol: 'KHR', name: 'Riel' },
  { symbol: 'KPW', name: 'North Korean Won' },
  { symbol: 'KRW', name: 'South Korean Won' },
  { symbol: 'KWD', name: 'Kuwaiti Dinar' },
  { symbol: 'KYD', name: 'Cayman Islands Dollar' },
  { symbol: 'KZT', name: 'Tenge' },
  { symbol: 'LAK', name: 'Kip' },
  { symbol: 'LBP', name: 'Lebanese Pound' },
  { symbol: 'LKR', name: 'Sri Lanka Rupee' },
  { symbol: 'LRD', name: 'Liberian Dollar' },
  { symbol: 'LSL', name: 'Loti' },
  { symbol: 'LYD', name: 'Libyan Dinar' },
  { symbol: 'MAD', name: 'Moroccan Dirham' },
  { symbol: 'MDL', name: 'Moldavian Leu' },
  { symbol: 'MGA', name: 'Malagasy Ariary' },
  { symbol: 'MKD', name: 'Denar' },
  { symbol: 'MMK', name: 'Kyat' },
  { symbol: 'MNT', name: 'Tugrik' },
  { symbol: 'MOP', name: 'Pataca' },
  { symbol: 'MRO', name: 'Ouguiya' },
  { symbol: 'MUR', name: 'Mauritius Rupee' },
  { symbol: 'MVR', name: 'Rufiyaa' },
  { symbol: 'MWK', name: 'Kwacha' },
  { symbol: 'MXN', name: 'Mexican Peso' },
  { symbol: 'MYR', name: 'Malaysian Ringgit' },
  { symbol: 'MZN', name: 'Metical' },
  { symbol: 'NAD', name: 'Namibia Dollar' },
  { symbol: 'NGN', name: 'Naira' },
  { symbol: 'NIO', name: 'Cordoba Oro' },
  { symbol: 'NOK', name: 'Norwegian Krone' },
  { symbol: 'NPR', name: 'Nepalese Rupee' },
  { symbol: 'NZD', name: 'New Zealand Dollar' },
  { symbol: 'OMR', name: 'Rial Omani' },
  { symbol: 'PAB', name: 'Balboa' },
  { symbol: 'PEN', name: 'Nuevo Sol' },
  { symbol: 'PGK', name: 'Kina' },
  { symbol: 'PHP', name: 'Philippine Peso' },
  { symbol: 'PKR', name: 'Pakistan Rupee' },
  { symbol: 'PLN', name: 'PZloty' },
  { symbol: 'PYG', name: 'Guarani' },
  { symbol: 'QAR', name: 'Qatari Rial' },
  { symbol: 'RON', name: 'Leu' },
  { symbol: 'RSD', name: 'Serbian Dinar' },
  { symbol: 'RUB', name: 'Russian Ruble' },
  { symbol: 'RWF', name: 'Rwanda Franc' },
  { symbol: 'SAR', name: 'Saudi Riyal' },
  { symbol: 'SBD', name: 'Solomon Islands Dollar' },
  { symbol: 'SCR', name: 'Seychelles Rupee' },
  { symbol: 'SDG', name: 'Sudanese Pound' },
  { symbol: 'SEK', name: 'Swedish Krona' },
  { symbol: 'SGD', name: 'Singapore Dollar' },
  { symbol: 'SHP', name: 'Saint Helena Pound' },
  { symbol: 'SLL', name: 'Leone' },
  { symbol: 'SOS', name: 'Somali Shilling' },
  { symbol: 'SRD', name: 'Suriname Dollar' },
  { symbol: 'STD', name: 'Dobra' },
  { symbol: 'SYP', name: 'Syrian Pound' },
  { symbol: 'SZL', name: 'Lilangeni' },
  { symbol: 'THB', name: 'Baht' },
  { symbol: 'TJS', name: 'Somoni' },
  { symbol: 'TMT', name: 'Manat' },
  { symbol: 'TND', name: 'Tunisian Dinar' },
  { symbol: 'TOP', name: 'Pa’anga' },
  { symbol: 'TRY', name: 'Turkish Lira' },
  { symbol: 'TTD', name: 'Trinidad and Tobago Dollar' },
  { symbol: 'TWD', name: 'Taiwan Dollar' },
  { symbol: 'TZS', name: 'Tanzanian Shilling' },
  { symbol: 'UAH', name: 'Hryvnia' },
  { symbol: 'UGX', name: 'Uganda Shilling' },
  { symbol: 'USD', name: 'US Dollar' },
  { symbol: 'UYU', name: 'Peso Uruguayo' },
  { symbol: 'UZS', name: 'Uzbekistan Sum' },
  { symbol: 'VEF', name: 'Bolivar Fuerte' },
  { symbol: 'VND', name: 'Dong' },
  { symbol: 'VUV', name: 'Vatu' },
  { symbol: 'WST', name: 'Tala' },
  { symbol: 'XAF', name: 'CFA Franc BCEAO' },
  { symbol: 'XCD', name: 'East Caribbean Dollar' },
  { symbol: 'XPF', name: 'CFP Franc' },
  { symbol: 'YER', name: 'Yemeni Rial' },
  { symbol: 'ZAR', name: 'Rand' },
  { symbol: 'ZMW', name: 'Zambian Kwacha' },
  { symbol: 'ZWL', name: 'Zimbabwe Dollar' },
];

// <select>
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>

/* ==================================================
* Fill the selection lists from the currency array
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
* Convert currency, no error checking provided
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

  // get a convenience copy of the span to place result or error msg
  const elemResult = document.getElementById("result");

  // make AJAX call
  axios.get(urlConversion)
    .then((oResponse) => {
      console.log("-- response --");
      console.log(`Data:${JSON.stringify(oResponse.data)}`);
      console.log("^^^^^^^^^^^^^^");

      // oResponse.data example format:
      // {
      //   success: true,
      //   timestamp: 1536341348,
      //   base: "EUR",
      //   date: "2018-09-07",
      //   rates: {
      //     ARS: 42.694451,
      //     AUD: 1.62677,
      //   },
      // };

      if (oResponse.data.success) {
        // perform conversion
        const fRate1 = parseFloat(oResponse.data.rates[sSymbolFrom]);
        const fRate2 = parseFloat(oResponse.data.rates[sSymbolTo]);
        console.log(`rate1=${fRate1}`);
        console.log(`rate2=${fRate2}`);
        const fAmt = parseFloat(sAmt);
        const fCurr2 = (fRate2 / fRate1) * fAmt;

        // update display
        elemResult.innerText = fCurr2;
      } else {
        // display error mesg
        const sErrorMsg = JSON.stringify(oResponse);
        elemResult.innerText = sErrorMsg;
      }

    }) // then
    .catch((error) => {
      // display AJAX error msg
      console.log("-- error --");
      console.log(`${error}`);
      const sErrorMsg = JSON.stringify(error);
      elemResult.innerText = sErrorMsg;
    }); // catch

}

/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // convenience variables
  const selFromDiv = document.getElementById("from");
  const selToDiv = document.getElementById("to");
  const elemAmtToConvert = document.getElementById("amtToConvert");

  // init the two currency selection lists
  initElemCurrencySelect(selFromDiv);
  initElemCurrencySelect(selToDiv);

  // wrapper to add params to the onclick handler
  function localActionConvert() {
    actionConvert(selFromDiv.querySelector("select"), selToDiv.querySelector("select"), elemAmtToConvert);
  }

  document.getElementById("convert-btn").onclick = localActionConvert;
});
