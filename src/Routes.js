import App from './App';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CardPage from './pages/card/CardPage';
import AddCardPage from './pages/card/AddCardPage';
import EditCardPage from './pages/card/EditCardPage';

import FormPage from './pages/form/FormPage'
import AddFormPage from './pages/form/AddFormPage'
import EditFormPage from './pages/form/EditFormPage'
import ViewFormPage from './pages/form/ViewFormPage'

import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...DashboardPage,
        path: '/',
        exact: true
      },
      {
        ...CardPage,
        path: '/card-list',
      },
      {
        ...AddCardPage,
        path: '/add-card',
      },
      {
        ...EditCardPage,
        path: '/edit-card/:id',
      },
      {
        ...FormPage,
        path: '/form-list'
      },
      {
        ...AddFormPage,
        path: '/add-form',
      },
      {
        ...EditFormPage,
        path: '/edit-form/:id',
      },
      {
        ...ViewFormPage,
        path: '/external/demoform/:id',
      },
      {
        ...LoginPage,
        path: '/login'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
