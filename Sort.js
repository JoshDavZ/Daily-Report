function Sort(reference, sort, sortBy, sortReference){
    // 1. Pre-calculate indices in a Map for O(1) lookup
    const lookup = new Map(reference.map((row,i) => [row[sortReference], i]));
    
    // 2. Sort using the Map
    // Elements not in the reference array are moved to the end (Infinity)
    sort.sort((a, b) => {
        const indexA = lookup.has(a[sortBy]) ? lookup.get(a[sortBy]) : Infinity;
        const indexB = lookup.has(b[sortBy]) ? lookup.get(b[sortBy]) : Infinity;
        return indexA - indexB;
    });
    console.log(sort);
    return sort;
}