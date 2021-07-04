import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteValidationGuard } from './auth/guards/route-validation.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'app',
    loadChildren: () => import("./protected/protected.module").then(m => m.ProtectedModule),
    canActivate: [RouteValidationGuard],
    canLoad: [RouteValidationGuard]
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
