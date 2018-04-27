// Object kết quả
var result = document.getElementById("txtResult");
	
// Vừa kết thúc phím tính
var end = false;

// Đổi dấu, chưa bấm mặc định là F
var swing = false;

// Vừa bấm phép tính? Chưa bấm mặc định là F
var calcuSwing = false;

// Ghi nhớ phép tính cũ nếu có thay đổi phép tính
var oldCalcu = "";

// Số phép tính ưu tiên tìm thấy
var uu_tien = 0;

// Mảng ghi nhớ các số hạng
var mangSoIndex = 0;
var mangSo = [];

// Mảng ghi nhớ phép tính
var mangPtIndex = 0;
var mangPt = [];

// Nội dung đang có
var strResult = "";

// Phím mới
var newButton = "";


// CÀI ĐẶT SỰ KIỆN


function press(obj){
	
	if(end == true){
		result.value = "";
		end = false;
	}

	// Chuỗi hiện tại của kết quả
	if(strResult == "" && newButton == ""){
		strResult = result.value;
	}
	if(strResult == "0"){
		strResult = "";
	}
	
	// HTML của phím bấm
	var type = obj.innerHTML;
	
	// NHÓM SỐ
	if(	type=="0" ||
		type=="1" ||
		type=="2" ||
		type=="3" ||
		type=="4" ||
		type=="5" ||
		type=="6" ||
		type=="7" ||
		type=="8" ||
		type=="9" ||
		type=="+/-" ||
		type==".")
	{
		calcuSwing = false;
		// Đổi dấu
		if(type == "+/-" ){
			// Đổi từ - thành +
			if(swing == true ){
				swing = false;
				newButton = newButton.substring(1);
			}
			// Đổi từ + thành -
			else
			{
				swing = true;			
				newButton = "-" + newButton;
			}
		}
		// Số
		else
		{
			newButton = newButton + type;
		}
		// Thay đổi hiển thị
		result.value = strResult + newButton;
	}
	// NHÓM PHÉP TÍNH ( + - * / )
	else if(
		type == "+" ||
		type == "-" ||
		type == "*" ||
		type == "/"
	)
	{
		// Trước đó có bấm 1 phép tính
		if(calcuSwing == true ){
			
			// Nếu phép tính cũ là ưu tiên, nhưng phép tính mới không ưu tiên
			if((oldCalcu=="*" || oldCalcu == "/") && (type == "+" || type == "-")){
				uu_tien--;
			}
			// Nếu phép tính cũ không ưu tiên, nhưng phép tính mới có ưu tiên
			else if((oldCalcu=="+" || oldCalcu == "-") && (type == "*" || type == "/")){
				uu_tien++;
			}
			
			// Lưu vào mảng phép tính

			mangPt[mangPtIndex-1] = type;
			
			// Xử lý hiển thị
			result.value = result.value.substring(0,result.value.length-1) + type;
		}
		// Chưa bấm phép tính
		else{
			// Ghi nhớ phép tính
			oldCalcu = type;

			// Lưu vào mảng số
			mangSo[mangSoIndex] = parseFloat(newButton);		
			mangSoIndex++;						
			
			// Lưu vào mảng phép tính
			mangPt[mangPtIndex] = type;		
			mangPtIndex++;
			
			// Xử lý hiển thị
			result.value = result.value + type;
			
			// Cộng số đếm ưu tiên lên
			if(type=="*" || type == "/"){
				uu_tien++;
			}
		}
		// Ghi nhớ đã bấm phím phép tính
		calcuSwing = true;
		// Đổi giá trị 2 chuỗi cơ bản về rỗng
		strResult = "";
		newButton = "";
	}
	// NHÓM TÍNH KẾT QUẢ
	else if(type == "=" || type == "%")
	{
		end = true;

		if(newButton != ""){
			mangSo[mangSoIndex] = parseFloat(newButton);
		}
		// Dấu =
		if(type == "="){			
			
			// Gọi hàm tính kết quả
			
			GetValue();
		}
		// Dấu %
		else
		{
			
			// Gọi hàm tính %
			
			GetPercent();
		}

		// RESET
		strResult = "";
		newButton = "";
		mangSo = [];
		mangPt = [];
		mangPtIndex = 0;
		mangSoIndex = 0;	
		uu_tien = 0;
	}
	
	// NHÓM TÍNH KẾT QUẢ ĐẶC BIỆT ( ! ^2 Căn)

	else if(type == "!") {
		

		GiaiThua()
	}

	else if(type == "x^2"){

		BinhPhuong()
	}

	else if(type == "căn"){

		SquareRoot()
	} 


	// CE
	else if(type == "CE"){
		newButton = "";
		// Thay đổi hiển thị
		result.value = strResult + newButton;
	}
	// Phím xóa 1 ký tự
	else
	{
		if(newButton.length > 1){
			newButton = newButton.substring(0, newButton.length-1);
		}
		else {
			newButton = "";
		}
		// Thay đổi hiển thị
		result.value = strResult + newButton;
	}
	
	// LOG xem
	/* console.log(mangSo);
	console.log(mangPt);
	*/
	
}

