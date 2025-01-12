const dropList = document.querySelectorAll("form select"),
paraBirimden = document.querySelector(".from select"),
paraBirimine = document.querySelector(".to select"),
getButton = document.querySelector("form button");

let ulkeler_list = {
    "AED" : "AE",
    "AFN" : "AF",
    "XCD" : "AG",
    "ALL" : "AL",
    "AMD" : "AM",
    "ANG" : "AN",
    "AOA" : "AO",
    "AQD" : "AQ",
    "ARS" : "AR",
    "AUD" : "AU",
    "AZN" : "AZ",
    "BAM" : "BA",
    "BBD" : "BB",
    "BDT" : "BD",
    "XOF" : "BE",
    "BGN" : "BG",
    "BHD" : "BH",
    "BIF" : "BI",
    "BMD" : "BM",
    "BND" : "BN",
    "BOB" : "BO",
    "BRL" : "BR",
    "BSD" : "BS",
    "NOK" : "BV",
    "BWP" : "BW",
    "BYR" : "BY",
    "BZD" : "BZ",
    "CAD" : "CA",
    "CDF" : "CD",
    "XAF" : "CF",
    "CHF" : "CH",
    "CLP" : "CL",
    "CNY" : "CN",
    "COP" : "CO",
    "CRC" : "CR",
    "CUP" : "CU",
    "CVE" : "CV",
    "CYP" : "CY",
    "CZK" : "CZ",
    "DJF" : "DJ",
    "DKK" : "DK",
    "DOP" : "DO",
    "DZD" : "DZ",
    "ECS" : "EC",
    "EEK" : "EE",
    "EGP" : "EG",
    "ETB" : "ET",
    "EUR" : "FR",
    "FJD" : "FJ",
    "FKP" : "FK",
    "GBP" : "GB",
    "GEL" : "GE",
    "GGP" : "GG",
    "GHS" : "GH",
    "GIP" : "GI",
    "GMD" : "GM",
    "GNF" : "GN",
    "GTQ" : "GT",
    "GYD" : "GY",
    "HKD" : "HK",
    "HNL" : "HN",
    "HRK" : "HR",
    "HTG" : "HT",
    "HUF" : "HU",
    "IDR" : "ID",
    "ILS" : "IL",
    "INR" : "IN",
    "IQD" : "IQ",
    "IRR" : "IR",
    "ISK" : "IS",
    "JMD" : "JM",
    "JOD" : "JO",
    "JPY" : "JP",
    "KES" : "KE",
    "KGS" : "KG",
    "KHR" : "KH",
    "KMF" : "KM",
    "KPW" : "KP",
    "KRW" : "KR",
    "KWD" : "KW",
    "KYD" : "KY",
    "KZT" : "KZ",
    "LAK" : "LA",
    "LBP" : "LB",
    "LKR" : "LK",
    "LRD" : "LR",
    "LSL" : "LS",
    "LTL" : "LT",
    "LVL" : "LV",
    "LYD" : "LY",
    "MAD" : "MA",
    "MDL" : "MD",
    "MGA" : "MG",
    "MKD" : "MK",
    "MMK" : "MM",
    "MNT" : "MN",
    "MOP" : "MO",
    "MRO" : "MR",
    "MTL" : "MT",
    "MUR" : "MU",
    "MVR" : "MV",
    "MWK" : "MW",
    "MXN" : "MX",
    "MYR" : "MY",
    "MZN" : "MZ",
    "NAD" : "NA",
    "XPF" : "NC",
    "NGN" : "NG",
    "NIO" : "NI",
    "NPR" : "NP",
    "NZD" : "NZ",
    "OMR" : "OM",
    "PAB" : "PA",
    "PEN" : "PE",
    "PGK" : "PG",
    "PHP" : "PH",
    "PKR" : "PK",
    "PLN" : "PL",
    "PYG" : "PY",
    "QAR" : "QA",
    "RON" : "RO",
    "RSD" : "RS",
    "RUB" : "RU",
    "RWF" : "RW",
    "SAR" : "SA",
    "SBD" : "SB",
    "SCR" : "SC",
    "SDG" : "SD",
    "SEK" : "SE",
    "SGD" : "SG",
    "SKK" : "SK",
    "SLL" : "SL",
    "SOS" : "SO",
    "SRD" : "SR",
    "STD" : "ST",
    "SVC" : "SV",
    "SYP" : "SY",
    "SZL" : "SZ",
    "THB" : "TH",
    "TJS" : "TJ",
    "TMT" : "TM",
    "TND" : "TN",
    "TOP" : "TO",
    "TRY" : "TR",
    "TTD" : "TT",
    "TWD" : "TW",
    "TZS" : "TZ",
    "UAH" : "UA",
    "UGX" : "UG",
    "USD" : "US",
    "UYU" : "UY",
    "UZS" : "UZ",
    "VEF" : "VE",
    "VND" : "VN",
    "VUV" : "VU",
    "YER" : "YE",
    "ZAR" : "ZA",
    "ZMK" : "ZM",
    "ZWD" : "ZW"
}


