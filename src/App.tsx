import { Button, TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as marked from 'marked';
import * as React from 'react';
import './App.css';
import { sampleText } from './sampleText';

class App extends React.Component{

    public state = {text: sampleText};
    constructor(props: any){
        super(props);
        const localStorageText = localStorage.getItem('text');
        if(localStorageText){
         this.state = {
                text: localStorageText
            }
        }
    }

 public  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        text: e.target.value
    });
 }
 public renderText = (text: string): any => {
     const renderText = marked(text, {sanitize: true});
     return  {__html: renderText}
 };

 public componentWillUpdate(nextProps: any, nextState:any){
    localStorage.setItem('text', nextState.text)
 }

  public render() {

      return (
        <React.Fragment>
            <CssBaseline/>
            <Button variant='contained' color='primary'>Entrez</Button>
            <Grid container={true} spacing={24}>
                <Grid item={true} xs={6}>
                        <TextField
                            multiline={true}
                            rows={35}
                            fullWidth={true}
                            value={this.state.text}
                            onChange={ this.handleChange}/>
                </Grid>
                <Grid item={true} xs={6}>
                    <Paper>
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
                        </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
  }
}

export default (App);
