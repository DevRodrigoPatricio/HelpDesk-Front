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
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent  implements OnInit{
  chamado:Chamado= {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] =[]
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(private clienteService: ClienteService,
    private tecnicoService: TecnicoService,private chamadoService: ChamadoService,
    private toast:ToastrService,
    private route: Router,
    private router: ActivatedRoute){
  }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.router.snapshot.paramMap.get('id')
    this.findById()
  }



  findAllClientes():void{
    this.clienteService.finAll().subscribe(resposta => {
      this.clientes = resposta
    })
  }

  findAllTecnicos():void {
    this.tecnicoService.finAll().subscribe(resposta => {
      this.tecnicos = resposta
    })
  }

  validaCampos():boolean {
    return this.prioridade.valid &&
           this.status.valid  &&
           this.titulo.valid &&
           this.descricao.valid &&
           this.tecnico.valid &&
           this.cliente.valid
  }

  findById():void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
    },ex => {
      this.toast.error(ex.error.error)
    })
  }

  update():void{
    this.chamadoService.update(this.chamado).subscribe(resposta=> {
        this.toast.success('Chamado atualizado com sucesso', 'Atualizar chamado');
        this.route.navigate(['chamados'])
    },ex => {
      this.toast.error(ex.error.error)
    })
  }


  retornaStatus(status: any):string{
    if(status =='0'){
      return 'ABERTO'
    }else if (status =='1'){
      return 'EM ANDAMENTO'
    }else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any):string{
    if(prioridade =='0'){
      return 'BAIXA'
    }else if (prioridade =='1'){
      return 'MEDIA'
    }else {
      return 'ALTA'
    }
  }
}
