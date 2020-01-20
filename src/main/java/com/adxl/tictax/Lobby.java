package com.adxl.tictax;

import java.util.ArrayList;
import java.util.List;

public class Lobby
{
    private List<String> playersNames;

    public Lobby()
    {
        this.playersNames=new ArrayList<>();
    }

    public List<String> getPlayersNames()
    {
        return playersNames;
    }

    public void addPlayer(String player)
    {
        playersNames.add(player);
    }

    public boolean isReady(String player)
    {
        return playersNames.contains(player) ? true : false;
    }

    public boolean isFull()
    {
        return playersNames.size()==2 ? true : false;
    }
}
