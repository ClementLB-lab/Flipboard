$(function () {
    function onResetPwdResponse(response, errfield)  {
        if (response.success)
            $(location).attr('href', "/")

        console.log(response)
        console.log(response.fieldsErrors)
        errfield.innerHTML = response.fieldsErrors.password;
    }

    $("#resetpwd-submit").click(function () {
        var errfield = document.getElementById('errmsg');
        
        if ($("#id").val() == '' || $("#token").val() == '') {
            errfield.innerHTML = 'Il semblerait qu\'il y ait un problème avec l\'url de réinitialisation du mot de passe';
            return
        }

        if ($("#password").val() == '' || $("#password2").val() == '') {
            errfield.innerHTML = 'Vous n\'avez pas renseigné tous les champs';
            return
        }

        console.log("submitting resetpwd...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/resetpwd",
            data: {
                password: $("#password").val(),
                password2: $("#password2").val(),
                id: $("#id").val(),
                token: $("#token").val(),
            },
            success: (response) => onResetPwdResponse(response, errfield),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })
})
