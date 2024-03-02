[![core](https://github.com/joaovictorino/cleanarch-automated-tests-ts/actions/workflows/ci_core_bank.yaml/badge.svg)](https://github.com/joaovictorino/cleanarch-automated-tests-ts/actions/workflows/ci_core_bank.yaml) 
[![core/web](https://github.com/joaovictorino/cleanarch-automated-tests-ts/actions/workflows/ci_bank.yaml/badge.svg)](https://github.com/joaovictorino/cleanarch-automated-tests-ts/actions/workflows/ci_bank.yaml)

# Estória
Eu como cliente   
Gostaria de transferir dinheiro para a conta de outro cliente   

## Critérios de aceite
- Cliente deve informar número da conta de destino válida, valor, efetuar a transferência e receber um número de comprovante de transação
- O número da conta deve possuir 6 dígitos
- A conta de origem precisa ter saldo superior ou igual ao valor de transferência
- O valor de transferência deve ser maior que zero

# Instalações necessárias
[VSCode no Windows](https://www.youtube.com/watch?v=zPHbeSBvdkg)   
[Node v18 no Windows](https://www.youtube.com/watch?v=_R7cSg4um00)   
[Git no Windows](https://www.youtube.com/watch?v=_RcVweTCvRE)   
[Docker Desktop no Windows](https://www.youtube.com/watch?v=n0bxjsGi_BY)   
[Python 3 no Windows]()   

# Atividades

## Aula 01
1. [Iniciando o projeto Typescript](https://gist.github.com/joaovictorino/36f3b4a30382ef6faaecebb97640b26b)   
2. [Configurando Jest no projeto](https://gist.github.com/joaovictorino/bf9da4285212683805a9d5a1c6508ac6)   
3. [Criando nosso primeiro teste](https://gist.github.com/joaovictorino/c180345965668e36ce120999e1a90aee)   
4. [Executando a transpilação](https://gist.github.com/joaovictorino/709601eeca37e6d77a36726c42cba46c)   
5. [Criando o saque](https://gist.github.com/joaovictorino/f12fab9f4ecc092e26c24507a504e281)   
6. [Criando o depósito](https://gist.github.com/joaovictorino/c50dacb804843df7717420b8f3b001cd)   
7. [Saques não podem ser zerados](https://gist.github.com/joaovictorino/a5ae01b4d22765f7087d69e9dd536303)   
8. [Depósitos não podem ser zerados](https://gist.github.com/joaovictorino/3a65e5e6d8f42256b63492e75eb51642)   
9. [Testando outros fluxos de saque e depósito](https://gist.github.com/joaovictorino/74857497c704d667abd7f05cac536ec3)   
10. [Refatorando saque e depósito](https://gist.github.com/joaovictorino/15b963d6f1ba13d4d846049f7e551e8f)   
11. [Saques devem possuir saldo](https://gist.github.com/joaovictorino/6ac61220b8ab70067513d525f7854d32)   
12. [Número da conta com seis dígitos](https://gist.github.com/joaovictorino/334ee5785d7b5b19a782d56ffcf02dc2)   
13. [Número da conta com fluxos alternativos](https://gist.github.com/joaovictorino/732145f92c4e3a5164a74d23a6e5c104)   
14. [Conta, número da conta e refatoração](https://gist.github.com/joaovictorino/5393d166d79a7c2355f9857af856ec47)   
15. [Criando a transferência](https://gist.github.com/joaovictorino/7b3fc68e66d64ac950c402b92db40f41)   
16. [Criando o recibo de transferência](https://gist.github.com/joaovictorino/51cbe1bbf6db94563bf902657a82ef83)   
17. [Unindo recibo e transferência](https://gist.github.com/joaovictorino/39976a2704232a417292306fe434a6c0)   

## Aula 02
1. [Criando a camada de aplicação](https://gist.github.com/joaovictorino/fd80a207c35bef460cee34291022a3ca)   
2. [Validando fluxos alternativos de aplicação](https://gist.github.com/joaovictorino/50abe117aaa52633b88dec92b730b8fc)   
3. [Refatorando o teste de aplicação](https://gist.github.com/joaovictorino/52600cfea9e651fab9212e9a385bd175)   
4. [Trabalhando com mocks](https://gist.github.com/joaovictorino/61ad34bc4c5cc8d1048394381bb3757d)   
5. [Jest com cobertura de código](https://gist.github.com/joaovictorino/223c12ce0c3c3f185674362fba571667)   
6. [Rodando o SonarQube com Docker](https://gist.github.com/joaovictorino/85cbecc3d430a43e21ba80ccba5f78dc)   
7. [Analisando nosso código](https://gist.github.com/joaovictorino/e21f9d556c5e028940c92ddb5a790550)   
8. [Executando testes de mutação](https://gist.github.com/joaovictorino/23d6a53f634c141c34d068db01236a88)   
9. [Corrigindo nossos testes](https://gist.github.com/joaovictorino/be42a717ecdd69cc1a29768401899b72)   
10. [Testando com BDD](https://gist.github.com/joaovictorino/bd4db6b5c2a15eea8675099b343e7c62)   
11. [Subindo o código para o GitHub](https://gist.github.com/joaovictorino/da7cf1cf8cc42f76188525372c43ae9e)   
12. [Subindo o Jenkins com Docker](https://gist.github.com/joaovictorino/cc2a8531dc7dbc24a3d668e08c5967ba)   
13. [Executando os testes no Jenkins](https://gist.github.com/joaovictorino/b406ff57b0cb688453f0220438dcae03)   

## Aula 03
1. [Criando nosso projeto Next.js](https://gist.github.com/joaovictorino/90114d1e857741c88d9b79e1bfad489e)   
2. [Adicionando o Prisma](https://gist.github.com/joaovictorino/33806a01fbd971ac90789b31daa7d693)   
3. [Criando API de consulta de contas](https://gist.github.com/joaovictorino/d030cfc1b768ca2008c4c79fae21a5ea)   
4. [Testes da API de consulta de contas](https://gist.github.com/joaovictorino/f16a0f28168a328b35bc9c0894f61cca)   
5. [Mockando o prisma](https://gist.github.com/joaovictorino/d4537368c8c4e54a26fad39efb0b6164)   
6. [Criando API de criação de contas](https://gist.github.com/joaovictorino/c022d6ffca926eed9c98a00672390676)   
7. [Testes da API de criação de contas](https://gist.github.com/joaovictorino/4ebc43d10640fdf8fadcf48970e85742)   
8. [Criando e testando a API de transferência](https://gist.github.com/joaovictorino/3d60abbdd114d8cf6627e0e851b74f25)   
9. [Incluindo BDD nos testes de API](https://gist.github.com/joaovictorino/2a9f693fe15c52f47a7702d3dd56a850)   
10. [Criando testes de API com Postman](https://gist.github.com/joaovictorino/a509e1bfd9a8792d4c57e09d11abc3e0)   
11. [Executando Postman CLI](https://gist.github.com/joaovictorino/072d93621ab1b6f1a51576840bd92137)   
12. [Criando as telas iniciais](https://gist.github.com/joaovictorino/f53f451e6d4a208a7a9790149791d759)   
13. [Criando as outras telas](https://gist.github.com/joaovictorino/3556f45bfd21ddbef0dfe494620dc780)   
14. [Instalando e configurando o Playwright](https://gist.github.com/joaovictorino/0ade99dc775e9bf85997630ffc97de97)   
15. [Criando o teste do nosso projeto](https://gist.github.com/joaovictorino/ecac716b679f999f2337b01ccb4bd58f)   
16. [Criando através da interface](https://gist.github.com/joaovictorino/f356b173a965461b7b171c80a350003e)   
17. [Unindo BDD e Playwright](https://gist.github.com/joaovictorino/d7e5fb04e4b69a2df607ee43b2ed60e3)   

## Aula 04
1. [Conteinerizando a aplicação](https://gist.github.com/joaovictorino/49ba7aecce159ed15c078c7e4dde581b)   
2. [Iniciando os testes de desempenho](https://gist.github.com/joaovictorino/cac03fbb7efc8c09a5dc0b401495965b)   
3. [Testando a transferência por API](https://gist.github.com/joaovictorino/7ab933a49b2d27c5a2eeed80a631407c)   
4. [Trabalhando com massa de dados](https://gist.github.com/joaovictorino/5557d233d2dac9bb2f90c9ab1757f468)   
5. [Habilitando o Kubernetes local](https://gist.github.com/joaovictorino/466d0b885ed33d9c2f2d26b793bdf3a6)   
6. [Subindo a aplicação](https://gist.github.com/joaovictorino/47c3775911a1d83dcf1b6360701e6c05)   
7. [Instalando o Chaos Toolkit](https://gist.github.com/joaovictorino/e4278a346e27e07aa91b2fc00ed3cbb9)   
8. [Criando experimento de aplicação](https://gist.github.com/joaovictorino/d8ef42fd0545346a182590647710e695)   
9. [Criando experimento de banco](https://gist.github.com/joaovictorino/41c7b3380b854d86de0d470c14ca4308)   