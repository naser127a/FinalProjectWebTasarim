let isLoggedIn = false;
let userId = sessionStorage.getItem("userId");

if (userId) {
  isLoggedIn = true;
} 

console.log(isLoggedIn);

const authSection = document.getElementById("auth-section");

function updateAuthUI() {
  
  authSection.innerHTML = isLoggedIn
    ? `<img src="/images/log-out_3691166.png" alt="Logout" style="cursor: pointer;" width="auto" height="40px" id="signout" name="signout">`
    : `<img src="/images/login.png" alt="Login" style="cursor: pointer;" width="auto" height="40px" id="login" name="login">`;

  
  const actionButton = isLoggedIn
    ? document.getElementById("signout")
    : document.getElementById("login");

  actionButton.addEventListener("click", () => {
    if (isLoggedIn) {
      isLoggedIn = false;
      sessionStorage.removeItem("userId"); 
      alert("çıkış yapmak istiyor musunuz?");
      updateAuthUI(); 
      window.location.href = "Projem"; 
    } else {
      window.location.href = "kullanici"; 
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI(); 

  
  const flashMessage = document.getElementById("flash-message");
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.style.opacity = "0"; 
      setTimeout(() => flashMessage.remove(), 500); 
    }, 3000); 
  }

  
  const text = "Nasır Akraa";
  const container = document.getElementById("animated-text");
  if (container) {
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.style.fontSize = "60px";
      span.style.opacity = "0";
      span.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      span.style.transform = "translateY(10px)";
      span.textContent = char;
      container.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, index * 150); 
    });
  }
});
