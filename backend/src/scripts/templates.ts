/**
 *
 * HOW TO USE TEMPLATES
 *
 * Any div with class="template" and data-key="[key]" will be replaced with the
 * template of key [key]
 *
 * If the content of the template is a string, the div will simple be replaced
 * by the content.
 *
 * If the content of the template is a function, the function will be called
 * with the div element as argument
 *
 *
 * You can add as many template as you want in the map below
 */

const templates ={
    "example" : "<p>Example template</p>",
    "tolist" : (e: JQuery) => {
        let html = "<li>"
        for (let elem of e.data("content").split(","))
            html += `<ul>${elem.trim()}</ul>`
        html += "</li>"

        e.html(html)
    }
};

$(function() {

    $(".template").each(function (_) {
        const key = $(this).data("key")

        const t = templates[key]

        if (t) {
            if (typeof t === 'function')
                t($(this))
            else
                $(this).replaceWith(t)
        } else
            console.error(`No template of key ${key} exists`)
    });
})


