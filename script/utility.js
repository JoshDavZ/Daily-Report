function renderDateTime() {
    // perhitungan isi tanggal dan waktu
    const periode = document.getElementById('periode');
    const today = new Date();
    const year = today.getFullYear();
    const month = getMonthName();
    const day = String(today.getDate()).padStart(2, '0');
    const hour = today.getHours().toString().padStart(2, '0');
    const minute = today.getMinutes().toString().padStart(2, '0');
    periode.innerHTML = `Periode ${day} ${month} ${year} | Waktu Report ${hour}:${minute} WIB`;
}
// Tamplate Nama bulan
function getMonthName() {
    const date = new Date();
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'October', 'November', 'Desember'
    ];
    return months[date.getMonth()];
}