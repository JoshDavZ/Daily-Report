# Sript explain

## dataProses.js
data proses ini memproses data csv menjadi 2d array sehingga dapat lebih mudah digunakan proses data ini langung berjalan ketika file laporan diupload dan memproses data menjadi array.

### define delimeter
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataProses.js#L4-L14
code ini melihat file csv untuk menentukan delimeter yang dipakai dalam file. code ini akan memastikan delimeter yang dipakai berdasarkan delimeter pertama yang ditemukan sehingga data pertama tidak boleh memiliki titik(.), koma(,), dan titik-koma(;).

### split line
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataProses.js#L16-L38
code ini akan memotong data berdasarkan kolom yang ditandai oleh delimeter

### mengambil baris pertama dan membagi data perkolom
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataProses.js#L42-L43

### split data perbaris dan menjadi array
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataProses.js#L47

### map data value
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataProses.js#L48-L67

## dataFilter.js
### filterByColumn(csvData, columnTitle, searchChar, mode = 'include')
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataFilters.js#L9-L23

### filterByMultipleColumns(csvData, conditions)
conditions(array): Array of {column, char, mode} 
* column = kolom yang ingin di filter
* char = kata yang ingin di filter
* mode = ('exact', 'include', 'exclude')
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataFilters.js#L30-L46

### function SeverityFilter(csvData, SeverityType = [])
filter khusus severity digunakan untuk menunjukkan sesuai dengan severity yang dibutuhkan
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataFilters.js#L56-L71

### Sort(sorting, reference, sortBy, sortReference = null)
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/dataFilters.js#L81-L100

## RenderTable.js
file ini membangun tabel dari awal mulai dari tabel warraper, row table, dan table cell. masing-masing row dan cell dapat diubah sesuai keinginan. file dimulai dengan
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/RenderTable.js#L5-L11
code ini memastikan container untuk tabel sudah ada pada file index.html

https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/RenderTable.js#L12-L23
code ini memastikan tabel bersih dan tidak ada tabel sebelumnya yang masuk

### bars(val, target, destinatio) 
fungsi ini dipakai pada rendering bar dalam cell durasi. fungsi ini menampilkan jika durasi semakin mendekati target maka bar merah akan semakin panjang. Jika durasi melebihi target bar akan sepenuhnya merah.
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/RenderTable.js#L170-L208

## utility.js
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/utility.js#L1-L11
code ini menampilkan waktu saat ini


## main.js
menggunakan semua fungsi untuk menampilkan/menjalankan seluruh logika

### membuat global variable supaya variabel tabel dapat digunakan diluar fungsi
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L1

### begitu file csv dimasukkan logika akan berjalan
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L2-L9

### file yang diload akan diproses menjadi data yang dapat dipakai
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L10-L12

### menentukan brach dan area berdasarkan workzone
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L16-L27

### menentukan severity dan target dari setiap tiket
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L28-L52

### Merapihkan data dengan sorting dan filter data dan hanya data yang diperlukan saja yang tampil
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L70-L76

### menghitung jumlah tiket setiap severity yang ditampilkan dalam floating box
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L77-L103

### fungsi yang dijalankan saat click pada floating box, untuk filter hanya severity yang dipencet yang muncul
https://github.com/JDZprojects/Daily-Report/blob/d1aef97a6afe2c0ba9da3e0416fad5107ade320e/script/main.js#L107-L113