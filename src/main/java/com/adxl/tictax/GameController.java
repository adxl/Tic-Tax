package com.adxl.tictax;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class GameController
{
    List<Player> players=new ArrayList<>();

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
        
        if (play.getPlayer().getUsername().equals(players.get(0).getUsername()))
            return new Move(HtmlUtils.htmlEscape(players.get(0).getUsername()),
                    HtmlUtils.htmlEscape(players.get(0).getMark()),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getI()))),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getJ()))));
        else if (play.getPlayer().getUsername().equals(players.get(1).getUsername()))
            return new Move(HtmlUtils.htmlEscape(players.get(1).getUsername()),
                    HtmlUtils.htmlEscape(players.get(1).getMark()),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getI()))),
                    Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getJ()))));
        return null;
    }

}
