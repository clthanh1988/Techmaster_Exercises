var click = 0;
var ctrl1;
var ctrl2;

var arrImages =[];

var double1;
var double2;

$(document).ready(function(){
	shuffle();
	loadGame();

})

loadGame = function(){
	run();
}


// Thêm ảnh vào mảng
addImages = function(){
	for(var i = 1; i <= 12; i++){
		arrImages.push("img/f" + i + ".png", "img/f" + i + ".png"); // Thêm 1 cặp ảnh

	}



}

// Xáo ảnh
shuffle = function(){
	for(var i         = arrImages.length - 1; i > 0; i--){
		var j         = Math.round(Math.random() * (i + 1));
		var tempo     = arrImages[i];
		arrImages[i]  = arrImages[j];
		arrImages[j]  = tempo;
	
	}

}

run = function(){
	addImages();
	shuffle();
	var images = "";
	for (var i = 0; i < arrImages.length; i++){
		images += "<div class='card'><img class='back' id='back' "+i+" onclick='clickImages(this, "+i+")'; src='img/back.png' /><img class='front' id='front' src='" + arrImages[i] + "' /></div>";
	}

	$("#one").html(images);

}

clickImages = function(ctrl, i){
    if(click == 2) //Nếu đã click lần 2 rồi mà chưa chạy hàm kiểm tra xong thì ko cho chọn ảnh khác
        return;
    if(click == 0 ){
        //Gán vị trí lần chọn
        double1 = i;
        //Gán this từ hàm clickImages
        ctrl1 = ctrl;    
        $(ctrl).addClass("js-back");
        $($(ctrl).next()).addClass("js-front");
        //quay ảnh on
        click = 1;
    }
    else {
        //Gán vị trí lần chọn
        double2 = i;
        //Gán this từ hàm clickImages
        ctrl2 = ctrl;
        $($(ctrl).next()).addClass("js-front");
        $(ctrl).addClass("js-back");
        $(ctrl1).css('transform', 'rotateY(180deg)');
         //quay ảnh off
         $('#front' + double2).css('transform', 'rotateY(0deg)');
         //quay ảnh on
         click = 0;
         if (ctrl1 != ctrl2)
            setTimeout(click, 500);
         else {
            click = 1;
            return;
        }   
    }
}