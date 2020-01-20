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

function setPlaying(playing) {
    $("#play").prop("disabled", playing);
    $("#exit").prop("disabled", !playing);

    if (playing) {
        $("#play").hide();
        $("#exit").show();
        $("#board").show();
    } else {
        $("#play").show();
        $("#exit").hide();
        $("#board").hide();
    }
}

function requestMove(spot) {
    stompClient.send('/app/play', {},JSON.stringify(
        {"player":{"username":"john","mark":"X"},
            "spot":{"i":getSpotIndex(spot).i,"j":getSpotIndex(spot).j}}));
}

function draw(username,mark,i,j)
{
    console.log(i)
    console.log(j)
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

});