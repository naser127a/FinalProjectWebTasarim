const takvim = document.querySelector(".takvim"),
  tarih = document.querySelector(".tarih"),
  gunlerContainer = document.querySelector(".gunler"),
  onceki = document.querySelector(".onceki"),
  sonraki = document.querySelector(".sonraki"),
  bugunBtn = document.querySelector(".bugun-btn"),
  gitBtn = document.querySelector(".git-btn"),
  tarihInput = document.querySelector(".tarih-input"),
  etkinlikGunu = document.querySelector(".etkinlik-gunu"),
  etkinlikTarihi = document.querySelector(".etkinlik-tarihi"),
  etikinliklerContainer = document.querySelector(".etikinlikler"),
  etkinlikEkleBtn = document.querySelector(".etkinlik-ekle"),
  etkinlikEkleKapagi = document.querySelector(".etkinlik-ekle-kapagi"),
  etkinlikEkleKapatBtn = document.querySelector(".kapat"),
  etkinlikEkleAdi = document.querySelector(".etkinlik-adi"),
  etkinlikZamanbaslangici = document.querySelector(
    ".etkinlik-zamani-baslangic"
  ),
  etkinlikZamanBitisi = document.querySelector(".etkinlik-zamani-bitis"),
  etkinlikEkleSubmit = document.querySelector(".etkinlik-ekle-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
console.log("m:", month);
let year = today.getFullYear();

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const etikinliklerArr = [];
fetchEvents();
// burada etkinlikler gosterecek
console.log(etikinliklerArr);
const activeDayEl = document.querySelector(".day.active");
//select active day and add event class if not added
function ilkTakvim() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  tarih.innerHTML = months[month] + " " + year;

  let days = "";
  //onceki ay gunleri
  for (let x = day; x > 0; x--) {
    days += `<div class="day onceki-tarih">${prevDays - x + 1}</div>`;
  }
  //şimdiki ay gunleri
  for (let i = 1; i <= lastDate; i++) {
    let etkinlik = false;

    etikinliklerArr.forEach((etkinlikObj) => {
      if (
        etkinlikObj.day === i &&
        etkinlikObj.month === month + 1 &&
        etkinlikObj.year === year
      ) {
        etkinlik = true;
        console.log("evet true");
      }
    });

    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEtikinlikler(i);

      if (etkinlik) {
        console.log("evet");
        days += `<div class="day bugun active etkinlik">${i}</div>`;
      } else {
        days += `<div class="day bugun active">${i}</div>`;
      }
    } else {
      if (etkinlik) {
        days += `<div class="day etkinlik">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }
  //sonraki ay gunleri
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day sonraki-tarih">${j}</div>`;
  }

  gunlerContainer.innerHTML = days;
  takipciEkle();
}

function oncekiAy() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  ilkTakvim();
}

function sonrakiAy() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  ilkTakvim();
}

onceki.addEventListener("click", oncekiAy);
sonraki.addEventListener("click", sonrakiAy);

function takipciEkle() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEtikinlikler(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);

      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("onceki-tarih")) {
        oncekiAy();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("onceki-tarih") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("sonraki-tarih")) {
        sonrakiAy();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("sonraki-tarih") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

bugunBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  ilkTakvim();
});

tarihInput.addEventListener("input", (e) => {
  tarihInput.value = tarihInput.value.replace(/[^0-9/]/g, "");
  if (tarihInput.value.length === 2) {
    tarihInput.value += "/";
  }
  if (tarihInput.value.length > 7) {
    tarihInput.value = tarihInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (tarihInput.value.length === 3) {
      tarihInput.value = tarihInput.value.slice(0, 0);
    }
  }
});

function gitDate() {
  const tarihArr = tarihInput.value.split("/");
  if (tarihArr.length === 2) {
    if (tarihArr[0] > 0 && tarihArr[0] < 13 && tarihArr[1].length === 4) {
      month = tarihArr[0] - 1;
      year = tarihArr[1];
      ilkTakvim();
      return;
    }
  }
  alert("Geçersiz Tarih ,lütfen doğru bir tarih yazınız ");
}
gitBtn.addEventListener("click", gitDate);

