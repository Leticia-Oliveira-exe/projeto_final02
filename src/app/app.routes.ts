import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Explorar } from './pages/explorar/explorar';
import { CrieComponent } from './pages/crie/crie'; // Adicionado o import da sua página

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "login", component: Login },
    { path: "cadastro", component: Cadastro },
    { path: "explorar", component: Explorar },
    { path: "crie", component: CrieComponent }, // Adicionada a rota para a página de criar API
    { path: "", component: Login }
];