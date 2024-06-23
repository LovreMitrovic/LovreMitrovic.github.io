/*
    Inisde html there needs to be one ol element
    with attribue quotes
    which contains li elements. Li elements
    represent quote source. They MUST have unique
    ids. When you want to quote put a element
    with attribute quote and value needs to be id
    of quote. That a element will be filed with href
    to link and innerHtml will be number of li
    element.
*/

document.addEventListener("DOMContentLoaded", function(){
    let qQuotes = document.querySelectorAll('Quote');
    let olQuotes = document.querySelector('ol[quotes]');
    qQuotes.forEach((q) => {
        let idOfQuote = q.getAttribute('value');
        let listOfQuotes = Array.from(olQuotes.querySelectorAll('li'));
        let ordinalNum = listOfQuotes.map(
            (el) => el.getAttribute('id')
        ).indexOf(idOfQuote) + 1;
        let a = document.createElement('a')
        a.innerHTML = `[${ordinalNum}]`
        a.href = `#${idOfQuote}`
        q.appendChild(a);
    })
});