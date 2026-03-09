// Mengendalikan data input
document.getElementById('csvInput').addEventListener('change', function(event) {
    // Membuka data CSV
    const file = event.target.files[0];
    if (!file) return;
    // Render file menjadi data yang dapat dibaca program
    const reader = new FileReader();
    reader.onload = function(e) {
        // Mengolah data agar data dapat digunakan
        const csvContent = e.target.result;
        let data = CSVstring_to_Array(csvContent);

        // mapping branch
        const branch = filterByColumn(data, 'STO', null, 'exclude');
        data.forEach(row => {
            const workzone = (row['WORKZONE']||'').toString();
            branch.forEach(index => {
                let sto = (index['STO']||'').toString();
                if (workzone.includes(sto)){
                    row['BRANCH'] = index['BRANCH DATABASE'];
                    row['AREA'] = index['AREA DATABASE'];
                }
            })
        })

        // menghapus baris yang tidak terpakai
        rows = filterByColumn(data, 'SUMMARY', 'TSEL_METRO', 'include');
        if (!rows||rows.lenght === 0){
            console.warn("There is no data");
        }rows
        
        // menentukan "SEVERITY","TOTAL TIKET", dan "TARGET" berdasarkan isi "SUMMARY"
        rows.forEach(row => {
            const summary = (row['SUMMARY'] || '').toString();
            row['TOTAL TIKET'] = 1;
            if (summary.includes('PREMIUM')) {
                if (summary.includes('PREVENTIVE')) row['SEVERITY'] = 'PREMIUM PREVENTIVE';
                else row['SEVERITY'] = 'PREMIUM';
                row['TARGET'] = 2;
            } else if (summary.includes('CRITICAL')) {
                row['SEVERITY'] = 'CRITICAL';
                row['TARGET'] = 4;
            } else if (summary.includes('MAJOR')) {
                row['SEVERITY'] = 'MAJOR';
                row['TARGET'] = 8;
            } else if (summary.includes('MINOR')) {
                row['SEVERITY'] = 'MINOR';
                row['TARGET'] = 16;
            } else {
                row['SEVERITY'] = 'none';
                row['TARGET'] = 24;
            }
        });
        //Perhitungan untuk kolom durasi
        function timeToDecimal(timeStr){
            let hours,minutes,seconds;
            if(timeStr.includes(':')){  [hours, minutes, seconds] = timeStr.split(':').map(Number);}
            else if(timeStr.includes('.')){ [hours, minutes, seconds] = timeStr.split('.').map(Number);}
            else if(timeStr.includes('/')){ [hours, minutes, seconds] = timeStr.split('/').map(Number);}
            else if(timeStr.includes('-')){ [hours, minutes, seconds] = timeStr.split('-').map(Number);}
            else{ console.warn("WADAW Code ga jalan"); return;} 
            return hours + (minutes/60) + (seconds/3600);}
            // menentukan "DURASI" berdasarkan "TTR CUSTOMER"
            rows.forEach(row=>{
                const TTR = (row['TTR CUSTOMER']||'').toString();
                row['DURASI']= Math.round(timeToDecimal(TTR) * 100) / 100;
            });
            let table = Sort(rows, branch, 'AREA', 'STO');
            // filter untuk menampilkan defult table 
            table = SeverityFilter(table,
                ["PREMIUM PREVENTIVE","PREMIUM", "CRITICAL", "MAJOR"]
            );
            // render tabel untuk ditampilkan pada web
        renderTableFromCSV(table, 'tableData', ['SEVERITY', 'INCIDENT','AREA', 'BRANCH', 'WORKZONE','TARGET','DURASI', 'SUMMARY','TOTAL TIKET']); 
        console.log(table); // Parsed CSV as an array of objects
        
        
        //proses untuk dalam floating Box
        let preCount = 0; //Premium
        let prevCount = 0; //Premium Preventive
        let CritCount = 0; //Critical
        let MajCount = 0; //Major

        for(let index of rows){
            const severity = (index['SEVERITY'] || '').toString();
            if(severity === 'PREMIUM') preCount++; //Premium
            else if(severity === 'PREMIUM PREVENTIVE')prevCount++; //Premium Preventive
            else if(severity === 'CRITICAL')CritCount++; //Critical
            else if(severity === 'MAJOR')MajCount++; //MAJOR
            console.log(MajCount);
        }
        //menampilkan data yang sudah di olah
        document.getElementById('PremiumValue').innerText = preCount;
        document.getElementById('PremiumPrevValue').innerText = prevCount;
        document.getElementById('CriticalValue').innerText = CritCount;
        document.getElementById('MajorValue').innerText = MajCount;
        
        
        console.log("Hasil Hitung:", { preCount, CritCount, MajCount });
    };
    reader.readAsText(file);
}); 
function ClickBox(clickedBox){
    console.log("Click masuk dr ", clickedBox);
    let table = filterByColumn(rows, 'SEVERITY',clickedBox);
    if (table === null)console.warn("there is no data");
    renderTableFromCSV(table, 'tableData', ['SEVERITY', 'INCIDENT', 'BRANCH', 'WORKZONE','TARGET','DURASI','SUMMARY','TOTAL TIKET']); 
}