import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: '100%'
    },
    center: {
      position: 'absolute',
      width: '200px',
      height: '50px',
      top: 'calc(50% + 32px)',
      left: '50%',
      marginLeft: '-100px',
      marginTop: '-25px',
      fontSize: 16
    }
  }),
);

export function Instruction() {
  const classes = useStyles();
  return (
    <div>
      <p className={classes.center}>Search for a podcast show</p>
    </div>
  );
}