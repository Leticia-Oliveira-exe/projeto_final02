import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
}) // 👈 Aqui estava o erro, agora está fechado corretamente!
export class Login {
  
  dadosLogin = {
    email: '',
    senha: '',
    termos: false
  };

  constructor(private http: HttpClient, private router: Router) {}

onLogin() {
    const { email, senha, termos } = this.dadosLogin;

    // Apenas para debug: vai mostrar no console (F12) o que o botão está capturando
    console.log('Tentando logar com:', { email, senha, termos });

    if (!email || !senha) {
      alert("O campo de email ou senha não foi preenchido!");
      return;
    }

    // Deixamos a validação do switch mais flexível caso o Angular entenda como undefined
    if (!termos && termos !== undefined) {
      alert("Você precisa aceitar os termos de uso para continuar.");
      return;
    }

    // 1. Validação do administrador padrão
    if (email === 'admin@email.com' && senha === '123456') {
      const usuarioAdmin = { id: 1, nome: "admin", email: "admin@email.com" };
      localStorage.setItem('usuario', JSON.stringify(usuarioAdmin));
      alert("Bem-vindo de volta, admin!");
      this.router.navigate(['/home']).catch(err => alert("Erro: A rota '/home' não existe no seu projeto!"));
      return;
    }

    // 2. Verificação no LocalStorage pelo email cadastrado
    const usuarioSalvoNoCadastro = localStorage.getItem('usuario');

    if (usuarioSalvoNoCadastro) {
      const usuario = JSON.parse(usuarioSalvoNoCadastro);

      // CORREÇÃO: Compara o email digitado com o salvo (independente de maiúsculas/minúsculas)
      if (usuario.email.toLowerCase().trim() === email.toLowerCase().trim()) {
        alert("Bem-vindo de volta!");
        
        // O .catch() serve para te avisar se o redirecionamento falhou porque a página home não foi criada nas rotas
        this.router.navigate(['/home']).catch(err => {
          console.error(err);
          alert("Logado com sucesso! Mas a rota '/home' não foi encontrada nas suas rotas do Angular.");
        });
        return;
      }
    }

    alert("O e-mail informado não foi cadastrado ou a senha está incorreta!");
  }
}