function getActiveDay(tarih) {
  const day = new Date(year, month, tarih);
  const gunAdi = day.toString().split(" ")[0];
  etkinlikGunu.innerHTML = gunAdi;
  etkinlikTarihi.innerHTML = tarih + " " + months[month] + " " + year;
}

function updateEtikinlikler(tarih) {
  let etikinlikler = "";
  etikinliklerArr.forEach((etkinlik) => {
    if (
      tarih === etkinlik.day &&
      month + 1 === etkinlik.month &&
      year === etkinlik.year
    ) {
      if (etkinlik.etikinlikler) {
        etkinlik.etikinlikler.forEach((event) => {
          // console.log(etkinlik.id);
          etikinlikler += `<div class="etkinlik" data-event-id="${etkinlik.id}">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="etkinlik-basligi">${event.title}</h3>
          </div>
          <div class="etkinlik-zamani">
            <span class="etkinlik-zamani">${event.time}</span>
          </div>
          <div class="etkinlik-acciones">
       
            <button class="btn-edit btn-tasarim" style="color:blue" onclick="editEvent('${etkinlik.id}')">
             
              <i class="fa-solid fa-pen-to-square fa-2xl" style="color: #0000ff; font-size: 1rem;"></i>
            </button>
         
            <button class="btn-delete btn-tasarim" style="color:red" onclick="deleteEvent('${etkinlik.id}')">
            <i class="fa-solid fa-trash fa-2xl" style="color: #ed0202; font-size: 1rem;"></i>
            </button>
          </div>
      </div>`;
        });
      }
    }
  });
  if (etikinlikler === "") {
    etikinlikler = `<div class="etkinlik-yok">
            <h3>Etkinlik Yok</h3>
        </div>`;
  }
  etikinliklerContainer.innerHTML = etikinlikler;
}

etkinlikEkleBtn.addEventListener("click", () => {
  etkinlikEkleKapagi.classList.toggle("active");
});

etkinlikEkleKapatBtn.addEventListener("click", () => {
  etkinlikEkleKapagi.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== etkinlikEkleBtn && !etkinlikEkleKapagi.contains(e.target)) {
    etkinlikEkleKapagi.classList.remove("active");
  }
});

etkinlikEkleAdi.addEventListener("input", (e) => {
  etkinlikEkleAdi.value = etkinlikEkleAdi.value.slice(0, 60);
});

etkinlikZamanbaslangici.addEventListener("input", (e) => {
  etkinlikZamanbaslangici.value = etkinlikZamanbaslangici.value.replace(
    /[^0-9:]/g,
    ""
  );
  if (etkinlikZamanbaslangici.value.length === 2) {
    etkinlikZamanbaslangici.value += ":";
  }
  if (etkinlikZamanbaslangici.value.length > 5) {
    etkinlikZamanbaslangici.value = etkinlikZamanbaslangici.value.slice(0, 5);
  }
});

etkinlikZamanBitisi.addEventListener("input", (e) => {
  etkinlikZamanBitisi.value = etkinlikZamanBitisi.value.replace(/[^0-9:]/g, "");
  if (etkinlikZamanBitisi.value.length === 2) {
    etkinlikZamanBitisi.value += ":";
  }
  if (etkinlikZamanBitisi.value.length > 5) {
    etkinlikZamanBitisi.value = etkinlikZamanBitisi.value.slice(0, 5);
  }
});

//
etkinlikEkleSubmit.addEventListener("click", async (e) => {
  const etkinlikTitle = etkinlikEkleAdi.value;
  const etkinlikZamanBaslangic = etkinlikZamanbaslangici.value;
  const etkinlikZamanBitis = etkinlikZamanBitisi.value;

  if (
    etkinlikTitle === "" ||
    etkinlikZamanBaslangic === "" ||
    etkinlikZamanBitis === ""
  ) {
    alert("Lütfen tüm alanları doldurun");
    return;
  }

  const zamanBaslangici = convertTime(etkinlikZamanBaslangic);
  const zamanBitisi = convertTime(etkinlikZamanBitis);

  const newEvent = {
    title: etkinlikTitle,
    time: zamanBaslangici + " - " + zamanBitisi,
    day: activeDay,
    month: month + 1,
    year: year,
  };
  let userId = sessionStorage.getItem("userId");
  if(userId) {

    await fetch("/takvim/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...newEvent,userId}),
      
    });
    
    const existingDay = etikinliklerArr.find(
      (event) =>
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
    );

    if (existingDay) {
      existingDay.etikinlikler.push({
        title: newEvent.title,
        time: newEvent.time,
      });
    } else {
      etikinliklerArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        etikinlikler: [{ title: newEvent.title, time: newEvent.time }],
        userId:userId
      });
    }

    //
    etkinlikEkleKapagi.classList.remove("active");
    etkinlikEkleAdi.value = "";
    etkinlikZamanbaslangici.value = "";
    etkinlikZamanBitisi.value = "";
    ilkTakvim(); //
    updateEtikinlikler(activeDay); //
  } else{
    alert("Etkinlik kaydedilemedi, lütfen tekrar deneyin");
  }
});

