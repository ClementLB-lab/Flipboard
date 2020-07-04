$(function () {
    function onForgotPwdResponse(response, errfield)  {
        if (response.success)
            $(location).attr('href', "/")

        errfield.innerHTML = response.fieldsErrors.email;
    }

    $("#forgotpwd-submit").click(function () {
        var errfield = document.getElementById('errmsg');
        
        if ($("#email").val() == '') {
            errfield.innerHTML = 'Vous n\'avez pas renseigné votre email';
            return
        }
        console.log("submitting forgotpwd...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/forgotpwd",
            data: {
                email: $("#email").val(),
            },
            success: (response) => onForgotPwdResponse(response, errfield),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })
})
