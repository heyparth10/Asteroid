import React from 'react';
import { Container, Typography, AppBar, Toolbar, Paper } from '@mui/material';
import withRouter from './withRouter';

interface asteroidProps {
    id: string;
    name: string;
    location: any ;
    name_limited?: string;
    absolute_magnitude_h?: number;
    is_potentially_hazardous_asteroid?: boolean;
    estimated_diameter?: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
      miles: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
  }

class Details extends React.Component<asteroidProps> {
  render() {
    const asteroidData = this.props.location.state as asteroidProps;

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" onClick={() => window.location.href = '/'}>
              Go Back
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Asteroid Details
            </Typography>
            
            {asteroidData && (
              <>
                <Typography>ID: {asteroidData.id}</Typography>
                <Typography>Name: {asteroidData.name}</Typography>
                <Typography>Name (Limited): {asteroidData.name_limited}</Typography>
                <Typography>Absolute Magnitude (H): {asteroidData.absolute_magnitude_h}</Typography>
                <Typography>
                  Potentially Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                </Typography>
                <Typography>
                  Estimated Diameter (km): {asteroidData.estimated_diameter?.kilometers.estimated_diameter_min} - 
                  {asteroidData.estimated_diameter?.kilometers.estimated_diameter_max}
                    </Typography>
                        <Typography>
                            Estimated Diameter (miles): {asteroidData.estimated_diameter?.miles.estimated_diameter_min} -
                                {asteroidData.estimated_diameter?.miles.estimated_diameter_max}
                       </Typography>
             </>
            )}
         </Paper>
        </Container>
</>
);
}
}

export default withRouter(Details);
