/*
  WEDDING WEBSITE PERSONALIZATION
  1. Add names, wedding date, venue, address and map link below.
  2. Date format: YYYY-MM-DDTHH:MM:SS+05:30
     Example only: 2027-02-14T10:30:00+05:30
  3. Leave WEDDING_DATE as an empty string until the date is confirmed.
*/
const WEDDING = {
  brideName: "హరిప్రియ",
  groomName: "సాయి ఆదిత్య",
  weddingDate: "", // Example: "2027-02-14T10:30:00+05:30"
  venueName: "Wedding venue to be announced",
  venueAddress: "Add the full venue address here",
  mapUrl: "https://maps.google.com/"
};

const byId = (id) => document.getElementById(id);
const dateOptions = { day: "numeric", month: "long", year: "numeric" };

function setText(id, value) {
  const el = byId(id);
  if (el) el.textContent = value;
}

function formatWeddingDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Wedding date to be announced";
  return new Intl.DateTimeFormat("en-IN", {
    ...dateOptions, weekday: "long"
  }).format(date);
}

function personalizePage() {
  setText("brideName", WEDDING.brideName);
  setText("groomName", WEDDING.groomName);
  setText("footerNames", `${WEDDING.brideName} & ${WEDDING.groomName}`);
  setText("venueName", WEDDING.venueName);
  setText("venueAddress", WEDDING.venueAddress);

  const hasDate = WEDDING.weddingDate.trim() !== "";
  const dateLabel = hasDate ? formatWeddingDate(WEDDING.weddingDate) : "Wedding date to be announced";
  setText("heroDate", dateLabel);
  setText("venueDate", hasDate ? dateLabel : "To be announced");
  setText("muhurthamMeta", hasDate ? `${dateLabel} · Muhurtham time to be added` : "Date & time to be added");

  const mapLink = byId("mapLink");
  if (mapLink) mapLink.href = WEDDING.mapUrl || "https://maps.google.com/";

  updateCountdown();
}

function updateCountdown() {
  const countdown = byId("countdown");
  const note = byId("countdownNote");
  if (!countdown || !note) return;

  if (!WEDDING.weddingDate.trim()) {
    countdown.innerHTML = `<div><strong>--</strong><span>Days</span></div>
      <div><strong>--</strong><span>Hours</span></div>
      <div><strong>--</strong><span>Minutes</span></div>
      <div><strong>--</strong><span>Seconds</span></div>`;
    note.textContent = "The countdown will begin once the wedding date is added.";
    return;
  }

  const target = new Date(WEDDING.weddingDate).getTime();
  if (Number.isNaN(target)) {
    note.textContent = "Please enter a valid wedding date in script.js.";
    return;
  }
  const remaining = target - Date.now();
  if (remaining <= 0) {
    countdown.innerHTML = `<div class="countdown-finished"><strong>♥</strong><span>Today is the day!</span></div>`;
    note.textContent = "Wishing the couple a lifetime of love and happiness.";
    return;
  }

  const units = [
    ["Days", Math.floor(remaining / 86400000)],
    ["Hours", Math.floor((remaining % 86400000) / 3600000)],
    ["Minutes", Math.floor((remaining % 3600000) / 60000)],
    ["Seconds", Math.floor((remaining % 60000) / 1000)]
  ];
  countdown.innerHTML = units.map(([label, value]) =>
    `<div><strong>${String(value).padStart(2, "0")}</strong><span>${label}</span></div>`
  ).join("");
}

const menuToggle = byId("menuToggle");
const mainNav = byId("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.textContent = open ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

const revealObserver = ("IntersectionObserver" in window)
  ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll(".reveal").forEach(el => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add("visible");
});

const shareButton = byId("shareButton");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: `${WEDDING.brideName} & ${WEDDING.groomName} — Wedding Invitation`,
      text: "You're warmly invited to celebrate this beautiful beginning!"
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Invitation link copied. You can now share it with your family!");
      } else {
        prompt("Copy your website link and share it:", window.location.href);
      }
    } catch (error) {
      if (error.name !== "AbortError") alert("You can copy the website link from your browser's address bar to share it.");
    }
  });
}

personalizePage();
if (WEDDING.weddingDate.trim()) window.setInterval(updateCountdown, 1000);
