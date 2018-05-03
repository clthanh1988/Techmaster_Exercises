function populate() {
	if(quiz.isEnded()) {
		 if (quiz.score != 5) {
			showScores();
			
			// Hiện nút play again
		 }

		else {
			
			window.location.href = "winner.html";
			
		}
		
		

	}
	else {
		// Show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;
	
		// show choices
		var choices = quiz.getQuestionIndex().choices;
		for (var i = 0; i <choices.length; i++) {

			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}
	
		showProgress();
	}

}

function guess(id, guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		quiz.guess(guess);
		populate();
	}
}

function showProgress(){
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Câu hỏi " + currentQuestionNumber + "/" + quiz.questions.length;
}

function showScores(){
	var gameOverHtml = "<h1>Result</h1>";
		gameOverHtml+= "<h2 id='score'>Your score: " + quiz.score + "</h2>";
		gameOverHtml+= "<a class='btnReset' href='quiz.html'>Play Again</a>";

	var element = document.getElementById("quiz");
		element.innerHTML = gameOverHtml;
	
}

var questions = [
	new Question("Các vua Hùng đặt tên quốc hiệu nước ta là gì?", ["Văn Lang", "Âu Lạc", "Vạn Xuân", "Đại Việt"], "Văn Lang"),
	new Question("An Dương Vương đặt quốc hiệu nước ta là gì?", ["Âu Lạc", "Vạn Xuân", "Đại Cồ Việt", "Đại Việt"], "Âu Lạc"),
	new Question("Đại Ngu là quốc hiệu của triều đại nào?", ["Triều Ngô", "Triều Hồ", "Các chúa Nguyễn", "Nhà Tây Sơn"], "Triều Hồ"),
	new Question("Đội nào lên ngôi vô địch AFC Asian Cup 2011 tổ chức tại Qatar", ["Nhật Bản", "Australia", "Hàn Quốc", "Uzbekistan"], "Nhật Bản"),
	new Question("Năm 1010, Lý Thái Tổ đã cho xây dựng điện nào ở trung tâm hoàng thành Thăng Long", ["Điện Kính Thiên", "Điện Càn Nguyên", "Điện Càn Chánh", "Điện Càn Thành"], "Điện Càn Nguyên"),
	
]

var quiz = new Quiz(questions);

populate();