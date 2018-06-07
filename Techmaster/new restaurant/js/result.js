var parameters;
var dataForm = [];

// location.search để lấy chuỗi URL bắt đầu từ ? , substring(1) để bỏ ? , split để bỏ hết các dấu & và trả về 1 mảng mới ( biến chuỗi URL thành 1 mảng gồm nhiều phần tử)
parameters = location.search.substring(1).split("&");

for (var i = 0; i<parameters.length; i++){
        var index = parameters[i].indexOf('='); // para[0] = 'fullname=dsddsadsd' => index = 8 ( vị trí của dấu '=')    
        var temp;
        temp = parameters[i].slice(index+1);    // temp = 'fullname=dsddsadsd'.slice(8+1=9) => temp = dsddsadsd ( Lấy được giá trị của fullname)
       	dataForm[i] = decodeURIComponent(temp.split('+').join(' ')); // bỏ hết dấu + , trả về chuỗi mới 
        
        //  date=07%2F06%2F2018&time=9%3A30&people=2+people&name=clthanh&phone=0936012410&email=jamebuston%40gmail.com
        console.log(dataForm);
}

var registerInfo = {
        date: dataForm[0],        
        time: dataForm[1],
        numberOfCus: dataForm[2],        
        name: dataForm[3],
        phone: dataForm[4],
        email: dataForm[5],
        
}

$('.col-10').append('<p>Dear Mr/Mrs ' + registerInfo['name'] + ', we are so proud to announce that you have successfully booked a table for '
                    + registerInfo['numberOfCus'] + ' at ' + registerInfo['time'] + " o'clock on " + registerInfo['date'] + 
                    '. We will contact you by your given information: Cellphone number: ' + registerInfo['phone'] +
                    ' and Email address: ' + registerInfo['email'] + ' to re-confirm. We are very pleased to have you here. Thank you very much.</p>'
                    )


