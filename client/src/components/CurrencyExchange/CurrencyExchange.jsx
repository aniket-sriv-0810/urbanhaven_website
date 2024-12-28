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
    <div className="currency-converter">
      <label htmlFor="currency" className="font-medium">
        Choose Currency:
      </label>
      <select
        id="currency"
        value={selectedCurrency} 
        onChange={handleCurrencyChange}
        className="border-2 border-gray-300 px-4 py-2 rounded-md ml-2"
      >
        <option value="INR">INR (₹)</option>
        <option value="USD">USD ($)</option>
        <option value="EURO">EURO (€)</option>
        <option value="POUND">POUND (£)</option>
      </select>
    </div>
  );
};

export default CurrencyExchange;
