const apiKey = "pub_594764bf7198aeb599f7b489bdf4075a96069"; // API Anahtarı
const container = document.querySelector(".container");
const seceneklerContainer = document.querySelector(".secenekler-container");
const country = "tr"; 
const secenekler = [
  "top",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const haberler = [
    "Son Dakika", 
    "iş", 
    "eğlence", 
    "sağlık", 
    "bilim", 
    "spor",
    "teknoloji", 
  ];

let requestURL;

// Haberleri arayüzü
const UIUretmek = (makaleler) => {
  container.innerHTML = ""; // Eski haberleri temizle
  if (!makaleler || makaleler.length === 0) {
    container.innerHTML = `<p>Şu anda haber bulunmamaktadır.</p>`;
    return;
  }
  let c = 1;
  for (let makale of makaleler) {
    let haberKarti = document.createElement("div");
    haberKarti.classList.add("yeni-haberler-karti");
    haberKarti.id =`yeni-haberler${c}`;
    c++;

    let imageUrl = makale.image_url || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fsearch%2Fprojects%2Fhalk%3Flocale%3Dzh_TW&psig=AOvVaw3GmrbFuhDGIpiBGuKPy1QR&ust=1731951073728000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiPhdvy44kDFQAAAAAdAAAAABAJ"; 
    haberKarti.innerHTML = `
      <div class="haberler-goruntu-container">
        <img src="${imageUrl}" alt="haber görseli" />
      </div>
      <div class="haberleri-icerigi">
        <div class="haberler-basligi">
          <h2>${makale.title || "Başlık Yok"}</h2>
        </div>
        <div class="haberler-detaylari">
          ${makale.description || "Açıklama bulunmamaktadır."}
        </div>
        <a href="${makale.link}" target="_blank" class="oku-btn">Daha Fazla Oku</a>
      </div>`;
      haberKarti.setAttribute("onClick", "sendToWebsite()");

    container.appendChild(haberKarti);
  }
};

function sendToWebsite(){
  window.location.href = "duyurlar.html"
}
// API'den haberleri al
const verileriAlma = async () => {
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }

    let data = await response.json();
    if (data.status === "error") {
      throw new Error(data.results.message || "Bilinmeyen bir hata oluştu");
    }

    UIUretmek(data.results); // Verileri görüntüle
  } catch (error) {
    console.error("Haberler alınırken hata:", error);
    container.innerHTML = `<p>Hata: ${error.message}</p>`;
  }
};

// Kategori butonlarını ekle
const seceneklerOlusturma = () => {
    seceneklerContainer.innerHTML = ""; // Eski seçenekleri temizle
    for (let i of secenekler) {
      seceneklerContainer.innerHTML += `<button class="secenek ${
        i === "top" ? "active" : ""
      }" onclick="kategoriSecme(event,'${i}')">${haberler[secenekler.indexOf(i)]}</button>`;
    }
  };

// Kategori seçimi
const kategoriSecme = (e, category) => {
  let secenekler = document.querySelectorAll(".secenek");
  secenekler.forEach((element) => {
    element.classList.remove("active");
  });

  e.target.classList.add("active");

  // Kategori için API bağlantısını güncelle
  requestURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}`;
  verileriAlma();
};

// Sayfa yüklendiğinde başlat
const init = () => {
  requestURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=top`;
  verileriAlma();
  seceneklerOlusturma();
};



window.onload = () => {
  setTimeout(init(), 60000);
};
