import { Routes } from "@angular/router";
import { SignUp } from "./pages/sign-up/sign-up";

const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: SignUp
      },
      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
]

export default authRoutes;