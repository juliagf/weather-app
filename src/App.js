import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationListContainer from './containers/LocationListContainer';
import ForecastExtendedContainer from './containers/ForecastExtendedContainer';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './App.css';

const cities = [
  'Granada,es',
  'Lisbon,pt',
  'Brno,cz',
  'London,uk',
  'New York,us',
  'Sydney,au',
  'Oslo,no',
  'Prague,cz'
];


class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='title' color= 'inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationListContainer
                  cities={cities}
            ></LocationListContainer>
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className='details'>
                    <ForecastExtendedContainer ></ForecastExtendedContainer>
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>

    );
  }
}


export default App;

