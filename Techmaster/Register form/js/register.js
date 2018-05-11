addBirthyear();
addBirthmonth();
addBirthday();




function addBirthyear() {
	var html= '<option>Chọn năm sinh ...</option>';
	for (var i = 1900; i <= 2002; i++) {
		
		html+= '<option value="'+ i + '">' + i + '</option>';

	};

	$('.birthyear').html(html);

}

function addBirthmonth() {
	var html= '<option>Chọn tháng sinh ...</option>';
	for (var i = 1; i <= 12; i++) {
		
		html+= '<option value="'+ i + '">' + i + '</option>';

	};

	$('.birthmonth').html(html);

}

function addBirthday() {
	var html= '<option>Chọn ngày sinh ...</option>';
	for (var i = 1; i <= 31; i++) {
		
		html+= '<option value="'+ i + '">' + i + '</option>';

	};

	$('.birthday').html(html);

}