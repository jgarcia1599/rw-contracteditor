import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './Editor.css'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    textAlign:'center'
  },
  leftpanel: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundRepeat: 'no-repeat',
    backgroundColor:"#556EE6",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign:'center',
  },
  leftPanelContent: {
    color:'white',
    margin:'20px',

    }

}));


export default function Editor() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={3} className={classes.leftpanel}
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"

      >
        <div className={classes.leftPanelContent}>
            <h1>Contract Parameters</h1>
            <p>To add parameters please either click on them in the sidebar, highlight the text and right click or type "@" to access them.</p>
        </div>
        </Grid>
        <Grid item tem xs={12} sm={8} md={9} >
            jsjjsjs
        </Grid>
</Grid>
  );
}