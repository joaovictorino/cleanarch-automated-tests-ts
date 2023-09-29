
  import React from 'react'
  import prisma from '../../../prisma/prisma';
  import { Conta } from '@prisma/client';
  
  interface ContaShowProps {
    conta: Conta
  }

  export default function ContaShow({ conta } : ContaShowProps) {
    return (
      <>
        <header>
          <h1>Conta {conta.numero}</h1>
        </header>
        <div className="card">
          <p><strong>Numero:</strong> {conta.numero}</p><p><strong>Saldo:</strong> {conta.saldo}</p>
        </div>
        <footer>
          <a href="/contas" className="secondary-btn">Retornar</a>
        </footer>
      </>
    )
  }

  export async function getServerSideProps({ params }) {
    const conta = await prisma.conta.findUnique({
      where: { numero: params.id }
    });
    return { props: { conta } }
  }
  