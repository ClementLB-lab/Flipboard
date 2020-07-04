$(function () {
    function onResetPwdResponse(response: any)  {
        if (response.success)
            $(location).attr('href', "/")

        fieldError.clearAll()
        for (let [field, err] of Object.entries(response.fieldsErrors))
            fieldError.add($(`#${field}`), err)
    }

    $("#resetcurrentpwd-submit").click(function () {
        console.log("submitting resetcurrentpwd...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/resetcurrentpwd",
            data: {
                currentpassword: $("#currentpassword").val(),
                password: $("#password").val(),
                password2: $("#password2").val(),
            },
            success: onResetPwdResponse,
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })
})
