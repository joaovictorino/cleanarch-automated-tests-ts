
  import React from 'react'
  
  export default function Dashboard() {
    return (
      <>
        <header>
          <h1>Dashboard</h1>
        </header>
        <div className="table">
          <div className="row header">
            <div className="cell">Resource</div>
          </div>
          
      <div className="row">
        <div className="cell" data-title="resource">
          <a href="contas">Contas</a>
        </div>
      </div>

        </div>
      </>
    )
  }
  