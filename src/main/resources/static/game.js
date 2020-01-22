var stompClient = null;

function startGame(names) {
    setPlaying(true)
    if ($("#name").val() == names.p1)
        $("#turn").text($("#name").val() + ", you play first!")
    else
        $("#turn").text(names.p1 + " plays first")

    stompClient.subscribe('/game/abort', function (res) {
        exitGame();
        window.location.reload(true)
    });
    stompClient.subscribe('/board/move', function (play) {
        draw(JSON.parse(play.body).play.player.username,
            JSON.parse(play.body).play.player.mark,
            JSON.parse(play.body).play.spot.i,
            JSON.parse(play.body).play.spot.j,
            names)
    });
}

function exitGame() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setPlaying(false);
    console.log("Disconnected");
}

function accessLobby()
{
    var socket = new SockJS('/tic-tax');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Accessed the lobby: ' + frame);
        $("#start").show()
        $("#play").hide()
        $("#name").hide()
        $("#playerInfos").show()
        $("#playerInfos").html("Hello, "+$("#name").val()+"!")
        stompClient.subscribe('/lobby/waiting', function (response) {
            if(JSON.parse(response.body).full)
            {
                var playersNames = {
                    p1 : JSON.parse(response.body).players[0].username,
                    p2 : JSON.parse(response.body).players[1].username
                }
                startGame(playersNames);
            }
        }
        );
    });
}

function requestGame()
{
    stompClient.send('/app/wait', {},JSON.stringify({"username":$("#name").val(),"mark":"#"}));
    setWaiting()
}

function setWaiting()
{
    $("#lobbyMessage").text("Waiting for a player to join...")
    $("#lobbyMessage").show()
    $("#start").hide()
    $("#playerInfos").hide()
}

function setPlaying(playing) {
    $("#play").prop("disabled", playing);
    $("#exit").prop("disabled", !playing);

    if (playing) {
        $("#play").hide()
        $("#exit").show()
        $("#boardDiv").show()
        $("#name").hide()
        $("#start").hide()
        $("#lobbyMessage").hide()
    } else {
        $("#play").show()
        $("#exit").hide()
        $("#boardDiv").hide()
        $("#playerInfos").val("")
        $("#playerInfos").hide()
        $("#name").show()
        $("#name").val("")

    }
}

function requestMove(spot) {
    var board=[
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]
    var spotTd = "spot"+board[getSpotIndex(spot).i][getSpotIndex(spot).j]

    if($('#'+spotTd).html()=="" && !checkWinner())
    stompClient.send('/app/play', {},JSON.stringify(
        {"player":{"username":$("#name").val(),"mark":"#"},
            "spot":{"i":getSpotIndex(spot).i,"j":getSpotIndex(spot).j}}));
}

function draw(username,mark,i,j,names) {
    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    var spot = "spot" + board[i][j]
    $('#' + spot).html(mark)

    if (!checkWinner()) {
        if (username == $("#name").val() && username == names.p1) {
            $("#movesLog").append(
                "<tr><td>\>You played on (" + i + "," + j + ")</td></tr>"
            )
            $("#turn").text(names.p2 + " is thinking..")
        } else if (username == $("#name").val() && username == names.p2) {
            $("#movesLog").append(
                "<tr><td>\>You played on (" + i + "," + j + ")</td></tr>"
            )
            $("#turn").text(names.p1 + " is thinking..")
        } else {
            $("#movesLog").append(
                "<tr><td>\>" + username + " played on (" + i + "," + j + ")</td></tr>"
            )
            $("#turn").text("It's your turn!")
        }
    }else if(checkWinner()==-1)
    {
        $("#turn").text("IT'S A TIE!")
    }
    else
        $("#turn").text(username.toUpperCase()+" WON THE GAME!")
}

function checkWinner() {
    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]

    for (i = 0; i < 3; i++) {
        if (equalsThree($('#spot' + board[i][0]).html(),
            $('#spot' + board[i][1]).html(),
            $('#spot' + board[i][2]).html())) {

            var spot1 = $('#spot' + board[i][0])
            var spot2 = $('#spot' + board[i][1])
            var spot3 = $('#spot' + board[i][2])

            var spots = $()
            spots = spots.add(spot1).add(spot2).add(spot3)
            spots.css("color", "#dc3545")

            return true;
        }
    }
    for (j = 0; j < 3; j++) {
        if (equalsThree($('#spot' + board[0][j]).html(),
            $('#spot' + board[1][j]).html(),
            $('#spot' + board[2][j]).html())) {

            var spot1 = $('#spot' + board[0][j])
            var spot2 = $('#spot' + board[1][j])
            var spot3 = $('#spot' + board[2][j])

            var spots = $()
            spots = spots.add(spot1).add(spot2).add(spot3)
            spots.css("color", "#dc3545")

            return true;
        }
    }
    if (equalsThree($('#spot' + board[0][0]).html(),
        $('#spot' + board[1][1]).html(),
        $('#spot' + board[2][2]).html())) {

        var spot1 = $('#spot' + board[0][0])
        var spot2 = $('#spot' + board[1][1])
        var spot3 = $('#spot' + board[2][2])

        var spots = $()
        spots = spots.add(spot1).add(spot2).add(spot3)
        spots.css("color", "#dc3545")

        return true;
    }
    if (equalsThree($('#spot' + board[0][2]).html(),
        $('#spot' + board[1][1]).html(),
        $('#spot' + board[2][0]).html())) {

        var spot1 = $('#spot' + board[0][2])
        var spot2 = $('#spot' + board[1][1])
        var spot3 = $('#spot' + board[2][0])

        var spots = $()
        spots = spots.add(spot1).add(spot2).add(spot3)
        spots.css("color", "#dc3545")

        return true;
    }

    if (isTie()) return -1;

    return false;
}

function isTie() {
    var result = true
    $('#board').find('td.spot').each(function (i, td) {
        if ($(td).html() == '')
            result = false;
    });
    return result
}

function equalsThree(a, b, c) {
    if (a != "" && b != "" && c != "")
        return (a == b && b == c)
}

function getSpotIndex(spot) {
    var id = spot.id.charAt(spot.id.length - 1)
    var index={
        "i":"",
        "j":""
    };
    switch (id) {
        case '1': index.i=0;index.j=0; break;
        case '2': index.i=0;index.j=1; break;
        case '3': index.i=0;index.j=2; break;
        case '4': index.i=1;index.j=0; break;
        case '5': index.i=1;index.j=1; break;
        case '6': index.i=1;index.j=2; break;
        case '7': index.i=2;index.j=0; break;
        case '8': index.i=2;index.j=1; break;
        case '9': index.i=2;index.j=2; break;
    }
    return index;
}

function requestLeave()
{
    stompClient.send('/app/leave',{},JSON.stringify({"username":$("#name").val()}))
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#play").click(function () {
        if ($("#name").val())
            accessLobby();
    });
    $("#exit").click(function () {
        requestLeave();
    });
});