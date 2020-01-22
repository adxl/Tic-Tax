package com.adxl.tictax;

public class Player
{
    private String username;

    private String mark;

    public Player(String username, String mark)
    {
        this.username=username;
        this.mark=mark;
    }

    public Player(String username)
    {
        this.username=username;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username=username;
    }

    public String getMark()
    {
        return mark;
    }

    public void setMark(String mark)
    {
        this.mark=mark;
    }
}
