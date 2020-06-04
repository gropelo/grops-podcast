import React from 'react';
import { List } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IEpisodes } from '../types/app.types';
import { Episode } from './Episode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: '100%',
    }
  }),
);

interface IProps {
  episodes: IEpisodes;
}

export function EpisodeList({ episodes }: IProps) {
  const classes = useStyles();
  return (
    <List className={classes.fullWidth}>
      {episodes.map((e, i) => <Episode key={i} episode={e} />)}
    </List>
  )
}