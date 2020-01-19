package com.adxl.tictax;

public class Move
{
    private Play play;

    public Move(String username, String mark, int i, int j)
    {
        this.play = new Play(new Player(username,mark),new Spot(i,j));
    }

    public Play getPlay()
    {
        return play;
    }
}
