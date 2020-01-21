package com.adxl.tictax;

import java.util.ArrayList;
import java.util.List;

public class Lobby
{
    private List<Player> players;

    public Lobby()
    {
        this.players=new ArrayList<>();
    }

    public List<Player> getPlayers()
    {
        return players;
    }

    public void addPlayer(Player player)
    {
        players.add(player);
    }

    public boolean isReady(Player player)
    {
        return players.contains(player) ? true : false;
    }

    public boolean isFull()
    {
        return players.size()==2 ? true : false;
    }
}
