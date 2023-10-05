import React from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ContaIndex() {
  const { data, error } = useSWR('/api/contas', fetcher);

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando ...</div>

  return (
    <>
      <header>
        <h1>Contas</h1>
        <a href="/contas/criar" className="secondary-btn">
          + Criar nova conta
        </a>
      </header>
      <div className="table">
        <div className="row header">
          <div className="cell">Número</div>
          <div className="cell">Saldo</div>
          <div className="cell">Ações</div>
        </div>
        { data.map((conta) => (
          <div className="row" key={conta.numero}>
            <div className="cell" data-title="numero">{conta.numero}</div>
            <div className="cell" data-title="saldo">R$ {conta.saldo.toFixed(2)}</div>
            <div className="cell actions" data-title="actions">
              <div className="action-buttons">
                <a href={`contas/${conta.numero}`} data-testid={`${conta.numero}-ver`} className="secondary-btn small">
                  &#128065; Ver
                </a>
                <a href={`contas/${conta.numero}/transferir`} data-testid={`${conta.numero}-transferir`} className="secondary-btn small">
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
