$(function () {

    function onProfileFollowResponse(response)  {
        if (response.err == undefined) {
            var buttonVal = document.getElementById('follow-submit');
            if (buttonVal.innerHTML == "Suivre")
                buttonVal.innerHTML = "Se désabonner"
            else if (buttonVal.innerHTML == "Se désabonner")
                buttonVal.innerHTML = "Suivre"
        }
        else
            alert(response.err)
    }

    $("#follow-submit").click(function () {

        console.log("submitting follow...")

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/profilefollow",
            data: {
                profileId: $("#profile-id").val()
            },
            success: (response) => onProfileFollowResponse(response),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    })

    $("#edit-profile-submit").click(function() {
        $('.hover_bkgr_fricc').show();
    });

    function onEditProfileResponse(response, errfield, name, bioStr)  {

        if (response.success ==  false && response.fieldsErrors.err != undefined)
            errfield.innerHTML = response.fieldsErrors.err;
        else {
            var fieldBio = document.getElementById('section-header-bio');
            var text = document.createTextNode(bioStr);

            if (fieldBio.childNodes[0] != undefined)
                fieldBio.removeChild(fieldBio.childNodes[0])
            fieldBio.appendChild(text);

            var fieldName = document.getElementById('profile-name');

            fieldName.innerHTML = name
            $('.hover_bkgr_fricc').hide();
        }
    }

    $("#save-profile-submit").click(function() {
        var errfield = document.getElementById('errmsg');

        if ($("#bio-name").val() == '') {
            errfield.innerHTML = 'Vous devez rentrer votre nom';
            return
        }
        console.log("submitting editprofile...")
        var name = $("#bio-name").val()
        var bioStr = $("#bio-field").val()
        
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/editprofile",
            data: {
                name: $("#bio-name").val(),
                bio: bioStr
            },
            success: (response) => onEditProfileResponse(response, errfield, name, bioStr),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    });

    $('.popupCloseButton').click(function() {
        $('.hover_bkgr_fricc').hide();
    });

    $('textarea').keyup(function() {
        const max = 160
        var characterCount = $(this).val().toString().length
        console.log(characterCount)

        if (characterCount <= max) {
            var bioLength = document.getElementById('bio-length');
            bioLength.innerHTML = characterCount.toString() + "/160"
        }
    });
})