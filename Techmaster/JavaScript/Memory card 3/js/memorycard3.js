var cards = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12"];

var current = null; 

var isPlaying = false; 

var point = 0;

var normalTime = 100;

var hardTime = 75;

var maxTime = remainingTime = normalTime;

var running = null;

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

function openMode(type){
	$('.mode-backdrop').css('display', 'block');
    $('.mode').hide();
    $('.mode.' + type).fadeIn(); // '.mode.' mới chạy còn '.mode' thì KHÔNG
}

function closeMode() {
    $('.mode-backdrop').css('display', 'none');
    $('.mode').hide();
}


function flip(card) {
	// Check xem đã bắt đầu chơi hay chưa
	if (!isPlaying) return;

	// Không cho click vào lá bài này (vì chưa bắt đầu Game)
	$(card).css('pointer-events', 'none');

	// Flip this card
	$(card).toggleClass("flipped");

	playSound('flip');

	if (!current) {
		current = $(card);
	}
	else {
		// Không cho click vào tất cả các lá bài
		$('.card').css('pointer-events', 'none');

		// 2 lá Khác nhau
		if (current.attr('data-name') != $(card).attr('data-name')) {
			// Úp 2 lá bài xuống sau 0.5s
			setTimeout(function(){
				$(card).toggleClass('flipped');
				current.toggleClass('flipped');
				current = null;

				playSound('incorrect');

				// Cho phép click vào tất cả các lá bài
				if(isPlaying){
                    $('.card').css('pointer-events', 'auto');
                }

			}, 500);
			
		}
		
		// 2 lá Giống nhau
		else {
			point++;

			// Hiển thị cặp bài
			$(card).find('img').css({'box-shadow': '0px 0px 15px 5px rgba(240,240,140,0.75)'});

			current.find('img').css({'box-shadow': '0px 0px 15px 5px rgba(240,240,140,0.75)'});

			// Ẩn cặp bài sau 0.4s
			setTimeout(function(){
				$(card).css('opacity', '0');
				current.css('opacity', '0');
				current = null;
				
				playSound('correct');

				// Kết thúc game nếu lật hết các cặp bài
				if (point == 12) {
					// Dừng nhạc nền
					document.getElementById('bg-music').load();
					
					// Chơi nhạc Win
					playSound('win');
					
					// Dừng game
					stopGame();
					openMode('win');
                    $('.btn-reset').css('opacity', '1');

				}

				else {
					// Cho phép click vào tất cả các lá bài
					$('.card').css('pointer-events', 'auto');
				}
				
			}, 400);
		}


	}


}

function loadContent() {
    // Reset progressbar
    $('.progressbar').css('display', 'none');

    // Shuffle all cards
    cards = shuffle(cards);

    // Add cards to screen
    var html = '';
    for (var i=0; i<cards.length; i++) {
        html += '<div class="box">' +
		'<div class="card" data-name="' + cards[i] + '" onclick="flip(this)">' +
		'<div class="back"><img src="img/back.png" /></div>' +
		'<div class="front"><img src="img/' + cards[i] + '.png" /></div>' +
		'</div></div>' ;
    };
    $('.content').html(html);

    // Open begin mode
    openMode('begin');
}

function startGame(mode) {
    // Set game mode
    if (mode == 1) {
        // Normal
        maxTime = remainingTime = normalTime;
        $('#bg-music').children().first().attr('src', 'audio/bg.mp3');
        $('.mode.win img').first().attr('src', 'img/victory.jpg');
    } 
    else {
        // Hard
        maxTime = remainingTime = hardTime;
        $('#bg-music').children().first().attr('src', 'audio/hard-bg.mp3');
        $('.mode.win img').first().attr('src', 'img/victory2.jpg');
    }

    // Close mode
    closeMode();
    $('.btn-reset').css('opacity', '0');

    // Start game
    isPlaying = true;
    point = 0;
    var current = null;
    $('.card').css('pointer-events', 'auto');

    // Play background music
    document.getElementById('bg-music').load();
    document.getElementById('bg-music').play();

    // Start progressbar
    remainingTime = maxTime;
    $('.progressbar').css('display', 'block');
    $('progress').val(100);
    running = setInterval(function(){ 
        remainingTime--;
        $('progress').val(remainingTime / maxTime * 100);

        // 10s remaining
        if (remainingTime == 10) {
            playSound('count10');
        }

        // 5s remaining
        if (remainingTime == 5) {
            playSound('count5');
        }

        // Timeout => game over
        if (remainingTime == 0) {
            // Dừng nhạc nền
            document.getElementById('bg-music').load();

           	playSound('lose');

            // Stop game
            stopGame();
            openMode('lose');
            $('.btn-reset').css('opacity', '1');
        }
    }, 1000);
}

function stopGame() {
    isPlaying = false;

    if (running != null) {
        clearInterval(running);
        running = null;
    }
    
    // Không cho click vào tất cả các lá bài
    $('.card').css('pointer-events', 'none');
}

$(function(){
    // Double cards
    cards = cards.concat(cards);

   	// Load content
    loadContent();
});