//
async function fetchEvents() {
  let userId = sessionStorage.getItem("userId");
  try {
    const response = await fetch(`/takvim/getEvents/${userId}`);
    const events = await response.json();

    etikinliklerArr.length = 0;

    events.forEach((event) => {
      const existingEvent = etikinliklerArr.find(
        (e) =>
          e.day === event.day &&
          e.month === event.month &&
          e.year === event.year
      );

      if (existingEvent) {
        existingEvent.etikinlikler.push({
          title: event.title,
          time: event.time,
        });
      } else {
        etikinliklerArr.push({
          id: event._id,
          day: event.day,
          month: event.month,
          year: event.year,
          etikinlikler: [
            {
              title: event.title,
              time: event.time,
            },
          ],
        });
      }
    });

    ilkTakvim(); //
    updateEtikinlikler(activeDay);
  } catch (error) {
    console.error("Etkinlikler yüklenirken hata oluştu:", error);
  }
}

etikinliklerContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("etkinlik")) {
    const etkinlikTitle = e.target.querySelector(".etkinlik-basligi").innerHTML;

    if (confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
      etikinliklerArr.forEach((etkinlik) => {
        if (
          etkinlik.day === activeDay &&
          etkinlik.month === month &&
          etkinlik.year === year
        ) {
          etkinlik.etikinlikler.forEach((item, index) => {
            if (item.title === etkinlikTitle) {
              etkinlik.etikinlikler.splice(index, 1);
            }
          });
          if (etkinlik.etikinlikler.length === 0) {
            etikinliklerArr.splice(etikinliklerArr.indexOf(etkinlik), 1);
          }
        }
      });
      updateEtikinlikler(activeDay);
    }
  }
});

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

async function editEvent(eventId) {
  //
  // etkinlikEkleKapagi.classList.toggle("active");

  // const newTitle = etkinlikEkleAdi.value;
  // const newStartTime = etkinlikZamanbaslangici.value;
  // const newEndTime = etkinlikZamanBitisi.value;

  const newTitle = prompt("Yeni etkinlik adını girin:");
  const newStartTime = prompt("Yeni başlangıç zamanını girin (HH:MM):");
  const newEndTime = prompt("Yeni bitiş zamanını girin (HH:MM):");

  if (!newTitle || !newStartTime || !newEndTime) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const updatedEvent = {
    title: newTitle,
    time: `${convertTime(newStartTime)} - ${convertTime(newEndTime)}`, //
  };

  try {
    //
    const response = await fetch(`/takvim/editEvent/${eventId}`, {
      //
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });

    if (!response.ok) throw new Error("Etkinlik güncellenemedi.");

    alert("Etkinlik başarıyla güncellendi!");

    // takvim güncelleme
    await fetchEvents();
    updateEtikinlikler(activeDay);
  } catch (error) {
    console.error("Etkinlik düzenlenirken hata oluştu:", error);
    alert("Bir hata oluştu, lütfen tekrar deneyin.");
  }
}

async function deleteEvent(eventId) {
  if (!confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) return;

  try {
    //
    const response = await axios.delete(`/takvim/deleteEvent/${eventId}`);

    if (response.status !== 200) throw new Error("Etkinlik silinemedi.");

    alert("Etkinlik başarıyla silindi!");

    //
    await fetchEvents(); //
    updateEtikinlikler(activeDay); //
  } catch (error) {
    console.error("Etkinlik silinirken hata oluştu:", error);
    alert("Bir hata oluştu, lütfen tekrar deneyin.");
  }
}
