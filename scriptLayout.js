(function() {

    let longit;
    let latit;
    let currentDataFeelsLike;

    let currentTempTwoDay;
    let currentTempThirdDay;

    const updateBodyImgByQuery = query => {
        unsplash.photos.getRandomPhoto(query, 1)
            .then(response => response.json())
            .then(json => {
                const { urls } = json;
                document.body.style.backgroundImage = `url(${urls['full']})`;
            });
    };

    let currentDataTemp;

    const createAndAppendElement = (tag, options = {}, appendTo = document.body) => {
        const element = document.createElement(tag);
        Object.keys(options).forEach(key => {
            element[key] = options[key];
        });
        appendTo.append(element);
        return element;
    };

    const header = createAndAppendElement('header', { className: 'headerTag' });
    const sectionMain = createAndAppendElement('div', { className: 'sectionMain' });
    const divNavigation = createAndAppendElement('div', { className: 'divNavigation' }, header);

    function createButtons() {
        const fragment = new DocumentFragment();
        const symbols = ['⟳', '°F', '°C'];
        symbols.forEach((symbol, i) => {
            fragment.append(createAndAppendElement('button', { innerHTML: symbol, className: `button${i} button`, id: `idBut${i}` }));
        });
        return fragment;
    };

    divNavigation.append(createButtons());

    let itemRadio = document.getElementsByClassName('button');

    let wordsForSearching = "weather";

    document.getElementById('idBut0').addEventListener('click', () => updateBodyImgByQuery(wordsForSearching));

    document.getElementById('idBut1').addEventListener('click', () => {
        itemRadio[1].style.backgroundColor = '#b7babb';
        itemRadio[1].style.color = '#ff4d4d';
        itemRadio[2].style.backgroundColor = '#d7dadc';
        itemRadio[2].style.color = '#FFFFFF';
        divNumberAdd.innerHTML = Math.round(currentDataTemp - 237);
       overcast1.innerHTML = `FEELS LIKE: ${Math.round(currentDataFeelsLike -237)}`;
        document.querySelector('.tuesdayBlockTwo').innerHTML = `${Math.round(currentDataTemp - 233)}`;
        document.querySelector('.wednesdayBlockTwo').innerHTML = `${Math.round(currentTempTwoDay - 235)}`;
        document.querySelector('.thursdayBlockTwo').innerHTML = `${Math.round(currentTempThirdDay - 230)}`;
    });


    document.getElementById('idBut2').addEventListener('click', () => {
        itemRadio[1].style.backgroundColor = '#d7dadc';
        itemRadio[1].style.color = '#FFFFFF';
        itemRadio[2].style.backgroundColor = '#b7babb';
        itemRadio[2].style.color = '#ff4d4d';
        divNumberAdd.innerHTML = `${Math.round(currentDataTemp - 273)}°`;
        overcast1.innerHTML = `FEELS LIKE: ${Math.round(currentDataFeelsLike - 273)}°`;
        document.querySelector('.tuesdayBlockTwo').innerHTML = `${Math.round(currentDataTemp - 274)}°`;
        document.querySelector('.wednesdayBlockTwo').innerHTML = `${Math.round(currentTempTwoDay - 275)}°`;
        document.querySelector('.thursdayBlockTwo').innerHTML = `${Math.round(currentTempThirdDay - 280)}°`;

    });

    const select = createAndAppendElement('select', { className: 'tagSelect', id: 'menu' }, divNavigation);

    function createListLanguages() {
        let fragment = new DocumentFragment();
        let languages = ['EN', 'RU', 'BE'];

        languages.forEach(language => {
            const option = createAndAppendElement('option', { innerHTML: language, className: 'optionTag', value: language });
            fragment.append(option);
        });
        return fragment;
    };

    select.append(createListLanguages());

    const formOptions = {
        className: 'geocoder',
        id: 'geocoder'
    };
    const form = createAndAppendElement('div', formOptions, header);

    form.append(createAndAppendElement('input', { className: `inputEnter`, placeholder: `Search city or ZIP` }));
    form.append(createAndAppendElement('button', { innerHTML: 'SEARCH', className: `go` }));
    document.querySelector('.go').addEventListener('click', () => {
        const city = document.querySelector('.inputEnter').value;
        getCoordinates(city);
        imagFl = true;
    });

    function getCoordinates(city) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=ca25d960828c4aab88c65b1e03a68c8c&language=en&pretty=1&no_annotations=1`;

        fetch(url).then(response => { return response.json() }).then(data => {
            latit = data.results[0].geometry.lat;
            longit = data.results[0].geometry.lng;
            addMapAndSearchForMap(longit, latit);
            document.querySelector('.divDateCity').innerHTML = `${data.results[0].formatted}`;
            fetchCurrentWeatherAndUpdateDom(latit, longit);
        });
    };
   
    const sectionOneChild = {
        className: 'sectionOne',
    };
    const sectionOne = createAndAppendElement('section', sectionOneChild, sectionMain);

    const sectionTwoChild = {
        className: 'sectionTwo',
    };
    const sectionTwo = createAndAppendElement('section', sectionTwoChild, sectionMain);

    const divDateCity = {
        className: 'divDateCity',
    };
    const divCityAdd = createAndAppendElement('div', divDateCity, sectionOne);

    const divDateToday = {
        className: 'divDateToday',

    };
    const divDateTodayAdd = createAndAppendElement('div', divDateToday, sectionOne);

    const divNumberCommon = {
        className: 'divNumberCommon',
    };
    const divNumberCommonAdd = createAndAppendElement('div', divNumberCommon, sectionOne);

    const divNumber = {
        className: 'divNumber',
    };
    const divNumberAdd = createAndAppendElement('div', divNumber, divNumberCommonAdd);

    const divIcon = {
        className: 'divIcon',
    };
    const divIconAdd = createAndAppendElement('div', divIcon, divNumberCommonAdd);


    const divWeather = {
        className: 'divWeather',
    };
    const divWeatherAdd = createAndAppendElement('div', divWeather, divNumberCommonAdd);


    function createBlockWeatherContent() {
        const fragment = new DocumentFragment();
        const icons = ['OVERCAST', 'FEELS LIKE:', 'WIND:', 'HUMIDITY:'];
        const classNameContent = ['overcast']

        icons.forEach((icons, i) => {
            fragment.append(createAndAppendElement('div', { innerHTML: `${icons}`, id: `${classNameContent}${i}` }));

        });
        return fragment;
    };

    divWeatherAdd.append(createBlockWeatherContent());


    const divDaysBlock = {
        className: 'divDaysBlock',
    };

    const divDaysBlockAdd = createAndAppendElement('div', divDaysBlock, sectionOne);

    function createBlockWeatherThreeDays() {
        const fragment = new DocumentFragment();
        const icons = ['TUESDAY', 'WEDNESDAY', 'THURSDAY'];
        icons.forEach((icons, i) => {
            fragment.append(createAndAppendElement('div', { id: `${icons}` }));
        });
        return fragment;
    };

    divDaysBlockAdd.append(createBlockWeatherThreeDays());

    function createBlockWeatherYesterdayDay() {
        const fragment = new DocumentFragment();
        const icons = ['tuesdayBlockOne One', 'tuesdayBlockTwo Two', 'tuesdayBlockThird Third'];
        icons.forEach((icons, i) => {
            fragment.append(createAndAppendElement('div', { innerHTML: `Block${i}`, className: `${icons}` }));

        });
        return fragment;
    };

    TUESDAY.append(createBlockWeatherYesterdayDay());

    function createBlockWeatherTodayDay() {
        const fragment = new DocumentFragment();
        const icons = ['wednesdayBlockOne One', 'wednesdayBlockTwo Two', 'wednesdayBlockThird Third'];
        icons.forEach((icons, i) => {
            fragment.append(createAndAppendElement('div', { innerHTML: `Block${i}`, className: `${icons}` }));

        });
        return fragment;
    };

    WEDNESDAY.append(createBlockWeatherTodayDay());

    function createBlockWeatherTomorrowDay() {
        const fragment = new DocumentFragment();
        const icons = ['thursdayBlockOne One', ' thursdayBlockTwo Two', 'thursdayBlockThird Third'];
        icons.forEach((icons, i) => {
            fragment.append(createAndAppendElement('div', { innerHTML: `Block${i}`, className: `${icons}` }));

        });
        return fragment;
    };

    THURSDAY.append(createBlockWeatherTomorrowDay());

    const divMap = {
        className: 'divMap',
        id: 'map',
    };

    const divMapAdd = createAndAppendElement('div', divMap, sectionTwo);

    const divСoordinates = {
        className: 'divСoordinates',
    };

    const divСoordinatesAdd = createAndAppendElement('div', divСoordinates, sectionTwo);

    const unsplashAccessKey = "73d99572aa1a645630ea1221566db4747ad9293d28c6b6229491101de2c5a358";

    const unsplash = new window.Unsplash.default({
        accessKey: unsplashAccessKey,
        timeout: 500
    });

    const openWeatherApiKey = 'f6d2448ffd79ab7feb43fabf5a76fb17';

    const fetchWeatherDataByGeoCoordinates = (lat, lon, weatherType = 'forecast') => {
        return fetch(`https://api.openweathermap.org/data/2.5/${weatherType}?lat=${lat}&lon=${lon}&APPID=${openWeatherApiKey}`, {
            method: 'GET',
            mode: 'cors'
        }).then(
            res => {
                return res.json()
            }
        ).then(data => {
            console.warn('DATA FROM API', { data });
            return data;
        }).catch(e => {
            console.error('Some weather API ERROR', { e })
            return {};
        })
    };

    const fetchCurrentWeatherAndUpdateDom = (latit, longit) => {
        return fetchWeatherDataByGeoCoordinates(latit, longit, 'weather').then(data => {
            currentDataTemp = data.main.temp;
            currentDataFeelsLike = data.main.feels_like;
            currentTempTwoDay = data.main.temp_min;
            currentTempThirdDay = data.main.temp_max;

            divCityAdd.innerHTML = data.name;
            divNumberAdd.innerHTML = `${Math.round(data.main.temp - 273)}°`;
            overcast1.innerHTML = `FEELS LIKE: ${Math.round(data.main.feels_like-273)}°`;
            overcast2.innerHTML = `WIND: ${Math.round(data.wind.speed)} m/s`;
            overcast3.innerHTML = `HUMIDITY: ${data.main.humidity} %`;

            document.querySelector('.tuesdayBlockTwo').innerHTML = `${Math.round(data.main.temp - 274)}°`;
            document.querySelector('.wednesdayBlockTwo').innerHTML = `${Math.round(data.main.temp_min - 275)}°`;
            document.querySelector('.thursdayBlockTwo').innerHTML = `${Math.round(data.main.temp_max - 280)}°`;

            document.querySelector('.divIcon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            document.querySelector('.tuesdayBlockThird').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            document.querySelector('.wednesdayBlockThird').innerHTML = "<img src='http://openweathermap.org/img/wn/04d@2x.png'>";
            document.querySelector('.thursdayBlockThird').innerHTML = "<img src='http://openweathermap.org/img/wn/03d@2x.png'>";

            wordsForSearching = data.weather[0].description;
            let dataTime = data.sys;
            console.warn('wordsForSearching', { wordsForSearching });

            updateBodyImgByQuery(wordsForSearching);
        });
    }

    navigator.geolocation.getCurrentPosition((position) => {
        latit = position.coords.latitude;
        longit = position.coords.longitude;
        addMapAndSearchForMap(longit, latit);

        fetchWeatherDataByGeoCoordinates(latit, longit);
        fetchCurrentWeatherAndUpdateDom(latit, longit);
        
    });

    function addMapAndSearchForMap(xz, yz) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoibmlrb2xhZW5rbzk0IiwiYSI6ImNrM3k2dzlhYzB4bGMzZXA2cndob3Qyb3AifQ.4DJZJSwNbdtkph2RC9gusw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nikolaenko94/ck45rlskn27q21cp76yzsu9nc',
            center: [xz, yz],
            zoom: 10,
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
        });

        // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        document.querySelector('.divСoordinates').innerHTML = `Широта: ${latit.toFixed(3)} , Долгота: ${longit.toFixed(3)}`;
    };
})();
