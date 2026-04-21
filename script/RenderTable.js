/*
 * render.js - Renders CSV data from data.js into HTML
 */
function renderTableFromCSV(csvData, tableContainerId, columns = null) {
	const container = document.getElementById(tableContainerId);
	console.log(csvData); // memastikan data yang akan di render benar
	// Memastikan container benar ada
	if (!container) {
		console.error(`Container with id "${tableContainerId}" not found`);
		return;
	}
	// Menghapus konten yang sebelumnya
	container.innerHTML = '';
	// Memastikan data benar ada
	if (!csvData || csvData.length === 0) {
		console.error('No data to render');
		const warpper = document.createElement('warpper');
		const text = document.createElement('h1');
		text.textContent = 'There are no data to render';
		warpper.appendChild(text);
		container.appendChild(warpper);
		return;
	}
	// Menentikan Header yang akamn ditampilkan
	// If columns is null/undefined or empty array, show all columns; otherwise show only selected columns
	let headers = (columns && Array.isArray(columns) && columns.length > 0) ? columns : Object.keys(csvData[0]);
	// Menghapus penomoran yang ada pada tabel
	headers = headers.filter(h => h !== 'No.' && h.trim() !== '');
	// Buatabel berdasarkan CSS yang ada (div.table / div.row / div.cell)
	const table = document.createElement('div');
	table.className = 'table';
	// Membuat kolom nomor baru
	const headerRow = document.createElement('div');
	headerRow.className = 'row header';
	// Menambahkan cell untuk nomor
	const numHeader = document.createElement('div');
	numHeader.className = 'cell';
	numHeader.textContent = 'No.';
	// numHeader.style.borderRight = '1px solid #9a9a9a';
	numHeader.style.borderLeft = '1px solid #9a9a9a';
	headerRow.appendChild(numHeader);
	// Menambahkan cell untuk header
	headers.forEach(header => {
		const th = document.createElement('div');
		th.className = 'cell';
		th.textContent = header;
		th.style.textAlign = 'center';
		th.style.borderLeft = '1px solid #9a9a9a';
		headerRow.appendChild(th);
	});
	// Memasukkan semua data pada baris pertama
	table.appendChild(headerRow);
	// Membuat cell data
	csvData.forEach((rowData, index) => {
		const row = document.createElement('div');
		row.className = 'row';
		// otomatis membuat cell penomoran
		const numCell = document.createElement('div');
		numCell.className = 'cell';
		numCell.setAttribute('data-title', 'No.');
		numCell.style.textAlign = "center";
		numCell.style.borderLeft = '1px solid #9a9a9a';
		numCell.textContent = (index + 1).toString();
		row.appendChild(numCell);
		// otomatis membuat cell untuk data
		headers.forEach(header => {
			const td = document.createElement('div');
			td.className = 'cell';
			td.setAttribute('data-title', header);
			const text = rowData[header] !== undefined && rowData[header] !== null ? rowData[header] : '';
			td.textContent = text;
			td.style.alignItems = 'center';
			td.style.borderLeft = '1px solid #9a9a9a';
			// jika data berisi angka maka masuk ke dalam if
			if (header !== 'SUMMARY') {
				td.style.textAlign = 'center';
				td.style.padding = '0px 0px';
				// jika data durasi masuk ke dalam if untuk
				// menentukan warna pada data cell
				if (header === 'DURASI') {
					setTimeout(() => {
						td.textContext = '';
						td.className = 'progress-section cell';
						td.id = 'Bar' + rowData['INCIDENT'];
						bars(rowData[header], rowData['TARGET'], 'Bar' + rowData['INCIDENT']);
					}, 100);
				}
			}
			else if (header === 'SUMMARY') {
				// value summary akan diprint semua mengikuti lebar maksimal cell begitu text melewati lebar maksimal text akan langsung break line meskipun ditengah kata
				td.style.wordBreak = 'break-all';
				td.style.maxWidth = '380px';
				td.style.minWidth = '350px';
			}
			row.appendChild(td);
		});
		table.appendChild(row);
	});
	// Menambahkan baris terakhir untuk grand total
	const totalRow = document.createElement('div');
	totalRow.className = 'row header';
	const numCell1 = document.createElement('div');
	const numCell = document.createElement('div');
	numCell.className = 'cell';
	numCell.setAttribute('data-title', 'No.');
	numCell.textContent = 'GrandTotal';
	numCell.fontWeight = '24px';
	numCell1.style.borderLeft = '1px solid #9a9a9a';
	totalRow.appendChild(numCell1);
	totalRow.appendChild(numCell);
	// Perhitungan total tiket
	let skipcount = true
	headers.forEach(header => {
		if (skipcount){
			skipcount = false;
			return;
		}
		const td = document.createElement('div');
		td.className = 'cell';
		td.setAttribute('data-title', header);
		if (header === 'TOTAL TIKET') {
			// Try to sum numeric values
			let total = 0;
			let isNumeric = true;
			for (let row of csvData) {
				const value = row[header];
				if (!isNaN(value)) {
					total += value;
				} else {
					isNumeric = false;
					break;
				}
			}
			td.textContent = isNumeric ? total : '';
			td.style.fontWeight = 'bold';
			td.style.textAlign = 'center';
			td.style.width = '10px';
			td.fontWeight = '24px';
			td.style.borderLeft = '1px solid #9a9a9a';
			// td.style.borderRight = '1px solid #9a9a9a';
			totalRow.appendChild(td);
		}
		else totalRow.appendChild(td);
	});
	table.appendChild(totalRow);
	// Append table to container
	container.appendChild(table);
	console.log(`Rendered ${csvData.length} rows into ${tableContainerId}`);
}
// Auto-render when page loads
// Note: Copy this block into your HTML file or ensure it's executed after the DOM is ready and dataProses.js is loaded, since it relies on the CSVstring_to_Array function defined there.
/* For HTML usage
<script>
	const csvText = loadCSVData('Rearrange W2 Feb 2026 - Data Upload.csv', ',')
		.then(rows => {
			console.log('parsed rows:', rows);
		let parsedData = filterByColumn(rows, 'Branch', 'TARGET', 'exclude');
		parsedData = filterByColumn(parsedData, 'Area', 'JAWA', 'include');
		console.log('Filtered rows:', parsedData);
		// Choose columns to show (set to null or empty [] to show all columns)
		const columnsToShow = ['PERIODE', 'Area', 'Regional', 'Branch']; 
		// Render into the table container
		renderTableFromCSV(parsedData, 'output2', columnsToShow);
		console.log('Rendered rows count:', parsedData.length);
		})
		.catch(err => console.error('could not load CSV', err));
</script>
*/
// fungsi untuk membuat bar dalam durasi
function bars(val, target, destinatio) {
	const form = document.getElementById(destinatio);
	if (!form) {
		console.error(`Container with id ${destinatio} not found`);
		return;
	}
	form.innerHTML = '';
	// perhitungan berapa persen durasi telah berjalan
	var percent = (val / target) * 100;
	// membuat kapsul didalam sell
	const bar = document.createElement('div');
	bar.className = 'progressBar';
	// mengisi kapsul dengan text durasi
	const value = document.createElement('span');
	value.className = 'progressValue';
	let jam = Math.floor(val);
	// val=data durasi dalam desimal sehingga perlu diubah menjadi 
	// jam dan menit untuk ditampilkan pada kapsul
	let menit = Math.floor((((val * 100) % 100) * 60) / 100);
	console.log('data:' + val);
	console.log('hitung:' + jam + '.' + menit);
	jam = jam.toString().padStart(2, '0'); //menambah nol di depan jika jam kurang dari 10
	menit = menit.toString().padStart(2, '0'); //menambah nol di depan jika menit kurang dari 10
	value.textContent = jam + ':' + menit;
	if (val < target) {
		// kapsul jika durasi didalam target
		const fillBar = document.createElement('div');
		fillBar.className = 'fill';
		fillBar.style.width = percent + '%';
		bar.appendChild(fillBar);
	} else {
		// kapsul jika durasi melewati target
		bar.style.background = '#f51212';
		value.style.color = 'white';
	};
	// Put the value inside the fill bar
	bar.appendChild(value);
	form.appendChild(bar);
}