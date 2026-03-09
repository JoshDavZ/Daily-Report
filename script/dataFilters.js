/**
 * Filter CSV data by column and character/value
 * @param {Array} csvData - Array of row objects
 * @param {String} columnTitle - The column/field name to filter by
 * @param {String} searchChar - The character or string to search for
 * @param {String} mode - Filter mode: 'exact' (exact match), 'include' (contains), 'exclude' (does not contain)
 * @returns {Array} Filtered data
 */
function filterByColumn(csvData, columnTitle, searchChar, mode = 'include') {
	return csvData.filter(row => {
		const value = row[columnTitle];
		if (!value) return false;
		
		if (mode === 'exact') {
			return value === searchChar;
		} else if (mode === 'include') {
			return value.includes(searchChar);
		} else if (mode === 'exclude') {
			return !value.includes(searchChar);
		}
		return false;
	});
}

/**
 * Filter multiple conditions (AND logic)
 * @param {Array} csvData - Array of row objects
 * @param {Array} conditions - Array of {column, char, mode} objects ('exact', 'include', 'exclude')
 * @returns {Array} Filtered data
 */
function filterByMultipleColumns(csvData, conditions) {
	return csvData.filter(row => {
		return conditions.every(condition => {
			const value = row[condition.column];
			if (!value) return false;
			
			const mode = condition.mode || 'include';
			
			if (mode === 'exact') {
				return value === condition.char;
			} else if (mode === 'include') {
				return value.includes(condition.char);
			} else if (mode === 'exclude') {
				return !value.includes(condition.char);
			}
			return false;
		});
	});
}


// now filter by severity if needed
function SeverityFilter(csvData, SeverityType = []){
	let table = [];
	console.log(SeverityType);// memastikan severity type yang dimasukkan
	if (SeverityType.length===0) return csvData;
	for (let index of SeverityType){
		table = table.concat(filterByColumn(csvData, 'SEVERITY', index));
	}
	return table;

	
}
