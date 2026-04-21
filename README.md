# Daily-Report
Data yang perlu ditambahkan dalam report => STO DATABASE,BRANCH DATABASE,AREA DATABASE

## Index.html
### Link Requiered file
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L9-L13
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L89-L92

### Menampilkan Logo
Bagian ini dapat di edit sesuai kebutuhan tampilan logo

* src="[menunjuk lokasi gambar]"
* style="[mengedit ukuran dan penempatan logo]"
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L18-L22

### Title Report
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L24-L33
renderDateTime();
memanggil fungsi dari script/utility.js
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/utility.js#L1-L20
yang secara otomatis menampilkan tanggal dan jam saat membuka dashboard

### Severity Counter / Floating Box
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L35-L50
Bagian ini akan menunjukkan jumlah tiket dengan severity tertentu dan jika di click akan filter data berdasarkan severity yang dipilih

box harus berada didalam wrapperBox karena ada logika css yang membuat floatingBox flex ke samping

### Tabel
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/index.html#L81-L86

Bagian ini menampilkan tombol yang akan digunakan untuk memasukkan file csv untuk menjadi laporan harian dan setelah dimasukkan web akan membuat tabel menampilkan semua tiket dengan severity
* Premium Preventive 
* Premium
* Critical
* Major
* Minor (durasinya diatas 12 jam) 
* Low (durasinya diatas 20 jam)