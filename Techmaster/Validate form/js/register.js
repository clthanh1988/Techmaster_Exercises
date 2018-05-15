addBirthyear();
addBirthmonth();
addBirthday();

// Phải để ngoài hàm validate
var checkSex = false;

function check() {
        checkSex = true;
}


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

// validate
$('#registerForm').on('submit',function(){
    var isValid = true;
    
    
    if ($('#full-name').val().match(/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/)==null){
    	$('.full-name>div>span').text('Họ tên không hợp lệ. Không được có: dấu - số');
        $('.full-name>.err').css('display','block');
        $('#full-name').css('border-color','red');
        isValid=false;
	}
	else {
        $('.full-name>.err').css('display','none');
        $('.full-name>div>span').text('');
        $('#full-name').css('border-color','#bdc7d8');
    }
	
	if ($('#email').val().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)==null){
        $('.e-mail>div>span').text('Email không hợp lệ. Không được có số ở tên domain');
        $('.e-mail>.err').css('display','block');
        $('#email').css('border-color','red');
        isValid=false;
	}
	else {
        $('.e-mail>.err').css('display','none');
        $('.e-mail>div>span').text('');
        $('#email').css('border-color','#bdc7d8');
    }
   
    if ($('#password').val().match(/^(?=.*\d).{6,16}$/)==null){
        $('.password>div>span').text('Password phải có 6-18 ký tự và chứa ít nhất 1 số');
        $('.password>.err').css('display','block');
        $('#password').css('border-color','red');
        isValid=false;
    }
    else {
        $('.password>.err').css('display','none');
        $('.password>div>span').text('');
        $('#password').css('border-color','#bdc7d8');
    }
    if ($('#fbaddress').val().match(/^(facebook.com\/|fb.com\/)([^\/^\s])/)==null){
        $('.fb-address>div>span').text('Tên miền phải có dạng "facebook.com/abc" hoặc fb.com/abc');
        $('.fb-address>.err').css('display','block');
        $('#fbaddress').css('border-color','red');
        isValid=false;
    }
    else {
        $('.fb-address>.err').css('display','none');
        $('.fb-address>div>span').text('');
        $('#fbaddress').css('border-color','#bdc7d8');
    }
    
    if ($('#phone').val().match(/^0[0-9]\w{8,9}$/)==null){
        $('.p-hone>div>span').text('Số điện thoại di động phải chứa 10 hoặc 11 số, bắt đầu bằng 0 (eg:01234567899)');
        $('.p-hone>.err').css('display','block');
        $('#phone').css('border-color','red');
        isValid=false;
    }
    else {
        $('.p-hone>.err').css('display','none');
        $('.p-hone>div>span').text('');
        $('#phone').css('border-color','#bdc7d8');
    }

    if($('#birthday').val()==''){
        $('.birthInput>div>span').text('Phải chọn ngày tháng và năm');
        $('.birthInput>.err').css('display','block');
        $('#birthday').css('border-color','red');   
        isValid=false;
	}
	else {
        $('.birthInput>.err').css('display','none');
        $('.birthInput>div>span').text('');
        $('#birthday').css('border-color','#bdc7d8'); 
    }

    if($('#birthmonth').val()==''){
        $('.birthInput>div>span').text('Phải chọn ngày tháng và năm');
        $('.birthInput>.err').css('display','block');
        $('#birthmonth').css('border-color','red');   
        isValid=false;
	}
	else {
        $('.birthInput>.err').css('display','none');
        $('.birthInput>div>span').text('');
        $('#birthmonth').css('border-color','#bdc7d8'); 
    }

    if($('#birthyear').val()==''){
        $('.birthInput>div>span').text('Phải chọn ngày tháng và năm');
        $('.birthInput>.err').css('display','block');
        $('#birthyear').css('border-color','red');   
        isValid=false;
    }
    else {
        $('.birthInput>.err').css('display','none');
        $('.birthInput>div>span').text('');
        $('#birthyear').css('border-color','#bdc7d8'); 
    }
   
    if(!checkSex){
        $('#sex>.err').css('display','block');
        $('#sex>div.test2>span').text('Phải chọn giới tính');
        $('.sex-div').css('border-width','1px');
        isValid=false;
     }
     else {
        $('#sex>.err').css('display','none');
        $('#sex>div.test2>span').text('');
        $('.sex-div').css('border','none');
     }
    
    return isValid;


})