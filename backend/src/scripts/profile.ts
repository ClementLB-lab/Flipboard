$(function () {

    function printFollower(followerId, followerName,  avatarUrl) {
        var followerField = document.getElementById('list-followers');
        var nodeList = document.createElement("li"); // Create a <li> node
        var divWrapper = document.createElement("div");
        divWrapper.setAttribute("class","section-tiles__tile-wrapper");

        var aLink = document.createElement("a"); // Create a <a> node
        aLink.setAttribute("class","section-tiles__tile media-link internal-link");
        aLink.setAttribute("role","link");
        aLink.setAttribute("href","http://localhost:8080/profile?id=" + followerId);

        var divImage = document.createElement("div"); // Create a <div> node
        divImage.setAttribute("class","section-tiles__image");

        var divCroppedImage = document.createElement("div"); // Create a <div> node
        divCroppedImage.setAttribute("class","cropped-image media-container");


        var Image = document.createElement("img"); // Create a <div> node
        Image.setAttribute("src", avatarUrl);
        Image.setAttribute("style", "position: absolute; width: 153px; height: 153px; top: -2px; left: 0px;");


        var divOverlay = document.createElement("div"); // Create a <div> node
        divOverlay.setAttribute("class","section-tiles__tile-overlay");

        var divContent = document.createElement("div"); // Create a <div> node
        divContent.setAttribute("class","section-tiles__tile-content");

        var title = document.createElement("h3");
        title.setAttribute("class","section-tiles__title ui-text--title--small");
        title.innerText = followerName;
        
        divContent.appendChild(title)
        divCroppedImage.appendChild(Image)
        divImage.appendChild(divCroppedImage)
        aLink.appendChild(divImage)
        aLink.appendChild(divOverlay)
        aLink.appendChild(divContent)
        divWrapper.appendChild(aLink)
        nodeList.appendChild(divWrapper)
        followerField.appendChild(nodeList)
    }

    function onSearchMagazineResponse(response)  {
        console.log(response)
        printFollower(response.followerId, response.followerName, response.avatarUrl)
    }

    window.onload = function () {

        console.log("get followers...")
        var id = $("#profile-id").val();

        console.log("Id de la personne : " + id)

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/backapi/user/getFollowers",
            data: {
                id: id
            },
            success: (response) => onSearchMagazineResponse(response),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    }

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




    // PROFILE functions

    $("#edit-profile-submit").click(function() {
        $('#edit-user').show();
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
            $('#edit-user').hide();
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
        $('#edit-user').hide();
        $('#create-mag').hide();
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


    // MAGAZINE functions

    $("#addMagazine").click(function() {
        $('#create-mag').show();
    });

    function onCreateMagazineResponse(response, errfield2, name, description)  {

        console.log(response.err)
        if (response.success ==  false && response.err != undefined)
            errfield2.innerHTML = response.err;
        else {
            $('#create-mag').hide();
            var magazineField = document.getElementById('allMagazines');
            var nodeList = document.createElement("li"); // Create a <li> node
            var divWrapper = document.createElement("div");
            divWrapper.setAttribute("class","section-tiles__tile-wrapper");

            var aLink = document.createElement("a"); // Create a <a> node
            aLink.setAttribute("class","section-tiles__tile media-link internal-link");
            aLink.setAttribute("role","link");
//            aLink.setAttribute("href","");

            var divImage = document.createElement("div"); // Create a <div> node
            divImage.setAttribute("class","section-tiles__image");

            var divOverlay = document.createElement("div"); // Create a <div> node
            divOverlay.setAttribute("class","section-tiles__tile-overlay");

            var divContent = document.createElement("div"); // Create a <div> node
            divContent.setAttribute("class","section-tiles__tile-content");

            var title = document.createElement("h3");
            title.setAttribute("class","section-tiles__title ui-text--title--small");
            title.innerText = name;
            
            divContent.appendChild(title)
            aLink.appendChild(divImage)
            aLink.appendChild(divOverlay)
            aLink.appendChild(divContent)
            divWrapper.appendChild(aLink)
            nodeList.appendChild(divWrapper)
            magazineField.appendChild(nodeList)
       }
    }

    $("#mag-create-submit").click(function() {
        var errfield2 = document.getElementById('errmsg2');

        if ($("#mag-name").val() == '') {
            errfield2.innerHTML = 'Vous devez donner un nom à votre nouveau magazine';
            return
        }
        console.log("submitting createmagazine...")
        var name = $("#mag-name").val()
        var description = $("#mag-field").val()
        
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/backapi/user/createmagazine",
            data: {
                name: name,
                description: description
            },
            success: (response) => onCreateMagazineResponse(response, errfield2, name, description),
            error: (_) => alert("Erreur inconnue, veuillez réessayer")
        });
    });

    $('#mag-cancel-submit').click(function() {
        $('#create-mag').hide();
    });

    $("#mag-name").keyup(function() {
        if ($(this).val().toString().length >= 3) {
            $('#mag-create-submit').prop("disabled", false); // Element(s) are now enabled.
        }
        else
            $('#mag-create-submit').prop("disabled", true);
    });
})