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

	var total_harga = 0;
	for (var i = 0; i <arr.length; i++) {
		total_harga = total_harga + arr[i].total;
	}

	document.form1.total_harga.value = total_harga;	
	document.form1.kembali.value = document.form1.bayar.value - document.form1.total_harga.value ;

}

var click = 0;

function init_input() {
	var html = '';
	html += '<td><div class="daftar_barang"><select class="input-control" name="daftar_barang[]" onchange="update_barang()">';
	for (var i = 0; i < daftar_barang.length; i++) {
		html += '<option value=\''+daftar_barang[i].code+'\'>'+daftar_barang[i].name+'</option>';
	}
	html += '</select></div></td>';
	html += '<td><input class="input-control angka" type="text" disabled name="harga[]"></td>';
	html += '<td><input class="input-control angka" type="text" name="jumlah[]" value="1" onkeyup="update_barang();"></td>';
	html += '<td><input class="input-control angka" type="text" disabled name="total[]" value="0"></td>';

	var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
	var newRow   = tableRef.insertRow(1 + click);

	click++;
	// document.getElementById('expand').innerHTML += html;
	newRow.innerHTML = html;
}