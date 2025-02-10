import React from "react";

const CurrencyExchange = ({ setCurrencyRates, selectedCurrency, setSelectedCurrency }) => {
  // Handle currency change
  const handleCurrencyChange = (event) => {
    const selected = event.target.value;
    setSelectedCurrency(selected);

    // Hardcoded exchange rates relative to INR
    const exchangeRates = {
      INR: 1,         // Base currency
      USD: 0.012,     // 1 INR = 0.012 USD
      EURO: 0.011,    // 1 INR = 0.011 Euro
      POUND: 0.0093,  // 1 INR = 0.0093 Pound
    };

    // Update the conversion rate for the selected currency
    setCurrencyRates(exchangeRates[selected]); 
  };

  return (
    <div className="currency-converter w-60  flex flex-col justify-center items-center bg-gradient-to-r from-fuchsia-700 to-pink-600 p-3 rounded-xl shadow-md shadow-gray-700  ">
      <label htmlFor="currency" className="text-white font-semibold p-1">
        Select Currency
      </label>
      <select
        id="currency"
        value={selectedCurrency} 
        onChange={handleCurrencyChange}
        className="w-[80%] border-2 border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2  focus:border-white appearance-none relative font-semibold text-center hover:cursor-pointer"

      >
        <option value="INR" className="">INR (₹)</option>
        <option value="USD">USD ($)</option>
        <option value="EURO">EURO (€)</option>
        <option value="POUND">POUND (£)</option>
      </select>
    </div>
  );
};

export default CurrencyExchange;
