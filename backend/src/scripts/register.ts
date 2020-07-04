$(function () {
    function onRegisterResponse(response, errfield) {
        if (response.success)
            $(location).attr('href', "/")

        errfield.innerHTML = response.fieldsErrors.email;
    }

    $("#register-submit").click(function () {
        var errfield = document.getElementById('errmsg');
        
        if ($("#name").val() == '' || $("#email").val() == '' || 
        $("#password").val() == '' || $("#password2").val() == '') {
            errfield.innerHTML = 'Vous n\'avez pas renseigné tous les champs';
            return
        }

        if ($("#password").val() !== $("#password2").val()) {
            errfield.innerHTML = 'Les deux mots de passe diffèrent';
            return
        }

        console.log("submitting registration...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/register",
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val(),
            },
            success: (response) => onRegisterResponse(response, errfield),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })
})
