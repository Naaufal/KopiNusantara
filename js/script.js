document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // slider
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  function changeSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  setInterval(changeSlide, 5000);

  // Form validasi
  const form = document.querySelector(".kontakForm form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const pesanInput = document.querySelector("#pesan");

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, pesan) {
    const formGroup = input.closest(".formGrup");
    let errorElement = formGroup.querySelector(".errorNotif");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.classList.add("errorNotif");
      errorElement.style.color = "red";
      errorElement.style.fontSize = "0.9rem";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = pesan;
    input.style.borderColor = "red";
  }

  function clearError(input) {
    const formGroup = input.closest(".formGrup");
    const errorElement = formGroup.querySelector(".errorNotif");

    if (errorElement) {
      errorElement.remove();
    }

    input.style.borderColor = "";
  }

  //   Validasi Pengisian Form
  form.addEventListener("submit", (e) => {
    let isValid = true;

    [nameInput, emailInput, pesanInput].forEach(clearError);

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Nama harus minimal 2 karakter");
      isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Format email tidak valid");
      isValid = false;
    }

    if (pesanInput.value.trim().length < 10) {
      showError(pesanInput, "Pesan harus minimal 10 karakter");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
  
});
