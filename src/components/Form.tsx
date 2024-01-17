import React from 'react';
import { Button, TextField, Container, Typography, AppBar, Toolbar } from '@mui/material';
import withRouter from './withRouter';


interface FormState {
  asteroidId: string;
  errorMessage: string | null;
}

interface FormProps {
  navigate: (url: string, state?: any) => void;
}

class Form extends React.Component<FormProps, FormState> {
  API_KEY = "57gD9WS7umDmG4nj41sRvbiZseMG2Za0iS4mGg2O";

  constructor(props: FormProps) {
    super(props);
    this.state = {
      asteroidId: '',
      errorMessage: null,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ asteroidId: e.target.value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { asteroidId } = this.state;
  
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${this.API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      this.props.navigate('/details', { state: data });
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.setState({ errorMessage });
    }
  };
  

  handleRandomData = async () => {
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${this.API_KEY}`);
      const data = await response.json() ;
      const asteroids = data.near_earth_objects;
      const randomAsteroid = asteroids[Math.floor(Math.random() * asteroids.length)];
      this.props.navigate('/details', { state: randomAsteroid });
    } catch (error) {
      console.error('Error fetching random asteroid data:', error);
    }
  };

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Asteroid Search
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Enter Asteroid ID
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Asteroid ID"
              margin="normal"
              name="asteroidId"
              required
              value={this.state.asteroidId}
              onChange={this.handleInputChange}
            />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" style={{ marginTop: '10px' }} onClick={this.handleRandomData}>
              Random Asteroid
            </Button>
            <Container maxWidth="sm" style={{ marginTop: '20px' }}>
                 {this.state.errorMessage && (
            <div style={{ color: 'red' }}>
            Error: Enter valid ID
          </div>
        )}
      </Container>
          </form>
        </Container>
      </>
    );
  }
}

export default withRouter(Form);
