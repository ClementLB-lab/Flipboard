$(function () {
    function onLoginResponse(response, errfield)  {
        if (response.success)
            $(location).attr('href', "/")

        if (response.fieldsErrors.email != '')
            errfield.innerHTML = response.fieldsErrors.email;
        else
            errfield.innerHTML = "Mot de passe incorrect";
    }

    $("#login-submit").click(function () {
        var errfield = document.getElementById('errmsg');
        
        if ($("#email").val() == '' || $("#password").val() == '') {
            errfield.innerHTML = 'Vous n\'avez pas renseigné tous les champs';
            return
        }

        console.log("submitting login...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/login",
            data: {
                password: $("#password").val(),
                email: $("#email").val(),
            },
            success: (response) => onLoginResponse(response, errfield),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })
})
