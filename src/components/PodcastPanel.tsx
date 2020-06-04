import React, { useState } from 'react';
import { Avatar, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { IPodcast, Status } from '../types/app.types';
import { useEpisodes } from '../hooks';
import { Loading, Error, EpisodeList } from '.';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: '10px 0px 0px 10px'
    }
  })
);

interface IProps {
  podcast: IPodcast;
}

export function PodcastPanel({ podcast }: IProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [episodes, status] = useEpisodes(podcast.feedUrl, expanded);

  const onChange = (event: any, expanded: boolean) => {
    if (expanded) setExpanded(true);
  };

  return (
    <ExpansionPanel onChange={onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Avatar alt={podcast.title} src={podcast.pictureUrl} />
        <Typography className={classes.title}>{podcast.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {status === Status.LOADING && <Loading />}
        {status === Status.ERROR && <Error message="Impossible to load this feed." />}
        {status === Status.READY && <EpisodeList episodes={episodes} />}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}