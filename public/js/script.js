// Example starter JavaScript for disabling form submissions if there are invalid fields
// IIFE: Immediately Invoked Function Expression
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validate-form')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault() // to stop it from submitting
                event.stopPropagation() // to stop it from bubbling
            }

            form.classList.add('was-validated')
        }, false)
    })
})();