package com.adxl.tictax;

public class Play
{
    private Player player;
    private Spot spot;

    public Play(Player player, Spot spot)
    {
        this.player=player;
        this.spot=spot;
    }

    public Player getPlayer()
    {
        return player;
    }

    public Spot getSpot()
    {
        return spot;
    }

}
