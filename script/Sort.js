// 1. Pre-calculate indices in a Map for O(1) lookup
function Sort(sorting, reference, sortBy, sortReference = null){
    let lookup;
    if (sortReference === null) {
        lookup = new Map(reference.map((row,i) => [row, i]));
        console.log('lookup', lookup);
    }else{
        lookup = new Map(reference.map((row,i) => [row[sortReference], i]));
        console.log('lookup', lookup);
    }
    // 2. Sort using the Map
    // Elements not in the reference array are moved to the end (Infinity)
    sorting.sort((a, b) => {
        const indexA = lookup.has(a[sortBy]) ? lookup.get(a[sortBy]) : Infinity;
        const indexB = lookup.has(b[sortBy]) ? lookup.get(b[sortBy]) : Infinity;
        return indexA - indexB;
    });
    console.log(sorting);
    return sorting;
}
