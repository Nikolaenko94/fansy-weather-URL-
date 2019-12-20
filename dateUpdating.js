(function() {
    // //!current add block days of the week
    const currentDate = new Date();
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let weaterBlock = ['tuesdayBlockOne', 'wednesdayBlockOne', 'thursdayBlockOne'];

    let installDay = currentDate.getDay();
    for (let i = 0; i < weaterBlock.length; i++) {
        if (installDay === 6) {
            installDay = 0;
            document.querySelector(`.${weaterBlock[i]}`).innerHTML = days[installDay];

        } else {
            installDay += 1;
            document.querySelector(`.${weaterBlock[i]}`).innerHTML = days[installDay];
        }
    };

    //!add time and day in block 
    function update() {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        };
        let date = new Date();
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        let seconds = date.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;

        document.querySelector('.divDateToday').innerHTML = `${currentDate.toLocaleString("ru", options)} ${hours}:${minutes}`;
    };

    setInterval(() => {
        update();
    }, 500);

})();