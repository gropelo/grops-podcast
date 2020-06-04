import React from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      textAlign: 'center',
      width: '100%'
    },
  }),
);

export function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.loader} >
      <LinearProgress />
    </div>
  );
}