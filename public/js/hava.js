// Durum
let guncelSehir = "Malatya";
let units = "metric";  

// Seçiciler
let city = document.querySelector(".il");
let datetime = document.querySelector(".zaman");
let havaDurumuTahmini = document.querySelector('.hava-durumu-tahmini');
let havaSicakligi = document.querySelector(".hava-sicakligi");
let havaDurumuIcon = document.querySelector(".hava-durumu-icon");
let havaDurumuMinMax = document.querySelector(".hava-durumu-minmax");
let hissedilenSicaklik = document.querySelector('.hissedilen-sicaklik');
let havaNem = document.querySelector('.hava-nem');
let havaRuzgari = document.querySelector('.hava-ruzgari');
let havaDurumuBasinc = document.querySelector('.hava-durumu-basinc');
let gunlukTahminiContainer = document.querySelector('.gunluk-tahmini'); 

// Arama
document.querySelector(".hava-durumu-arama").addEventListener('submit', e => {
    let search = document.querySelector(".hava-durumu-arama-form");
    // Varsayılan işlemi engelle
    e.preventDefault();
    // Şehir ismini güncelle
    guncelSehir = search.value;
    // Hava durumu al
    getHavaDurumu();
    // Formu temizle
    search.value = ""
})

// Birimler
document.querySelector(".hava-durumu-derece-C").addEventListener('click', () => {
    if(units !== "metric"){
        // Celsius'a geç
        units = "metric"
        // Hava durumu al
        getHavaDurumu()
    }
})

function zamanDamgasiniCevir(timestamp, timezone){
     const convertTimezone = timezone / 3600; // saniyeleri saatlere dönüştür

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("tr-TR", options)
}

// Ülke kodunu isme dönüştür
function ulkeKoduDonusturma(ulki){
    let bolgeIsimleri = new Intl.DisplayNames(["tr"], {type: "region"});
    return bolgeIsimleri.of(ulki)
}

function getHavaDurumu(lat = null, lon = null) {//Enlem ve boylam değişkenleri
    const API_KEY = '9b06695880876d3dcead8840099e691c';
    let url;

    if (lat && lon) {
        
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${guncelSehir}&appid=${API_KEY}&units=${units}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            city.innerHTML = `${data.name}, ${ulkeKoduDonusturma(data.sys.country)}`;
            datetime.innerHTML = zamanDamgasiniCevir(data.dt, data.timezone);
            havaDurumuTahmini.innerHTML = `<p>${data.weather[0].main}</p>`;
            havaSicakligi.innerHTML = `${data.main.temp.toFixed()}&#176`;
            havaDurumuIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
            havaDurumuMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
            hissedilenSicaklik.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
            havaNem.innerHTML = `${data.main.humidity}%`;
            havaRuzgari.innerHTML = `${data.wind.speed} m/s`;
            havaDurumuBasinc.innerHTML = `${data.main.pressure} hPa`;

            fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=${units}`
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    gunlukTahminiContainer.innerHTML = "";

                    data.daily.forEach(day => {
                        const gunlukHTML = `
                            <div class="gunluk-kart">
                                <h3>${zamanDamgasiniCevir(day.dt, data.timezone).split(",")[0]}</h3>
                                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
                                <p>${day.weather[0].main}</p>
                                <p>Min: ${day.temp.min.toFixed()}&#176</p>
                                <p>Max: ${day.temp.max.toFixed()}&#176</p>
                            </div>
                        `;
                        gunlukTahminiContainer.innerHTML += gunlukHTML;
                    });
                });
        })
        .catch(error => {
            gunlukTahminiContainer.innerHTML += `<p>Hata: ${error.message}</p>`;
        });
}

//  Geolocation API
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getHavaDurumu(lat, lon); 
            },
            error => {
                console.log(`Hata: ${error.message}`);
                getHavaDurumu(); 
            }
        );
    } else {
        alert("Tarayıcınız konum özelliğini desteklemiyor.");
        getHavaDurumu(); 
    }
}

document.body.addEventListener("load", getCurrentLocation());
