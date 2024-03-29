function genTextHTML(obj) {
    let text = '<select name="from" id="car_from">';
    for (const [key, value] of Object.entries(obj)) {
        text += String(`<option value=${value}>${key}</option>`);
    }
    text += '</select>';
    return text;
}


function initMap(centerCity, wayPoints) {
    document.querySelector('#map').innerHTML = '';
    ymaps.ready(function () {
        var myMap;
        ymaps.geocode(centerCity).then(function (res) {
            myMap = new ymaps.Map('map', {
                center: res.geoObjects.get(0).geometry.getCoordinates(),
                zoom: 11,
                controls: []
            });

            var searchControl = new ymaps.control.SearchControl({
                options: {
                    provider: 'yandex#search'
                }
            });

            myMap.controls.add(searchControl);


            var multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: wayPoints
            }, {
                editorDrawOver: false,
                editorMidPointsType: "way",
                reverseGeocoding: false
            });


            multiRoute.editor.start({
                addWayPoints: true,
                removeWayPoints: true,
            });

            multiRoute.events.add('update', async function () {
                if (multiRoute.getActiveRoute() != null) {

                    length = multiRoute.getActiveRoute().properties.get("distance");
                    duration = multiRoute.getActiveRoute().properties.get('duration');
                    points = multiRoute.getWayPoints().toArray();

                    console.log(length);
                    console.log(duration);

                    let position = undefined;
                    calc();
                    setPrice();
                }
            });

            myMap.geoObjects.add(multiRoute);
        });
    });
}

let p0_0 = {
    'Севастополь': 800,
    'Балаклава': 1100,
    'Инкерман': 1100,
    'Сахарная головка': 1100,
    'Штурмовое': 1100,
    'Черноречье': 1100,
    'Хмельницкое': 1100,
    'Северная сторона': 2000,
    'Любимовка': 2500,
    'Орловка, Севастополь': 3500,
    'Бельбек': 3500,
    'Кача': 3700,
    'Андреевка': 4000,
    'Верхнесадовое': 3500,
    'Фронтовое': 3500,
    'Терновка': 2000,
    'Родное': 2000,
    'Гончарное': 2000,
    'Резервное': 2000,
    'Орлиное': 3200,
    'Передовое': 3500,
    'Ласпинская бухта - Батилиман ': 3000,
};

let p0_1 = {
    'Бахчисарай': 4000,
    'Симферополь': 5500,
    'Ялта': 5500,
    'Керчь': 15000,
    'Евпатория': 7000,
    'Саки': 6000,
    'Черноморское': 9500,
    'Феодосия': 10500,
    'Судак': 10000,
    'Белогорск': 7500,
    'Джанкой': 8000,
    'Красногвардейское': 7500,
    'Красноперекопск': 11000,
    'Форос': 3500,
    'Олива': 3500,
    'Кострополь': 3500,
    'Парковое': 3500,
    'Береговое': 3500,
    'Семеиз': 4500,
    'Алупка': 4500,
    'Кореиз': 4500,
    'Гаспра': 4500,
    'Гурзуф': 6500,
    'Партенит': 6500,
    'Алушта': 7000,
};

let p1_0 = {
    'Симферополь': 800,
    'Приятное Свидание': 1100,
    'Трудолюбово': 1100,
    'Каштановое': 1100,
    'Кизиловое': 1100,
    'Константиновка': 1100,
    'Клиновка': 1100,
    'Андрусово': 1100,
    'Пионерское': 1100,
    'Денисовка': 1100,
    'Трудовое': 1100,
    'Солнечное': 1100,
    'Укромное': 1100,
    'Красная Зорька': 1100,
    'Гвардейское': 1100,
    'Донское': 1100,
    'Перевальное': 1100,
    'Ароматное': 2000,
    'Крымская Роза': 2000,
    'Трудолюбовка': 2000,
    'Железнодорожное': 2000,
    'Вилино': 3500,
    'Андреевка': 4000,
};

let p1_1 = {
    'Севастополь': 5000,
    'Бахчисарай': 2500,
    'Ялта': 4500,
    'Керчь': 10500,
    'Евпатория': 4500,
    'Саки': 3000,
    'Феодосия': 6000,
    'Судак': 5500,
    'Джанкой': 5000,
    'Красногвардейское': 3500,
    'Красноперекопск': 6500,
    'Щелкино': 8500,
    'Алушта': 3000,
    'Партенит': 3500,
    'Гурзуф': 4000,
    'Алупка': 5000,
    'Гаспра': 5000,
};