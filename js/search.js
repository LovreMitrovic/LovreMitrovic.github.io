/*
    So if you have
    /blog
    - /blog1
    - - /index.html
    - /index.hrml
    - /search.html
    - /index.json

    Put this script in search.html
    And using form GET search.html/?query=something
    This script will print results in html using
    index provided in index.json.
    Results will be printed in ul#index
*/

async function search(query, jsonIndexUrl){
    try {
        const response = await fetch(jsonIndexUrl);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();

        query = query.toLowerCase();

        const result = data.filter((obj) => {
            return obj.content.toLowerCase().includes(query)
        }).map((obj) => {
            const target = obj.content.search(query);
            const start = target - 30 < 0 ? 0 : target - 30;
            const end = target + 500;

            const preview = obj.content.substring(start, end);
            return {
                title: obj.title,
                url: obj.url,
                preview
            }
        });

        return result;
    } catch(error) {
        console.error(`Error: ${error}`)
    }
}

function showResults(results){
    const ul = document.querySelector("ul#index")
    results.forEach(result => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const p = document.createElement('p')
        a.href = result.url;
        a.innerText = result.title;
        //p.innerHTML = result.preview;
        
        li.appendChild(a);
        li.appendChild(p);
        ul.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const query = params.get("query");
    document.querySelector("#query-span").innerText = query;
    let currentPath = url.pathname.split('/').slice(0,-1).join('/');
    const jsonIndexUrl = currentPath.endsWith('/') ? currentPath + 'index.json' : currentPath + '/index.json';

    const results = await search(query, jsonIndexUrl);
    console.log(results)
    showResults(results);
})