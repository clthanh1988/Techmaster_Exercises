var arrInfo = ['image', 'name', 'sex', 'email', 'phone'];


var adam = {
    image: 'adam',
    name: 'Adam Warlock',
    sex: 'male',
    email: 'adamW@avengers.universe',
    phone: '012-343-3489'
}
var blackpanther = {
    image: 'blackpanther',
    name: "T'Challa",
    sex: 'male',
    email: 'blackP_WakandaKing@avengers.universe',
    phone: '09999999999'
}
var blackwidow = {
    image: 'blackwidow',
    name: 'Natalia "Natasha" Alianovna Romanova',
    sex: 'female',
    email: 'hotterThanTheSun@avengers.universe',
    phone: '0823-456789'
}
var captainA = {
    image: 'captainA',
    name: 'Steve Rogers',
    sex: 'male',
    email: 'Just_aMan_with_aPowerfulShield@avengers.universe',
    phone: '0163456789'
}

var captainM = {
    image: 'captainM',
    name: 'Mar-Vell',
    sex: 'male',
    email: 'above&beyond@avengers.universe',
    phone: '0953456789'
}
var deadpool = {
    image: 'deadpool',
    name: 'Wade Wilson',
    sex: 'male',
    email: 'IfuckThanos.chick@avengers.universe',
    phone: '0963456789'
}
var doctorS = {
    image: 'doctorS',
    name: 'Stephen Vincent Strange',
    sex: 'male',
    email: 'magical_me@avengers.universe',
    phone: '0153456789'
}

var hulk = {
    image: 'hulk',
    name: 'Robert Bruce Banner',
    sex: 'male',
    email: 'igot2emails@avengers.universe',
    phone: '00011116789'
}

var ironman = {
    image: 'ironman',
    name: 'Anthony Edward "Tony" Stark',
    sex: 'male',
    email: 'money&fame@avengers.universe',
    phone: '0999996789'
}

var quickS = {
    image: 'quickS',
    name: 'Pietro Django Maximoff',
    sex: 'male',
    email: 'quickerthanFlash@avengers.universe',
    phone: '0534567896789'
}

var scarletW = {
    image: 'scarletW',
    name: 'Wanda Maximoff',
    sex: 'female',
    email: 'hottestWitchEverrrr@avengers.universe',
    phone: '0123xxx789'
}

var spiderman = {
    image: 'spiderman',
    name: 'Peter Benjamin Parker',
    sex: 'male',
    email: 'peter_parker@avengers.universe',
    phone: '1900-9999'
}

var thor = {
    image: 'thor',
    name: 'Thor Odinson',
    sex: 'male',
    email: 'myDadisOdin@avengers.universe',
    phone: '000-3456789'
}



function sortTable(n) {

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending: // Đặt chế độ sắp xếp theo hướng tăng dần
    dir = "asc";
    /* Make a loop that will continue until // Tạo 1 vòng lặp sẽ tiếp tục cho đến khi không còn phép hoán đổi nào nữa thì dừng
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done: // Bắt đầu : Không có phép hoán đổi nào được thực thi
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the // Lặp qua tất cả các hàng (Ngoại trừ hàng đầu tiên có chứa tiêu đề của bảng: row0)
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching: // Bắt đầu : Không có phép hoán đổi nào NÊN được Thực thi
            shouldSwitch = false;
            /* Get the two elements you want to compare, // Lấy 2 element muốn so sánh với nhau, 1 element hiện tại & 1 element ngay sau 
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place, // Kiểm tra xem 2 hàng có nên hoán đổi cho nhau hay không, tùy thuộc vào chế độ sắp xếp Tăng dần hay Giảm dần
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop: // Theo hướng tăng dần, mà x lại > y => Phải đổi chỗ rồi thoát khỏi Vòng lặp
                    shouldSwitch = true;
                    break;
                }
            } 
            else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop: // Theo hướng giảm dần, mà x lại < y => Phải đổi chỗ rồi thoát khỏi Vòng lặp
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch // Nếu 1 phép hoán đổi Nên được thực thi(shouldSwitch = true) thì Thực hiện hoán đổi rồi đánh dấu lại là Phép hoán đổi đã được Thực thi
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); // Đổi chỗ row[i] và row[i+1]
            switching = true;
            // Each time a switch is done, increase this count by 1: // Mỗi lần 1 phép hoán đổi được thực thi, tăng số lần đếm +1
            switchcount++;
        } 
        else {
            /* If no switching has been done AND the direction is "asc", // Nếu không có phép hoán đổi nào được thực thi & hướng sắp xếp là Tăng Dần => Đổi hướng sắp xếp thành Giảm Dần và chạy lại vòng lặp
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

var data = [adam, blackpanther, blackwidow, captainA, captainM, deadpool, doctorS, hulk, ironman, quickS, scarletW, spiderman, thor];

function loadTable() {
    var table = "<table id='myTable'><caption><span id='caption'>Avengers</span></caption><tr id='row0' >";

    for (var i = 0; i < arrInfo.length; i++) {
        if (i % 2 == 0) {
            // Bấm 2,4,6,... lần thì gọi hàm sortTable(0) 
            table += "<th onclick='sortTable(0)' id='" + arrInfo[i] + "'>" + arrInfo[i] + "</th>";
        } else {
            // Bấm 1,3,5,... lần thì gọi hàm sortTable(1)
            table += "<th onclick='sortTable(1)' id='" + arrInfo[i] + "'>" + arrInfo[i] + "</th>";
        }


    }
    table += "</tr>";
    var temp = 0;

    for (var i = 0; i < 13; i++) {
        table += "<tr class='row' id='row" + (i + 1) + "'>";
        for (var j = 0; j < 5; j++) {
            temp += 1;
            table += "<td class='cell " + arrInfo[j] + "' id='cell" + temp + "'></td>";
        }
        table += '</tr>';
    }
    table += "</table>";
    return table;
}
$("#wrap").append(loadTable());

for (var i = 0; i < data.length; i++) {
    $($(".image")[i]).append("<img class='img-cell' src='img/" + data[i]['image'] + ".jpg' width='120px'>");
    $($(".name")[i]).append(data[i]['name']);
    $($(".sex")[i]).append(data[i]['sex']);
    $($(".email")[i]).append(data[i]['email']);
    $($(".phone")[i]).append(data[i]['phone']);

}

$('th').append('<div  class="img-sort"><img id="img-up" src="img/up.png" width="20px" ></div>');
$('th').append('<div  class="img-sort"><img id="img-down" src="img/down.png" width="20px" ></div>');