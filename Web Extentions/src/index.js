import Axios from "axios";
const displayCarbonUsage = async (apiKeyValue, region) => {
    try {
        
        const response = await Axios.get('https://api.co2signal.com/v1/latest', {
            params: {
                countryCode: region,
            },
            headers: {
                'auth-token': apiKeyValue,
            },
        })
        

        let CO2 = Math.floor(response.data.data.carbonIntensity);
        console.log(response);
        loading.style.display = 'none';
        form.style.display = 'none';
        myRegion.textContent = region;
        carbonUsage.textContent = 
            Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour';
        
        fossilFuel.textContent = 
            response.data.data.fossilFuelPercentage.toFixed(2) + '% (percentage of fossil fuels used to generate electricity)';
        result.style.display = 'block';
        



    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
        result.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
    }
} 
const init = () => {
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');

    if (!storedApiKey || !storedRegion){
        form.style.display = 'block';
        result.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
    }
    else {
        displayCarbonUsage(storedApiKey, storedRegion);
        result.style.display = 'none';
        form.style.display = 'none';
        clearBtn.style.display = 'block';
    }
    
}

const reset = (e) => {
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}
const setUpUser = (apiKeyValue, regionName) => {
    localStorage.setItem('apiKey', apiKeyValue);
    localStorage.setItem('regionName', regionName);
    loading.style.display = 'block';
    errors.textContent = '';
    clearBtn.style.display = 'block';

    displayCarbonUsage(apiKeyValue, regionName);
}

const handleSubmit = (e) => {
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}


// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');
// results
const loading = document.querySelector('.loading');
const errors = document.querySelector('.errors');
const result = document.querySelector('.result-container');
const myRegion = document.querySelector('.my-region');
const carbonUsage = document.querySelector('.carbon-usage');
const fossilFuel = document.querySelector('.fossil-fuel');
const clearBtn = document.querySelector('.clear-btn');

form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
init();

