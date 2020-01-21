package com.adxl.tictax;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@Controller
public class GameController
{
    List<Player> players;
    String lastPlayer;
    Lobby lobby=new Lobby();

    @MessageMapping("/play")
    @SendTo("/board/move")
    public Move getMove(Play play)
    {
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
    public Lobby getLobby(Player p)
    {
        System.out.println(p.getUsername()+" is waiting....");
        if(lobby.getPlayers().isEmpty())
        {
            p.setMark("O");
            lobby.addPlayer(p);
            lobby.setFull(false);
            return lobby;
        }else if(lobby.getPlayers().size()==1)
        {
            p.setMark("X");
            lobby.addPlayer(p);
            players=lobby.getPlayers();
            lastPlayer=players.get(1).getUsername();
            lobby.setFull(true);
            System.out.println(players.get(0).getUsername()+" VS "+players.get(1).getUsername());
            return lobby;
        }
        //return lobby.isFull() ? true : false;
        return null;
    }

    private boolean isLastPlayer(Player player)
    {
        return player.getUsername().equals(lastPlayer) ? true : false;
    }

}
