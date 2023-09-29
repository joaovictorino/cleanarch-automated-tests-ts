
  import React from 'react'
  import prisma from '../../prisma/prisma';
  import { Conta } from '@prisma/client';
  
  interface ContaIndexProps {
    contas: Conta[]
  }

  export default function ContaIndex({ contas }: ContaIndexProps) {
    function handleDelete(id: string) {
      fetch(`/api/contas/${id}`, { method: 'DELETE' }).then(() => {
        alert('Conta deleted');
        location.reload();
      });
    }

    return (
      <>
        <header>
          <h1>Contas</h1>
          <a href="/contas/create" className="secondary-btn">
            + Criar nova conta
          </a>
        </header>
        <div className="table">
          <div className="row header">
            <div className="cell">Número</div>
            <div className="cell">Saldo</div>
            <div className="cell">Ações</div>
          </div>
          {contas.map((conta) => (
            <div className="row" key={conta.numero}>
              <div className="cell" data-title="numero">{conta.numero}</div>
              <div className="cell" data-title="saldo">{conta.saldo}</div>
              <div className="cell actions" data-title="actions">
                <div className="action-buttons">
                  <a href={`contas/${conta.numero}`} className="secondary-btn small">
                    &#128065; Ver
                  </a>
                  <a href={`contas/${conta.numero}/edit`} className="secondary-btn small">
                    &#9998; Transferir
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <a href="/" className="secondary-btn">Retornar</a>
        </footer>
      </>
    )
  }
  
  export async function getServerSideProps() {
    const contas = await prisma.conta.findMany();
    return { props: { contas } }
  }
  