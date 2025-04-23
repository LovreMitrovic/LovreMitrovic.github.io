/*
	This script will populate every html table element
	which has src and id attribute with .csv file
	provided in src attribute.
	
	To use srcipt in head element include following lines
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
	<link rel="stylesheet" href="https://cdn.datatables.net/2.0.2/css/dataTables.dataTables.css" />
	<script src="https://cdn.datatables.net/2.0.2/js/dataTables.js"></script>

	For export functionality these files are needed
	<script src="https://cdn.datatables.net/buttons/3.2.2/js/dataTables.buttons.js"></script>
	<script src="https://cdn.datatables.net/buttons/3.2.2/js/buttons.dataTables.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
	<script src="https://cdn.datatables.net/buttons/3.2.2/js/buttons.html5.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/3.2.2/js/buttons.print.min.js"></script>

	
	And at the end include this script for example
	<script src="/path/to/script.js"></script>
	
	Here is example of working html table element
	<table src="/path/to/file.csv" id="mytable"></table>
	
	@author Lovre Mitrović

*/

async function loadContent(location) {
	try {
		const absoluteURL = new URL(location, window.location.href).toString();

		const response = await fetch(absoluteURL);
		const content = await response.text();
		return content;
	} catch (error) {
		throw new Error('Failed to load content from the web: ' + error.message);
	}
}

function parseLineCsv(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (const char of line) {
        if (char === '"') {
            insideQuotes = !insideQuotes; // Toggle insideQuotes state
        } else if (char === ',' && !insideQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim()); // Push the last value
    return result;
}

function parseCsv(csv) {
	const lines = csv.split('\n');
	const headers = parseLineCsv(lines[0]);

	const jsonData = [];

	for (let i = 1; i < lines.length; i++) {
		if(lines[i] == '') continue;
		const data =  parseLineCsv(lines[i]);
		const entry = {};

		for (let j = 0; j < headers.length; j++) {
			entry[headers[j]] = data[j];
		}
		jsonData.push(entry);
	}
	const columns = headers.map((name) => ({title:name, data:name}))
	return {
		data:jsonData,
		columns
	}
  
}

function populateHtml(){
	const tables = document.querySelectorAll('table');
	tables.forEach(async (table) => {
		console.log(table);
		if(table.getAttribute('src') === null){
			return;
		}
		if(table.getAttribute('id') === null){
			alert(`Couldnt load table with src ${table.getAttribute('src')} because it doesnt have id!`);
			return;
		}
		let src = table.getAttribute('src');
		let id = table.getAttribute('id');
		let content = await loadContent(src);
		content = parseCsv(content);
		let dataTable = new DataTable(`#${id}`,{
				data: content.data,
				columns: content.columns,
				layout: {
					topStart: {
						buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
					}
				}
			}
		);
	})
}

document.addEventListener("DOMContentLoaded", populateHtml)
