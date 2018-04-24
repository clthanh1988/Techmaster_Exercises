function changeFontSize(x) {
		
	

	// Gói hết lại thì là 1 Array, phải gọi theo dạng arr[i]
	
	var ptags = document.getElementsByClassName("allP")

	for (var i = 0; i <=2; i ++) {
		ptags[i].style.fontSize = x + "px";
	}
	

	/* Cách thủ công lần lượt


	document.getElementById("p1").style.fontSize = x + "px";
	document.getElementById("p2").style.fontSize = x + "px";
	document.getElementById("p3").style.fontSize = x + "px"; */
} 
console.log(changeFontSize(20))


function increaseFontSize(idParagraph){
	var element = document.getElementById(idParagraph)
	var pixel = element.style.fontSize

	pixel = parseInt(pixel.replace("px", ""))

	if (pixel < 30) {
		pixel = pixel + 1;

	} 

	element.style.fontSize = pixel + "px"

}

function decreaseFontSize(idParagraph){
	var element = document.getElementById(idParagraph)
	var pixel = element.style.fontSize

	pixel = parseInt(pixel.replace("px", ""))

	if (pixel > 10) {

		pixel = pixel - 1;
	}

	element.style.fontSize = pixel + "px"

}

function changeColor() {
	document.getElementById("p1").style.color = "blue"
	document.getElementById("p2").style.color = "yellow"
	document.getElementById("p3").style.color = "red"

}

// trong func = color chứ k phải "color"

function changeBgColor(color) {
	 document.body.style.backgroundColor = color;



}

function copyContent(paragraph1, paragraph2) {
	var element1 = document.getElementById(paragraph1)
	var element2 = document.getElementById(paragraph2)

	element1.innerHTML = element2.innerHTML

}


