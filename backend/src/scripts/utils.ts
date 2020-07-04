const fieldError = {

    clearAll: function () {
        $(".js-fieldserror").remove()
    },

    /**
     * @param elem : The field elem
     * @param msg : The error message
     */
    add: function (elem, msg) {
        $(elem).parent().append(`
        <div class="alert alert-warning alert-dismissible fade show js-fieldserror" role="alert">
        ${msg}
        </div>
        `)
    },
}