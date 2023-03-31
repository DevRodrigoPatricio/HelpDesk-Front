import { ToastrService } from 'ngx-toastr';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chamdo-read',
  templateUrl: './chamdo-read.component.html',
  styleUrls: ['./chamdo-read.component.css']
})
export class ChamdoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  constructor(private chamadoService: ChamadoService,
    private toast: ToastrService,
    private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.chamado.id = this.router.snapshot.paramMap.get('id')
    this.findById()
  }


  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MEDIA'
    } else {
      return 'ALTA'
    }
  }
}
