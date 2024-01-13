

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try{
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.access_key}&format=1`);
        const rate = response.data.rates;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];
        return exchangeRate;
    }
    catch (error) { 
           throw new Error(`Unable to get currency ${fromCurrency} and  ${toCurrency}`);  
        }
};


const getCountries = async (currencyCode) => {
    try{
         const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        // return an array of country names
        return response.data.map(country => country.name);
    }
    catch (error) { 
           throw new Error(`Unable to get countries that use ${currencyCode}`);  
        }
   
}


const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);

    //formatting the converted amount to 2 decimal places
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}