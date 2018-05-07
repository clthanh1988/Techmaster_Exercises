var cards = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12"];
var current = null;

function shuffle(array) {
	var currentIndex = array.length, tempoValue, randomIndex;

	while (0 != currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempoValue 			= array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex]  = tempoValue;
	
	}
	return array;
}

function playSound(type) {
    document.getElementById(type + '-sound').load();
    document.getElementById(type + '-sound').play();
}


function flip(card) {
	$(card).toggleClass("flipped");

	playSound('flip');

	if (!current) {
		current = $(card);
	}
	else {
		if (current.attr('data-name') != $(card).attr('data-name')) {
			// Khác nhau
			setTimeout(function(){
				$(card).toggleClass('flipped');
				current.toggleClass('flipped');
				current = null;

				playSound('incorrect');

			}, 500);
			
		}
		else {
			// Giống nhau
			setTimeout(function(){
				$(card).css('opacity', '0');
				current.css('opacity', '0');
				current = null;
				
				playSound('correct');
				
			}, 200);
		}


	}


}

$(function() {
	// Nhân đôi mảng để tạo ra các cặp bài
	cards = cards.concat(cards);

	// Đảo vị trí các lá bài
	cards = shuffle(cards);

	// Chèn nội dung (các lá bài) vào trong element có class là "content"
	var html = "";
	for (var i = 0; i < cards.length; i++) {
		html += '<div class="box">' +
		'<div class="card" data-name="' + cards[i] + '" onclick="flip(this)">' +
		'<div class="back"><img src="img/back.png" /></div>' +
		'<div class="front"><img src="img/' + cards[i] + '.png" /></div>' +
		'</div></div>' ;

	}

	$('.content').html(html);


});
