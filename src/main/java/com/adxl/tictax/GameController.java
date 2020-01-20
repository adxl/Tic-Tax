package com.adxl.tictax;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GameController
{
    List<Player> players=new ArrayList<>();
    String lastPlayer;
    Lobby lobby=new Lobby();

    @MessageMapping("/play")
    @SendTo("/board/move")
    public Move getMove(Play play)
    {
        //System.out.println(players.size());
        if (players.isEmpty())
        {
            players.add(play.getPlayer());
            players.get(0).setMark("O");
        } else if (players.size()==1 && !players.get(0).getUsername().equals(play.getPlayer().getUsername()))
        {
            players.add(play.getPlayer());
            players.get(1).setMark("X");
        }
        //System.out.println(players.size());
        //System.out.println(play);

        if (play.getPlayer().getUsername().equals(players.get(0).getUsername()) && !isLastPlayer(players.get(0)))
        {
            lastPlayer=players.get(0).getUsername();
            return new Move(HtmlUtils.htmlEscape(players.get(0).getUsername()),
                    HtmlUtils.htmlEscape(players.get(0).getMark()),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getI()))),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getJ()))));
        } else if (play.getPlayer().getUsername().equals(players.get(1).getUsername()) && !isLastPlayer(players.get(1)))
        {
            lastPlayer=players.get(1).getUsername();
            return new Move(HtmlUtils.htmlEscape(players.get(1).getUsername()),
                    HtmlUtils.htmlEscape(players.get(1).getMark()),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getI()))),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getJ()))));
        }
        System.out.println("Cant play!");
        return null;
    }

    @MessageMapping("/wait")
    @SendTo("/lobby/waiting")
    public boolean getLobby(String p)
    {
        System.out.println(p+" is waiting....");
        if (!lobby.isReady(p))
            lobby.addPlayer(p);
        return lobby.isFull() ? true : false;
    }

    private boolean isLastPlayer(Player player)
    {
        return player.getUsername().equals(lastPlayer) ? true : false;
    }

}
