const container = document.getElementById('container');
const registerBtn = document.getElementById('kayit-ol');
const loginBtn = document.getElementById('giris');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
