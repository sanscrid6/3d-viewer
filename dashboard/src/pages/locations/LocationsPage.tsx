import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import styles from './locations-page.module.css';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  $locations,
  getCurrentLocationFx,
  getLocationsFx,
} from '../../state/location';
import { useEffect } from 'react';
import { openModal } from '../../state/modal';
import { ModalType } from '../../state/modal/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function LocationsPage() {
  const locations = useUnit($locations);

  const navigate = useNavigate();

  useEffect(() => {
    getLocationsFx();
  }, []);

  function showLocation(id: string) {
    return async () => {
      await getCurrentLocationFx(id);
      navigate(`/locations/${id}`);
    };
  }

  function addLocation() {
    openModal({ type: ModalType.AddLocation });
  }

  return (
    <div className={styles.contaner}>
      <Grid container spacing={5}>
        {locations.map(({ id, name, description }, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345, maxHeight: 280 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description.slice(0, 200)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={showLocation(id)}>
                    Подробнее
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={4}>
          <Card className={styles.addCard}>
            <AddCircleOutlineIcon
              className={styles.icon}
              onClick={addLocation}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default LocationsPage;
