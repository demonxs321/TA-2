!! PENTING !!
Cek semua comment yang dimulai dengan "@AR" di codingan

-------------------------------------------------------

Daftar file baru

Folder: app\Http\Controllers
- AllTimeSellingReportViewController.php
- ExpenditurePerMaterialReportViewController.php
- ExpenditureReportViewController.php
- ProfitReportViewController.php
- PurchaseReportViewController.php
- SellingReportViewController.php


Folder: app\Models
- AllTimeSellingReportView.php
- ExpenditurePerMaterialReportView.php
- ExpenditureReportView.php
- ProfitReportView.php
- PurchaseReportView.php
- SellingReportView.php


Folder: database\migrations
- create_all_time_selling_report_view.php
- create_expenditure_per_material_report_view.php
- create_expenditure_report_view.php
- create_profit_report_view.php
- create_purchase_report_view.php
- create_selling_report_view.php
TO DO >>> sesuaikan nama file dengan format penamaan file migrasi
          harus dijalanin -setelah- tabel2 yang terkait di-create
		  tambah DROP VIEW di method down() (cek kalau VIEW-nya sudah ada)


Folder: public\js
- reportScript.js

-------------------------------------------------------

Page: DASHBOARD
- Tambah tabel Selling                     --> api/sellingReportView
- Tambah tabel Purchases                   --> api/purchaseReportView
- Tambah tabel Machines                    --> api/machine
- Tambah tabel Workforce                   --> api/workforce
- Tambah grafik Selling History (All-Time) --> api/allTimeSellingReportView
- Tambah grafik Profit                     --> api/profitReportView
- Tambah grafik Expenditure                --> api/expenditureReportView
- Masukin Schedule (copas dari page Schedule)

- Komenin "<script src=..." untuk jquery karena bikin error
  jquery perlu di-load sekali aja (dari main.blade.php?)

TO DO >>> Banyak data yang filternya di-hardcode. Cek View masing2 untuk detailnya
          Ganti metode ambil report ke formal Laravel kalo perlu

Page: MATERIAL
- Setelah berhasil update/create/delete, clear form
- Klik tabel = ambil ID
- Textbox Purchase Price -> ganti warna background & text ke putih dan hitam karena user harus isi
  efek samping: aria-label nya jadi ga keliatan
  TO DO >>> buat css class buat textbox ini & aria-label nya

Page: PURCHASE
- Alert "Customer name cannot be blank" --> "Supplier name cannot be blank"
- Komenin (//) coding untuk format angka karena simbolnya bikin error pas klik Purchase
  (ga bisa input lebih dari 999 karena codingnya)
  1000 otomatis jadi 1.000 --> klik Purchase --> error
- "Selling"/"Sell" -> "Purchase"
- "Products" -> "Materials"

Page: PURCHASE/TRANSACTION
- Panggil calculateTotalHTM() pas dapeting list Transaction
  (ada alasan kenapa function call-nya dikomen?)
- Komenin (//) coding untuk format angka karena simbolnya bikin error pas klik Purchase
  (ga bisa input lebih dari 999 karena codingnya)
  1000 otomatis jadi 1.000 --> klik Purchase --> error
- "Workforce" -> "Transaction"
- "Detail Product" -> "Detail Transaction"
- "Choose Product" -> "Choose Material"

Page: REPORT
- Tambah tabel Profit (All-Time)      --> api/profitReportView
- Tambah tabel Expenditure (All-Time) --> api/expenditurePerMaterialReportView

Page: SELLING
- Tambah kondisi untuk pengecekan Paid yang ga diinput (kosong)
- Ganti kolom untuk harge (jual) Produk dari "purchase_price" ke "selling_price" 
- Komenin (//) coding untuk format angka karena simbolnya bikin error pas klik Purchase
  (ga bisa input lebih dari 999 karena codingnya)
  1000 otomatis jadi 1.000 --> klik Purchase --> error

Page: SELLING/TRANSACTION
- Ganti kolom untuk harge (jual) Produk dari "purchase_price" ke "selling_price" 
- Panggil calculateTotalHTM() pas dapeting list Transaction
  (ada alasan kenapa function call-nya dikomen?)
- Komenin (//) coding untuk format angka karena simbolnya bikin error pas klik Purchase
  (ga bisa input lebih dari 999 karena codingnya)
  1000 otomatis jadi 1.000 --> klik Purchase --> error
- "Detail Product" -> "Detail Transaction"

Page: WORKFORCE
- Setelah berhasil update/create/delete, clear form
- Assign WorkforceId ke variabel global selectedWorkforceId untuk update/delete data
- Tambah kondisi untuk pengecekan Name yang ga diinput (kosong)
- "Workforce use" -> "Workforce position"
- Benerin update Workforce
- placeholder Workforce -> New Workforce
- placeholder Name -> Workforce Name

File: routes\api.php
- Nambah 6 rute buat 6 VIEW baru

-------------------------------------------------------

TO DO

Cara hitung profit per periode (sementara)
- (harga jual produk - harga beli produk) <per produk> * kuantitas <per transaksi penjualan
  dikurangin
  harga beli material <per material> * kuantitas <per transaksi pembelian>

Diskusikan cara hitung Profit
- gimana kalau harga beli/jual material/produk diupdate
- gimana kalau kuantitas material/produk di transaksi diupdate
  (pake harga material/produk terbaru, atau harga pas transaksi awal?)
- gimana kalau ada material/produk yang dihapus (!)
- belom termasuk hutang
- belom pake kolom Paid
- belom pake kolom Total
? tambahkan kolom di tabel2 kalo perlu

UI
- tambah konfirmasi untuk update data
- tambah konfirmasi untuk delete data (!)
- tambah logic di proses update/delete data kalo perlu
- tambah file "favicon.ico" di folder "public" buat icon website di tab browser
- bikin Dark Mode-nya ga ke-reset tiap ganti/refresh page
