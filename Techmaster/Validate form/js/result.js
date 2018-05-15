var parameters;
var dataForm = [];

// location.search để lấy chuỗi URL bắt đầu từ ? , substring(1) để bỏ ? , split để bỏ hết các dấu & và trả về 1 mảng mới ( biến chuỗi URL thành 1 mảng gồm nhiều phần tử)
parameters = location.search.substring(1).split("&");

for (var i = 0; i<parameters.length; i++){
        var index = parameters[i].indexOf('='); // para[0] = 'fullname=dsddsadsd' => index = 8 ( vị trí của dấu '=')    
        var temp;
        temp = parameters[i].slice(index+1);    // temp = 'fullname=dsddsadsd'.slice(8+1=9) => temp = dsddsadsd ( Lấy được giá trị của fullname)
       	dataForm[i] = decodeURIComponent(temp.split('+').join(' ')); // bỏ hết dấu + , trả về chuỗi mới 
        
        
}

var registerInfo = {
        userName: dataForm[0],        
        email: dataForm[1],
        address: dataForm[2],        
        phoneNumber: dataForm[3],
        fbAddress: dataForm[4],
        birthDate: dataForm[7] + '/ ' + dataForm[6] + '/ ' + dataForm[5],
        sex: dataForm[8],
        passWord: dataForm[9],
}


$('.info').append('<h3>Họ tên: <span>' + registerInfo['userName'] + '</span></h3>')
$('.info').append('<h3>Email: <span>' + registerInfo['email'] + '</span></h3>')
$('.info').append('<h3>Địa chỉ: <span>' + registerInfo['address'] + '</span></h3>')
$('.info').append('<h3>Số điện thoại: <span>' + registerInfo['phoneNumber'] + '</span></h3>')
$('.info').append('<h3>Địa chỉ: <span>' + registerInfo['fbAddress'] + '</span></h3>')
$('.info').append('<h3>Ngày sinh: <span>' + registerInfo['birthDate'] + '</span></h3>')
$('.info').append('<h3>Giới tính: <span>' + registerInfo['sex'] + '</span></h3>')
$('.info').append('<h3>Mật khẩu: <span>' + registerInfo['passWord'] + '</span></h3>')

