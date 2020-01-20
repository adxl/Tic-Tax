package com.adxl.tictax;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GameController
{

    @MessageMapping("/play")
    @SendTo("/board/move")
    public Move getMove(Play play)
    {
        return new Move(HtmlUtils.htmlEscape(play.getPlayer().getUsername()),
                HtmlUtils.htmlEscape(play.getPlayer().getMark()),
                Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getI()))),
                Integer.valueOf(HtmlUtils.htmlEscape(String.valueOf(play.getSpot().getJ())))
        );

    }

}
