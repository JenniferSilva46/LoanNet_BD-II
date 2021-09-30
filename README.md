# LoanNet_BD-II

Loan net (Rede de empréstimo), tem como objetivo facilitar o acesso a leitura no meio acadêmico, utilizando ferramentas virtuais para auxiliar e apoiar a prática da leitura entre usuários, ocasionando um benefício mútuo, tanto no que diz respeito ao desempenho educacional, quanto na socialização e interação entre pessoas que compartilham das mesmas preferências literárias.

## Inicialização

Para inicializar a API vocês deverão:

1. Clonar o repositório
2. Criar na pasta raiz um arquivo .env, que apresenta os parâmetros de configuração do banco
Exemplo do arquivo .env (trocar os valores das chaves pelos dados do seu banco):
```
   SECRET={palavra secreta}

   MONGO_HOST={IP do container}
   MONGO_PORT={Porta padrão 27017}
   MONGO_DATABASE={nome do banco} 

   PG_HOST=
   PG_PORT=
   PG_USER=
   PG_PASSWORD=
   PG_DATABASE=

   NEO4J_HOST=
   NEO4J_PORT=
   NEO4J_USER=
   NEO4J_PASSWORD= 
```
        
3.  ``` npm i ```
4.  ``` npm run dev ```
