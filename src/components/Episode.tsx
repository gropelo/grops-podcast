import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IEpisode } from '../types/app.types';
import { useDispatch } from '../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: '100%'
    }
  }),
);

interface IProps {
  episode: IEpisode;
}

export function Episode({episode}: IProps) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const play = (url: string) => {
    dispatch({
      type: 'PLAY',
      payload: url
    })
  };

  return (
    <ListItem button component="a" onClick={() => play(episode.url)} className={classes.fullWidth}>
      <ListItemText primary={episode.title} />
    </ListItem>
  );
}