package com.adxl.tictax;

import java.util.ArrayList;
import java.util.List;

public class Lobby
{
    private List<Player> players;
    private boolean isFull;

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

    public boolean isFull()
    {
        return isFull;
    }

    public void setFull(boolean full)
    {
        isFull=full;
    }
}
