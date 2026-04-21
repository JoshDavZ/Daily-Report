/* MENGUBAH FORMAT TEXT CSV MENJADI ARRAY OF OBJECTS */
function CSVstring_to_Array(data) {
	// First, find the very first delimiter outside of quotes
	let inQuotes = false;
	for (let i = 0; i < 30; i++) {
		const ch = data[i];
		if (ch === '"') {
			if (inQuotes && line[i + 1] === '"') { i++; } 
			else { inQuotes = !inQuotes; }
		} else if (!inQuotes && (ch === ',' || ch === ';')) {
			var delimiter = ch;
			break;
		}
	}
	// utility that splits a single CSV line, respecting quoted fields
	function splitLine(line, delimiter) {
		const result = [];
		let current = '';
		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (ch === '"') {
				// toggle inQuotes unless it's an escaped quote
				if (inQuotes && line[i+1] === '"') {
					current += '"';
					i++; // skip the escaped quote
				} else {
					inQuotes = !inQuotes;
				}
			}else if (ch === delimiter && !inQuotes) {
				result.push(current);
				current = '';
			} else {
				current += ch;
			}
		}
		result.push(current);
		return result;
	};
	/* This variable will collect all the titles
	from the data variable 
	   ["Name", "Roll Number"] */
	const titlesLine = data.slice(0, data.indexOf('\n'));
	const titles = splitLine(titlesLine, delimiter);
	/* This variable will store the values
	   from the data
	   [ 'Rohan,01', 'Aryan,02' ] */
	const titleValues = data.slice(data.indexOf('\n') + 1).split(/\r?\n/).filter(v => v.trim());
	/* Map function will iterate over all 
	   values of title values array and 
	   append each object at the end of 
	   the array */
	const ansArray = titleValues.map(function (v) {
		/* Values variable will store individual 
		   title values         
		   [ 'Rohan', '01' ] */
		const values = splitLine(v, delimiter);
		/* storeKeyValue variable will store 
		   object containing each title
		   with their respective values i.e 
		   { Name: 'Rohan', 'Roll Number': '01' } */
		const storeKeyValue = titles.reduce(
			function (obj, title, index) {
				obj[title] = values[index];
				return obj;
			}, {});
		return storeKeyValue;
	});
	return ansArray;
};
var inputString1 = "Name,Roll Number\nRohan,01\nAryan,02";
console.log(CSVstring_to_Array(inputString1));
/*********************************************************************/
/*
* TARIK DATA DARI INPUTAN FILE
*/ 
// function loadCSVData(filePath, delimiter = ',') {
// 	// make sure parser exists before calling
// 	if (typeof CSVstring_to_Array !== 'function') {
// 		return Promise.reject(new Error('CSVstring_to_Array function not found. Ensure dataProses.js is loaded first.'));
// 	}

// 	// fetch the file and convert text to array of objects
// 	return fetch(filePath)
// 		.then(response => {
// 			//validasi respon dari fetch untuk memastikan file berhasil diambil
// 			if (!response.ok) throw new Error(`Failed to fetch ${filePath}: ${response.status}`);
// 			return response.text();
// 		})
// 		.then(text => CSVstring_to_Array(text, delimiter))
// 		.catch(error => {
// 			//menangkap error yang mungkin terjadi selama proses fetch atau parsing
// 			console.error('Error loading CSV:', error);
// 			throw error;
// 		});
// }

/********************************************************************************/
/* For JS modules, export the function
import { loadCSVData } from './dataProses.js';

async function init() {
  try {
    const rows = await loadCSVData('data/Book1.csv', ';');
    // render chart or whatever
  } catch (e) {
    console.error(e);
  }
}
init();
*/

/********************************************************************************/
/* For HTML usage
<script src="dataProses.js"></script>
<script>
  loadCSVData('data/Book1.csv', ';')
    .then(rows => {
      console.log('parsed rows:', rows);
      // …do something with the data…
    })
    .catch(err => console.error('could not load CSV', err));
</script>
*/
