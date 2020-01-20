var stompClient = null;

function startGame() {
    var socket = new SockJS('/tic-tax');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setPlaying(true)
        console.log('Connected: ' + frame);
        stompClient.subscribe('/board/move', function (play) {
            draw(JSON.parse(play.body).play.player.username,
                JSON.parse(play.body).play.player.mark,
                JSON.parse(play.body).play.spot.i,
                JSON.parse(play.body).play.spot.j)
        });
    });
}

function exitGame() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setPlaying(false);
    console.log("Disconnected");
}

function requestGame()
{
        
}

function setPlaying(playing) {
    $("#play").prop("disabled", playing);
    $("#exit").prop("disabled", !playing);

    if (playing) {
        $("#play").hide()
        $("#exit").show()
        $("#board").show()
        $("#name").hide()
        $("#playerInfos").show()
        console.log($("#name").val())
        $("#playerInfos").html($("#name").val())
    } else {
        $("#play").show()
        $("#exit").hide()
        $("#board").hide()
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

function draw(username,mark,i,j)
{
    var board=[
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]
    var spot = "spot"+board[i][j]
    $('#'+spot).html(mark)
}

function getSpotIndex(spot) {
    var id = spot.id.charAt(spot.id.length - 1)
    var index={
        "i":"",
        "j":""
    };
    console.log(id)
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
        startGame();
    });
    $("#exit").click(function () {
        exitGame();
    });
});