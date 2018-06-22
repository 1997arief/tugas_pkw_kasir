var daftar_barang = [
{
	'code'	: 'telur',
	'name'	: 'Telur',
	'harga'	: 20000
},
{
	'code'	: 'beras',
	'name'	: 'Beras',
	'harga'	: 12000
},
{
	'code'	: 'gula_pasir',
	'name'	: 'Gula Pasir',
	'harga'	: 12500
},
{
	'code'	: 'minyak_goreng',
	'name'	: 'Minyak Goreng',
	'harga'	: 15000
},
{
	'code'	: 'teh',
	'name'	: 'Teh',
	'harga'	: 5000
},
{
	'code'	: 'kopi',
	'name'	: 'Kopi',
	'harga'	: 5000
},
{
	'code'	: 'rokok',
	'name'	: 'Rokok',
	'harga'	: 12000
}
];
var arr_barang = [];
var arr_disable = [];

var id_barang = document.getElementById('daftar_barang');
for (var i = 0; i < daftar_barang.length; i++) {
	id_barang.innerHTML += '<option value=\''+daftar_barang[i].code+'\'>'+daftar_barang[i].name+'</option>';
}

update_barang();

function update_barang() {
	var input_barang = document.getElementsByName('daftar_barang[]');
	var input_harga = document.getElementsByName('harga[]');
	var input_jumlah = document.getElementsByName('jumlah[]');
	var input_total = document.getElementsByName('total[]');

	var arr = [];
	for (var i = 0; i <input_barang.length; i++) {

		var harga = 0, total = 0;

		for (var j = 0; j < daftar_barang.length; j++) {
			if (input_barang[i].value == daftar_barang[j].code) {
				harga = daftar_barang[j].harga;
				input_harga[i].value = harga;

				total = harga*input_jumlah[i].value;
				input_total[i].value = total;
			}
		}

		var inputan = {
			'barang' : input_barang[i].value,
			'harga'	: harga,
			'jumlah' : input_jumlah[i].value,
			'total' : total
		};
		arr.push(inputan);
	}

	arr_barang = arr;

	var total_harga = 0;
	for (var i = 0; i <arr.length; i++) {
		total_harga = total_harga + arr[i].total;
	}

	document.form1.total_harga.value = total_harga;	
	document.form1.kembali.value = document.form1.bayar.value - document.form1.total_harga.value ;
	select_barang();
}

var click = 0;

function init_input() {
	var html = '';
	var input_barang = document.getElementsByName('daftar_barang[]');
	html += '<td><div class="daftar_barang"><select class="input-control" name="daftar_barang[]" onchange="update_barang()">';

	var new_arr = [];
	for (var j = 0; j < arr_barang.length; j++) {
		new_arr.push(arr_barang[j].barang)
	}
	for (var i = 0; i < daftar_barang.length; i++) {
		html += '<option value=\''+daftar_barang[i].code+'\'>'+daftar_barang[i].name+'</option>';
	}
	html += '</select></div></td>';
	html += '<td><input class="input-control angka" type="text" disabled name="harga[]"></td>';
	html += '<td><input class="input-control angka" type="text" name="jumlah[]" value="1" onkeyup="update_barang();"></td>';
	html += '<td><input class="input-control angka input-with-hapus" type="text" disabled name="total[]" value="0"><input type="button" onclick="hapus_barang('+click+');" name="hapus_barang[]" value="-" class="tombol_hapus"></td>';

	var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
	var newRow   = tableRef.insertRow(1 + click);
		newRow.innerHTML = html;
	input_barang[1+click].options[selected_option()].selected = true;

	click++;
	update_barang();
	if ( click+1 === daftar_barang.length) {
		tableRef.deleteRow(click+1);
	}
}
function hapus_barang(row) {
	var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
	var newRow   = tableRef.deleteRow(1 + row);

	var input_hapus = document.getElementsByName('hapus_barang[]');
	for (var i = 0; i <input_hapus.length; i++) {
		input_hapus[i].setAttribute("onclick","hapus_barang("+i+");");
	}
	if (click+1 == daftar_barang.length) {
		var html = '';
		html += '<td colspan="4"><center><input type="button" value="+ Tambah barang" onclick="init_input();"></center></td>';
		newRow = tableRef.insertRow(click);
		newRow.innerHTML = html;
	}
	console.log(click);
	click--;
	update_barang();
}
function select_barang() {
	var input_barang = document.getElementsByName('daftar_barang[]');

	var new_arr = [];
	for (var j = 0; j < arr_barang.length; j++) {
		new_arr.push(arr_barang[j].barang)
	}

	var disable = [];

	for (var i = 0; i <input_barang.length; i++) {
		for (var j = 0; j <daftar_barang.length; j++) {
			if ( new_arr.includes(daftar_barang[j].code) && input_barang[i].value!==daftar_barang[j].code ) {
				// console.log("select ke-"+i+" tidak ada "+daftar_barang[j].code+"("+j+")");
				input_barang[i].options[j].disabled = true;
				disable.push(j);
			} else {
				input_barang[i].options[j].disabled = false;
			}
		}
		arr_disable = disable;
	}
}
function selected_option() {
	selected=0;
	if (arr_disable.length > 0) {
		for (var i = daftar_barang.length - 1; i >= 0; i--) {
			if ( !arr_disable.includes(i) ) {
				selected = i;
			}
		}
	} else {
		var input_barang = document.getElementsByName('daftar_barang[]');
		for (var i = 0; i <daftar_barang.length; i++) {
			if ( input_barang[0].value==daftar_barang[i].code ) {
				arr_disable.push(i);
				selected = selected_option();
			}
		}
	}
	return selected;
}