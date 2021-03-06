import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './Editor.css'
import QuillEditor from './QuillEditor'

const modules = {
    toolbar: '#toolbar',
    placeholder: {
      delimiters: ['{{', '}}'],
      placeholders: [
        { id: 'first_name', label: 'first_name', displayName: 'First Name' },
        { id: 'last_name', label: 'last_name', displayName: 'Last Name' },
      ],
    },
  }


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
            <h1>RemoteWise Contract Editor</h1>
            <p>1. Use the PlaceHolder Option in the toolbar to add place holder values to your contract</p>
            <p>2. Click on the up and down buttons to reorganize clauses dynamically!</p>
        </div>
        </Grid>
        <Grid item tem xs={12} sm={8} md={9} >
            <QuillEditor></QuillEditor>
        </Grid>
</Grid>
  );
}