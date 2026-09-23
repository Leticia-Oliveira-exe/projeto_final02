import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule], // Módulos essenciais importados aqui
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  
  // Objeto que armazena os dados digitados na tela
  dadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  };

  // Injeta o HttpClient para fazer requisições e o Router para navegar após o cadastro
  constructor(private http: HttpClient, private router: Router) {}

  onCadastrar() {
    // Validação básica de senhas iguais no Front-end
    if (this.dadosCadastro.senha !== this.dadosCadastro.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // URL da sua API Node
    const urlApi = 'http://localhost:3001/cadastro';

    // Dispara a requisição POST para a API
    this.http.post(urlApi, this.dadosCadastro).subscribe({
      next: (resposta: any) => {
        alert(resposta.message); // Exibe "Usuário cadastrado com sucesso!"

        // 🔥 NOVA DINÂMICA: Guarda as informações do usuário para simular o login
        const usuarioLogado = {
          nome: this.dadosCadastro.nome,
          email: this.dadosCadastro.email
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

        // 🚀 REDIRECIONAMENTO: Altera o destino para a página Home
        this.router.navigate(['/home']); 
      },
      error: (erro) => {
        // Trata os erros de validação vindos do backend
        alert(erro.error?.message || "Erro ao conectar com o servidor.");
      }
    });
  } 
}