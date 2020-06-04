import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      position: 'fixed',
      bottom: 10,
      left: 10,
      width: 'calc(100% - 20px)'
    },
    fullWidth: {
      width: '100%'
    }
  }),
);

interface IProps {
  url: string;
}

export function Player({url}: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <ReactAudioPlayer
        src={url}
        autoPlay
        controls
        className={classes.fullWidth}
      />
    </div>
  )
}