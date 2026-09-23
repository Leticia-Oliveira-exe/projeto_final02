import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent implements OnInit {
  
  nomeUsuario: string = 'Usuário';
  fotoPerfil: string | null = null;
  isSidebarOpen: boolean = false; // Ajustado para bater com seu HTML original

  constructor(private router: Router) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      // Pega o nome ou o email digitado no cadastro
      this.nomeUsuario = usuario.nome || usuario.email || 'Usuário';
      this.fotoPerfil = localStorage.getItem('foto_perfil');
    }
  }

  // Ajustado para o nome da sua função original
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onFotoSelecionada(event: any) {
    const arquivo = event.target.files;
    if (arquivo && arquivo.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPerfil = reader.result as string;
        localStorage.setItem('foto_perfil', this.fotoPerfil);
      };
      reader.readAsDataURL(arquivo[0]);
    }
  }

  onSair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}