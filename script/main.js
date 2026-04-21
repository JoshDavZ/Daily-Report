let rowss = [];
// Mengendalikan data input
document.getElementById('csvInput').addEventListener('change', function (event) {
  // Membuka data CSV
  const file = event.target.files[0];
  if (!file) return;
  // Render file menjadi data yang dapat dibaca program
  const reader = new FileReader();
  reader.onload = function (e) {
    // Mengolah data agar data dapat digunakan
    const csvContent = e.target.result;
    let data = CSVstring_to_Array(csvContent);
    // data = filterByColumnByColumn(data, 'STO DATABASE', null, 'exclude');
    // perhitungan isi tanggal dan waktu
    renderDateTime();
    // mapping branch
    let branch = filterByColumn(data, 'STO DATABASE', null, 'exclude');
    data.forEach(row => {
      const workzone = (row['WORKZONE'] || '').toString();
      // sto adalah string yang berisi data workzone pada index saat dijalankan
      branch.forEach(index => {
        let sto = (index['STO DATABASE'] || '').toString();
        // sto adalah string yang berisi data sto database pada index saat dijalankan
        if (workzone.includes(sto)) {
          // melihat apakah 
          row['BRANCH'] = index['BRANCH DATABASE'];
          row['AREA'] = index['AREA DATABASE'];
          return; // stop foreach ketika sudah menemukan data yang sama
        }
      })
    })
    // menghapus baris yang tidak terpakai
    rowss = filterByColumn(data, 'SUMMARY', 'TSEL_METRO', 'include');
    if (!rowss || rowss.lenght === 0) {
      console.warn("There is no data");
    }
    // menentukan "SEVERITY","TOTAL TIKET", dan "TARGET" berdasarkan isi "SUMMARY"
    rowss.forEach(row => {
      const summary = (row['SUMMARY'] || '').toString();
      row['TOTAL TIKET'] = 1;

      let SEVERITY, TARGET
      [SEVERITY, TARGET] =
      // menentukan severity 
        summary.includes('PREMIUM') ? summary.includes('PREVENTIVE') ?
        ['PREMIUM PREVENTIVE',24] : ['PREMIUM',2] :
        //jika premium preventive maka targetnya 24, jika hanya premium maka targetnya 2
          summary.includes('CRITICAL') ? ['CRITICAL',4] : //jika critical maka targetnya 4
            summary.includes('MAJOR') ? ['MAJOR',8] : //jika major maka targetnya 8
              summary.includes('MINOR') ? ['MINOR',16] : //jika minor maka targetnya 16
                summary.includes('LOW') ? ['LOW',24] : ['none',24]; //jika low/default maka targetnya 24
      row['SEVERITY'] = SEVERITY;
      row['TARGET'] = TARGET;
      // https://medium.com/@hxu0407/9-smart-ways-to-replace-if-else-in-javascript-28f82ad6dcb9
    });
    //Perhitungan untuk kolom durasi
    //fungsi untuk mengubah format waktu menjadi desimal
    function timeToDecimal(timeStr) {
      let hours, minutes, seconds;
      [hours, minutes, seconds] =
        timeStr.includes(':') ? timeStr.split(':').map(Number) :
          timeStr.includes('.') ? timeStr.split('.').map(Number) :
            timeStr.includes('/') ? timeStr.split('/').map(Number) :
              timeStr.includes('-') ? timeStr.split('-').map(Number) :
                (console.warn("WADAW, pemisah waktunya harus antara :|.|/|- "), [0, 0, 0]);
      return hours + (minutes / 60) + (seconds / 3600);
    }
    // menentukan "DURASI" berdasarkan "TTR CUSTOMER"
    rowss.forEach(row => {
      const TTR = (row['TTR CUSTOMER'] || '').toString();
      row['DURASI'] = Math.round(timeToDecimal(TTR) * 100) / 100;
    });
    // data, reference, sortby, referenceby
    let table = Sort(rowss, branch, 'WORKZONE', 'STO');
    // filter untuk menampilkan defult table 
    table = SeverityFilter(table, ["PREMIUM PREVENTIVE", "PREMIUM", "CRITICAL", "MAJOR", "MINOR", "LOW"]);
    table = Sort(csvData = table, reference = ["PREMIUM PREVENTIVE", "PREMIUM", "CRITICAL", "MAJOR", "MINOR", "LOW"], sortBy = 'SEVERITY');
    // render tabel untuk ditampilkan pada web
    renderTableFromCSV(csvData = table, tableContainerId = 'tableData', columns = ['SEVERITY', 'INCIDENT', 'AREA', 'BRANCH', 'WORKZONE', 'TARGET', 'DURASI', 'SUMMARY', 'TOTAL TIKET']);
    // proses untuk dalam floating Box
    let premiumCount = 0; //Premium
    let preventiveCount = 0; //Premium Preventive
    let CriticalCount = 0; //Critical
    let MajorCount = 0; //Major
    let MinorCount = 0; //Minor
    let LowCount = 0; //Low
    for (let index of rowss) {
      const severity = (index['SEVERITY'] || '').toString();
      switch (severity) {
        case 'PREMIUM': premiumCount++; break;//PREMIUM
        case 'PREMIUM PREVENTIVE': preventiveCount++; break;//PREMIUM PREVENTIVE
        case 'CRITICAL': CriticalCount++; break;//CRITICAL
        case 'MAJOR': MajorCount++; break;//MAJOR
        default: 
          if (severity === 'MINOR' && Number(index['DURASI']) > 12) MinorCount++; //MINOR
          // jika severity adalah MINOR maka durasi harus lebih dari 12 untuk dihitung
          else if (severity === 'LOW' && Number(index['DURASI']) > 20) LowCount++; //LOW
          // jika severity adalah LOW maka durasi harus lebih dari 20 untuk dihitung
          break;
      }
    }
    //menampilkan data yang sudah di olah
    document.getElementById('PremiumValue').innerText = premiumCount;
    document.getElementById('PremiumPrevValue').innerText = preventiveCount;
    document.getElementById('CriticalValue').innerText = CriticalCount;
    document.getElementById('MajorValue').innerText = MajorCount;
    document.getElementById('MinorValue').innerText = MinorCount;
    document.getElementById('LowValue').innerText = LowCount;
  };
  reader.readAsText(file);
});
//Fungsi klik pada floating box yang berfungsi untuk filter berdasarkan SEVERITY yang dipilih
function ClickBox(clickedBox) {
  console.log("Click masuk dr ", clickedBox);
  let table = SeverityFilter(rowss, clickedBox);
  //filter data berdasarkan severity yang dipilih
  if (table === null) console.warn("there is no data"); // jika data yang di filter tidak/kosong
  renderTableFromCSV(table, 'tableData', ['SEVERITY', 'INCIDENT', 'BRANCH', 'WORKZONE', 'TARGET', 'DURASI', 'SUMMARY', 'TOTAL TIKET']);
}