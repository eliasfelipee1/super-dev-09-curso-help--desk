import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketCadastro } from '../../../models/tickets.model';
import { TicketService } from '../../../services/ticket.service';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioResposta } from '../../../models/usuarios.model';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  ticketService = inject(TicketService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  usuarios = signal<UsuarioResposta[]>([]);


  setores = [
    {
      "titulo": "TI",
      "descricao": "TI"
    },
    {
      "titulo": "RH",
      "descricao": "Recursos Humanos"
    },
    {
      "titulo": "FINANCEIRO",
      "descricao": "Financeiro"
    },
    {
      "titulo": "ADMINISTRATIVO",
      "descricao": "Administrativo"
    },
    {
      "titulo": "MANUTENCAO",
      "descricao": "Manutenção"
    }
  ]



  ticket: TicketCadastro = {
    descricao: "",
    idUsuario: null,
    setor: "",
    titulo: ""
  }

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.usuarioService.listar().subscribe({
      next: usuarios => this.usuarios.set(usuarios),
      error: erro => {
        console.error(erro);
        alert("Nao foi possivel listar os usuarios");
      }
    })

  }

  cadastrar() {
    // chamar o service que fara a request para a api cadastrar o ticket
    this.ticketService.cadastrar(this.ticket).subscribe({
      next: () => {
        alert("Ticket cadastrado com sucesso")
        this.router.navigate(["/tickets"]);
      },
      error: erro => {
        console.error(erro)
        alert("Nao foi possivel cadastrar o ticket");
      }

    })
  }

}