// 2 HÀM TÍNH TOÁN GetValue và GetPercent 

// Tính %
function GetPercent(){
	mangPtIndex--;
	// Kiểm tra mảng số chỉ có 2 phần tử và phần tử thứ 2 phải khác 0
	if(mangSoIndex!=1 || mangSo[1]==0){
		result.value = "0";
	}
	// Phải có 1 phép tính
	else if(mangPtIndex!=0){
		result.value = "0";
	}
	// Phép tính phải là chia
	else if(mangPt[0] != "/"){
		result.value = "0";
	}
	// Tất cả điều kiện đã vượt qua
	else{
		var _res = mangSo[0] / mangSo[1] * 100;
		result.value = _res;
	}
	
	
}

// Tính giá trị thường
function GetValue(){
	mangPtIndex--;	
	
	// BƯỚC 1 : phép tính ưu tiên
	
	while(uu_tien > 0){
		for(var index = 0 ; index <= mangPtIndex; index ++){
			if(mangPt[index]=="*" || mangPt[index]=="/"){
				
				// Lấy 2 số hạng
				
				var sh1 = mangSo[index];
				var sh2 = mangSo[index+1];
				
				// Tính kết quả * hoặc /
				
				var kqt = 0;
				if(mangPt[index]=="*"){
					kqt = sh1 *  sh2;
				} 
				else if(sh2==0)
				{
					result.value = "0";
				}
				else
				{
					kqt = sh1 /  sh2;
				}
				
				// Thay thế số hạng
				
				mangSo[index] = kqt;
				
				// Dồn số hạng
				
				for(var new_index = index + 1 ; new_index < mangSoIndex ; new_index++){
					mangSo[new_index] = mangSo[new_index+1];					
				}
				mangSoIndex--;
				
				// Xóa bỏ phép tính
				
				for(var new_index = index ; new_index < mangPtIndex ; new_index++){
					mangPt[new_index] = mangPt[new_index+1];					
				}
				mangPtIndex--;	
				
				// Xóa ghi nhớ ưu tiên
				uu_tien--;
								
				// Ngắt vòng lặp									
				break;
			}
		}
	}
	
	// BƯỚC 2	: phép tính thường
	
	while(mangSoIndex > 0){
		
		// Lấy 2 số hạng
		
		var sh1 = mangSo[0];
		var sh2 = mangSo[1];
		
		// Tính kết quả
		
		var kqt = 0;
		if(mangPt[0] == "+"){
			kqt = sh1 + sh2;
		}else{
			kqt = sh1 - sh2;
		}
		// Thay thế số hạng
		
		mangSo[0] = kqt;
		
		// Dồn số hạng
		
		for(var new_index = 1 ; new_index < mangSoIndex ; new_index++){
			mangSo[new_index] = mangSo[new_index+1];					
		}
		mangSoIndex--;
		
		// Xóa bỏ phép tính
		
		for(var new_index = 0 ; new_index < mangPtIndex ; new_index++){
			mangPt[new_index] = mangPt[new_index+1];					
		}
		mangPtIndex--;
	}
	
	// IN KẾT QUẢ
	result.value = mangSo[0];
}

// Tính giai thừa
function GiaiThua(){
	var giaithua = 1;
	for (var i = 1; i <= result.value ; i++){
		giaithua = giaithua * i;
	}
	result.value = giaithua;

}

// Tính bình phương
function BinhPhuong(){

	result.value = result.value * result.value;

}

// Tính căn bậc 2
function SquareRoot(){

	result.value = Math.sqrt(result.value);

}