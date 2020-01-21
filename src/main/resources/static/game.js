var stompClient = null;

function startGame() {
    setPlaying(true)
    stompClient.subscribe('/board/move', function (play) {
        draw(JSON.parse(play.body).play.player.username,
            JSON.parse(play.body).play.player.mark,
            JSON.parse(play.body).play.spot.i,
            JSON.parse(play.body).play.spot.j)
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
            if(JSON.parse(response.body))
            startGame();
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
    $("#lobbyMessage").text("Waiting for players...")
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

    if($('#'+spotTd).html()=="")
    stompClient.send('/app/play', {},JSON.stringify(
        {"player":{"username":$("#name").val(),"mark":"#"},
            "spot":{"i":getSpotIndex(spot).i,"j":getSpotIndex(spot).j}}));
}

function draw(username,mark,i,j) {
    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    var spot = "spot" + board[i][j]
    $('#' + spot).html(mark)

    if(username==$("#name").val())
        $("#movesLog").append(
            "<tr><td>\>You played on ("+i+","+j+")</td></tr>"
        )
    else
        $("#movesLog").append(
            "<tr><td>\>"+username+" played on ("+i+","+j+")</td></tr>"
        )
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



$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#play").click(function () {
        if($("#name").val())
       accessLobby();
    });
    $("#exit").click(function () {
        exitGame();
    });
});