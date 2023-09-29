import React from 'react'

export default function Dashboard() {
  return (
    <>
      <header>
        <h1>Banco XPTO</h1>
      </header>
      <div className="table">
        <div className="row header">
          <div className="cell">Ações</div>
        </div>
        <div className="row">
          <div className="cell" data-title="resource">
            <a href="contas">Acessar Contas</a>
          </div>
        </div>
      </div>
    </>
  )
}
  