for (let i = 0; i < dropList.length; i++) {
    for(let paraKodu in ulkeler_list){
        // Varsayılan olarak USD'yi KİMDEN para birimi ve TRY'yi KİME para birimi olarak seç
        let selected = i == 0 ? paraKodu == "USD" ? "selected" : "" : paraKodu == "TRY" ? "selected" : "";
        // Para kodunu text ve value olarak kullanarak option etiketini oluştur
        let optionTag = `<option value="${paraKodu}" ${selected}>${paraKodu}</option>`;
        // select etiketi içine option etiketini ekle
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        bayrakYukle(e.target); // hedef elementi argüman olarak geçirerek bayrakYukle işlevini çağır
    });
}

function bayrakYukle(element){
    for(let kod in ulkeler_list){
        if(kod == element.value){ // Eğer ülke listesindeki para kodu option değerine eşitse
            let imgTag = element.parentElement.querySelector("img"); // ilgili drop list'in img etiketini seç
            // Seçilen para koduna göre ülke kodunu img URL'sine yerleştir
            imgTag.src = `https://flagcdn.com/48x36/${ulkeler_list[kod].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); // formun gönderilmesini engeller
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempkod = paraBirimden.value; // KİMDEN drop list'in geçici para kodu
    paraBirimden.value = paraBirimine.value; // KİME para kodunu KİMDEN para koduna geçir
    paraBirimine.value = tempkod; // geçici para kodunu KİME para koduna geçir
    bayrakYukle(paraBirimden); // bayrakYukle işlevini KİMDEN select elementiyle çağır
    bayrakYukle(paraBirimine); // bayrakYukle işlevini KİME select elementiyle çağır
    getExchangeRate(); // getExchangeRate işlevini çağır
})

function getExchangeRate(){
    const tutar = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let tutarVal = tutar.value;
    // Eğer kullanıcı herhangi bir değer girmezse veya 0 girerse, varsayılan olarak 1 değeri yerleştirilir
    if(tutarVal == "" || tutarVal == "0"){
        tutar.value = "1";
        tutarVal = 1;
    }
    exchangeRateTxt.innerText = "Döviz kuru alınıyor...";
    let url = `https://v6.exchangerate-api.com/v6/aa6653229e61ba4ae19f1fda/latest/${paraBirimden.value}`;
    
    // API yanıtını al ve js objesine ayrıştırarak geri döndür, ardından o objeyi al
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[paraBirimine.value]; // kullanıcı tarafından seçilen KİME para biriminin döviz kuru
        let totalExRate = (tutarVal * exchangeRate).toFixed(2); // kullanıcı tarafından girilen değeri seçilen KİME döviz kuru ile çarp
        exchangeRateTxt.innerText = `${tutarVal} ${paraBirimden.value} = ${totalExRate} ${paraBirimine.value}`;
    }).catch(() =>{ // Eğer kullanıcı çevrimdışıysa veya veri alınırken bir hata oluşursa catch işlevi çalışır
        exchangeRateTxt.innerText = "Bir hata oluştu";
    });
}

