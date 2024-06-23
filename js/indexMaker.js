/*
    This script looks for every ul element with attribute
    indexFor. Then it fills that ul element with shortcuts
    for each article inside element whose id is in
    idexFor attribute. Every article which is indexed
    needs to have id and one h2 element inside it.

    Id is used for creating link and h2 is used
    for creating title inside index.
*/

document.addEventListener("DOMContentLoaded", function(){
    let indecies = document.querySelectorAll('ul[indexFor]');
    indecies.forEach((index) => {
        fillIndex(index.id, index.getAttribute('indexFor'))
    })
});

function fillIndex(id, indexFor){
    let sectionWithArticles = document.getElementById(indexFor)
    let articles = sectionWithArticles.querySelectorAll("article");
    let index = document.getElementById(id)
    articles.forEach((article) => {
        let li = document.createElement("li");
        let shortcut = document.createElement("a");
        shortcut.href = `#${article.getAttribute('id')}`
        shortcut.innerHTML = article.querySelector("h2").innerHTML;
        li.appendChild(shortcut);
        index.appendChild(li);
    })
}