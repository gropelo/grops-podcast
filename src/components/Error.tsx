import React from 'react';
import { Alert } from '@material-ui/lab';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: '100%'
    },
  }),
);

interface IProps {
  message?: string;
}

export function Error({message}: IProps) {
  const classes = useStyles();
  return <Alert severity="error" className={classes.fullWidth}>{message || 'An error has ocurred, try again later...'}</Alert>;
}