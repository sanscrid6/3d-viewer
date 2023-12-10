import LocationPage from '../pages/location/LocationPage';
import LocationsPage from '../pages/locations/LocationsPage';
import MainPage from '../pages/main/MainPage';

export const routes = [
  {
    path: '/locations',
    element: <LocationsPage />,
    name: 'Локации',
    isAuthed: true,
  },
  {
    path: '/locations/:id',
    element: <LocationPage />,
    name: 'Main page',
    isAuthed: false,
    notShow: true,
  },
  {
    path: '/',
    element: <MainPage />,
    name: 'Main page',
    isAuthed: false,
  },
];
