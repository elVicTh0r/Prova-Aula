import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';

interface ViaCepDTO {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
}

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  private readonly http = inject(HttpClient);

  buscar(cep: string): Observable<Endereco | null> {
    const digitos = cep.replace(/\D/g, '');

    if (digitos.length !== 8) {
      return throwError(() => new Error('O CEP deve conter 8 dígitos.'));
    }

    return this.http.get<ViaCepDTO>(`https://viacep.com.br/ws/${digitos}/json/`).pipe(
      map(dto => dto.erro
        ? null
        : {
            rua: dto.logradouro ?? '',
            bairro: dto.bairro ?? '',
            cidade: dto.localidade ?? '',
            uf: dto.uf ?? ''
          }
      )
    );
  }
}
