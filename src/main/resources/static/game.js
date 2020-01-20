var stompClient = null;

function startGame() {
    var socket = new SockJS('/tic-tax');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setPlaying(true)
        console.log('Connected: ' + frame);
        stompClient.subscribe('/board/move', function (play) {
            showMessage(JSON.parse(JSON.parse(play.body).player.body).username,
                JSON.parse(JSON.parse(play.body).player.body).mark,
                JSON.parse(JSON.parse(play.body).spot.body).i,
                JSON.parse(JSON.parse(play.body).spot.body).j);
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

function getSpotIndex(spot) {
    var id = spot.id.charAt(spot.id.length - 1)
    console.log(id)
}

$(function () {

});