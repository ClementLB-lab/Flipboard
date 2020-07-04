$(function () {

    $("#header-profile").hide()
    $("#header-connect").show() // Default : connect

    console.log("submitting me...")
    $.ajax({
        type: "GET",
        url: "/backapi/user/me",
        success: function (user) {
            if (user) {
                $("#header-connect").hide()
                $("#header-profile").show()
                $("#header-profile-name").text(user.name)
                $("#access-profil").data("user-id", user.id)
            } else{
                $("#header-connect").show()
                $("#header-profile").hide()
            }
        }
    });

    $("#access-profil").click(function () {
        console.log("Test")
        let id  = $(event.target).closest("#access-profil").data("user-id")
        console.log(id)

        $(location).attr('href', `/profile?id=${id}`)
    })

    $("#header-profile-logout").click(function () {

        console.log("submitting logout...")

        $.ajax({
            type: "POST",
            url: "/backapi/user/logout",
            success: function () {
                $(location).attr('href', "/")
            },
            // error: () => alert("Failed")
        });
    })
})