const container = document.getElementById("container");
const registerBtn = document.getElementById("kayit-ol");
const loginBtn = document.getElementById("giris");
const flashMessage = document.getElementById("flash-message");
const flashMessageRegister = document.getElementById("flash-message-register");
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.querySelector(".sign-up form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  const response = await fetch("/kullanici/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    window.location.href = "/kullanici"; // Başarılı kayıt sonrası yönlendirme
  } else {
    flashMessageRegister.innerHTML = result.message || "Kayıt başarısız";
    flashMessageRegister.style.padding = "10px 20px";

    setTimeout(() => {
      flashMessageRegister.style.opacity = "0";
      setTimeout(() => flashMessageRegister.remove(), 500);
    }, 3000);
  }
});

document.querySelector(".sign-in form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const response = await fetch("/kullanici/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    sessionStorage.setItem("userId", result.userId); // Oturumu sakla
    
    window.location.href = "/Projem"; // Başarılı giriş sonrası yönlendirme
  } else {
 
    flashMessage.innerHTML = result.message || "Giriş başarısız";
    flashMessage.style.padding = "10px 20px";

    setTimeout(() => {
      flashMessage.style.opacity = "0";
      setTimeout(() => flashMessage.remove(), 500);
    }, 3000);
  }
});


  
document.addEventListener("DOMContentLoaded", () => {
    const flashMessage = document.getElementById("flash-message-sn");
    
    if (flashMessage) {
      // 
     
      
      setTimeout(() => {
        
        flashMessage.style.opacity = "0";
        
        setTimeout(() => flashMessage.remove(), 500);
      }, 3000);
    }
  });
