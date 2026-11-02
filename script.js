const weddingTarget = new Date("2027-03-25T05:15:00+05:30");

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  const note = document.getElementById("countdownNote");
  if (!countdown || !note) return;

  const remaining = weddingTarget.getTime() - Date.now();

  if (remaining <= 0) {
    countdown.innerHTML = '<div><b>♥</b><span>Today is the day!</span></div>';
    note.textContent = "Wishing the couple a lifetime of happiness.";
    return;
  }

  const units = [
    ["Days", Math.floor(remaining / 86400000)],
    ["Hours", Math.floor((remaining % 86400000) / 3600000)],
    ["Minutes", Math.floor((remaining % 3600000) / 60000)],
    ["Seconds", Math.floor((remaining % 60000) / 1000)]
  ];

  countdown.innerHTML = units.map(([label, value]) =>
    `<div><b>${String(value).padStart(2, "0")}</b><span>${label}</span></div>`
  ).join("");

  note.textContent = "Until 25 March 2027 · 05:15 AM IST";
}

updateCountdown();
setInterval(updateCountdown, 1000);

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.textContent = mainNav.classList.contains("open") ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}

const shareButton = document.getElementById("shareButton");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Haripriya & Sai Aditya — Wedding Invitation",
          text: "You're warmly invited!",
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Invitation link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        prompt("Copy your invitation link:", window.location.href);
      }
    }
  });
}
