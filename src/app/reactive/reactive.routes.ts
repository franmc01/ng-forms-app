import { Routes } from '@angular/router';
import { BasicForm } from './pages/basic-form/basic-form';
import { ReactiveForm } from './pages/reactive-form/reactive-form';
import { SwitchForm } from './pages/switch-form/switch-form';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        component: BasicForm,
      },
      {
        path: 'dynamic',
        title: 'Dinamicos',
        component: ReactiveForm,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchForm,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
