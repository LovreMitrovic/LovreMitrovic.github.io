document.addEventListener("DOMContentLoaded", function(){
    let lists = document.querySelectorAll('.death-records-list');
    lists.forEach((list) => {
        let records = list.querySelectorAll('.death-record');
        records.forEach((record) => {
            try{
                let deathDate = record.querySelector('.death-date');
                let age = record.querySelector('.age');
                if(deathDate == null || age == null){
                    throw new Error('Death date or age doesnt exist');
                }
        
                let pattern = /\d+.\d+.\d+./;
                if(!pattern.test(deathDate.innerHTML)){
                    throw new Error('Death date has wrong format');
                }
        
                let deathYear = Number(deathDate.innerHTML.split('.')[2]);
                let birthYear = deathYear - Number(age.innerHTML);
        
                let birthDescription = document.createElement('span');
                birthDescription.innerHTML = `Procjenjena godina rođenja je <span class='birth-year'>${birthYear}</span>.`;
                record.appendChild(birthDescription);
            } catch(e) {
                console.log(`Error for record ${record} because ${e.message}`)
            }
            
        })
    });
});

const deathRecordsSortBy = function(list, sortingClass){
    let records = list.querySelectorAll('.death-record');
    let copies = [];
    records.forEach((record) => {
        copies.push(record.cloneNode(true));
        record.remove();
    });
    copies.sort((a,b) => {
        let aVal = a.querySelector(`.${sortingClass}`);
        let bVal = b.querySelector(`.${sortingClass}`);
        // checking if elements exist
        if(aVal == null && bVal == null){
            return 0;
        }
        if(aVal != null && bVal == null){
            return -1;
        }
        if(aVal == null && bVal != null){
            return +1;
        }
        aVal = aVal.innerText;
        bVal = bVal.innerText;
    
        //checking if it is date
        let patternDate = /\d+.\d+.\d+./;
        if(patternDate.test(aVal) && patternDate.test(bVal)){
            console.log(1)
            aVal = new Date(aVal.split('.').reverse().join('-'));
            bVal = new Date(bVal.split('.').reverse().join('-'));
            return aVal.getTime() - bVal.getTime();
        }

        //checking if it is number
        let patternNum = /\d+/;
        if(patternNum.test(aVal) && patternNum.test(bVal)){
            return parseInt(aVal) - parseInt(bVal);
        }

        //default to string comparison
        return aVal == bVal ? 0 : aVal > bVal;
    });
    copies.forEach((record) => {
        list.appendChild(record);
    })
}

document.addEventListener("DOMContentLoaded", function(){
    let lists = document.querySelectorAll('.death-records-list');
    lists.forEach((list) => {
        const div = document.createElement('div');
        const sortingClasses = ['age','name','birth-year','death-date'];
        sortingClasses.forEach(
            (sortingClass) => {
                const btn = document.createElement('button');
                btn.addEventListener("click", (event) => {
                    deathRecordsSortBy(list, sortingClass);
                });
                btn.innerText = sortingClass;
                div.appendChild(btn);
                list.parentNode.insertBefore(div, list);
            }
        )
    })
});