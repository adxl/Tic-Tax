package com.adxl.tictax;

import java.util.ArrayList;
import java.util.List;

public class Lobby
{
    private List<Player> players;
    private boolean isFull;
    private int access;

    public Lobby()
    {
        this.players=new ArrayList<>();
        access=1;
    }

    public Lobby(int access)
    {
        this.players=new ArrayList<>();
        this.access=access;
    }

    public List<Player> getPlayers()
    {
        return players;
    }

    public String getFirst()
    {
        if(!players.isEmpty())
        return players.get(0).getUsername();
        return "";
    }

    public int getAccess()
    {
        return access;
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
