/**
 * Filter CSV data by column and character/value
 * csvData(array): Array of row objects
 * columnTitle(string): The column/field name to filter by
 * searchChar(string): The character or string to search for
 * mode(string): Filter mode: 'exact' (exact match), 'include' (contains), 'exclude' (does not contain)
 * =>returns(array): Filtered data
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
 * csvData(array): Array of row objects
 * conditions(array): Array of {column, char, mode} objects ('exact', 'include', 'exclude')
 * =>returns(array): Filtered data
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
/*
 * Filter by severity and duration
 * - For LOW severity, duration must be > 20
 * - For MINOR severity, duration must be > 12
 * - For other severities, duration must be > 0
 * csvData(array): Array of row objects
 * SeverityType(array): Array of severity levels to include (e.g., ['LOW', 'MINOR'])
 * =>returns(array): Filtered data
*/
function SeverityFilter(csvData, SeverityType = []) {
	// If no filters are provided, return the full dataset
	if (SeverityType.length === 0) return csvData;
	console.log('filtering severity', SeverityType);
	return csvData.filter(row => {
		// Condition 1: Is the severity in our selected list?
		const isMatchingSeverity = SeverityType.includes(row.SEVERITY);
		// Condition 2: Is the duration more than 5?
		let isLongDuration;
		if (row.SEVERITY === 'LOW') { isLongDuration = Number(row.DURASI) > 20; }
		else if (row.SEVERITY === 'MINOR') { isLongDuration = Number(row.DURASI) > 12; }
		else { isLongDuration = Number(row.DURASI) > 0; }
		// Only return true if BOTH conditions are met
		return isMatchingSeverity && isLongDuration;
	});
}
/*
 * Sort data based on a reference array
 * - sorting(array): the array to be sorted
 * - reference(array): the array that defines the desired order
 * - sortBy(string): the field in the sorting array to compare against the reference
 * - sortReference(string): (optional) if provided, use this field from the reference for comparison instead of the whole row
 * =>returns(array): Sorted array
*/
// 1. Pre-calculate indices in a Map for O(1) lookup
function Sort(sorting, reference, sortBy, sortReference = null) {
	let lookup; // array yang akan menyimpan data jadi
	if (sortReference === null) {
		// menentukan urutan berdasarkan alfabet
		lookup = new Map(reference.map((row, i) => [row, i]));
		console.log('lookup', lookup);
	} else {
		// menentukan ututan berdasarkan list referensi
		lookup = new Map(reference.map((row, i) => [row[sortReference], i]));
		console.log('lookup', lookup);
	}
	// 2. Sort using the Map
	// Elements not in the reference array are moved to the end (Infinity)
	sorting.sort((a, b) => {
		const indexA = lookup.has(a[sortBy]) ? lookup.get(a[sortBy]) : Infinity;
		const indexB = lookup.has(b[sortBy]) ? lookup.get(b[sortBy]) : Infinity;
		return indexA - indexB;
	});
	return sorting;
}
