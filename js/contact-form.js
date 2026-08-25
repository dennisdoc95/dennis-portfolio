// Inizializzazione di EmailJS
emailjs.init({
    publicKey: "dH94S5tH_kSm5l4Tl",
    blockHeadless: true,
    limitRate: {
        id: "contact-form",
        throttle: 10000
    }
});

// Elementi del form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitButton = contactForm.querySelector('button[type="submit"]');

// Invio del form
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";
    contactForm.setAttribute("aria-busy", "true");
    formStatus.textContent = "";

    emailjs.sendForm(
        "service_rwn5ime",
        "template_q55dmcl",
        contactForm
    ).then(
        function () {
            formStatus.textContent =
                "Messaggio inviato correttamente. Ti risponderò appena possibile.";

            formStatus.className =
                "contact-form__status contact-form__status--success";

            contactForm.reset();
        },
        function (error) {
            formStatus.textContent =
                "Non è stato possibile inviare il messaggio. Riprova più tardi.";

            formStatus.className =
                "contact-form__status contact-form__status--error";

            console.error("Errore EmailJS:", error);
        }
    ).finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Invia il messaggio";
        contactForm.removeAttribute("aria-busy");
    });
});