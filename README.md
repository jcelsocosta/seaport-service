# seaport-service

Objetivo: Criar e gerenciar a movimentação de contêineres, simulando operações que são realizadas em um porto maritimo

Requisitos Funcionais
- O operador pode cadastrar, atualizar, deletar e visualizar um ou mais contêineres.
- O operador pode cadastrar, atualizar, deletar e visualizar um ou mais movimentações dos contêineres.

Requisitos Não Funcionais:
- O servidor deve ser implementado em Java
- Deve-se usar postgres para um banco de dados relacional
- Deve-se usar React.js com typescrpit para o frontend

Regras de Negócio:
- O númedo do contêiner precisa ser único e deve seguir o seguinte formato (4 letras e 7 números. Ex: ABCD1234567)
- O tipo de contêiner pode ser apenas dois. (20/40)
- A categoria do contêiner pode ser importação/exportação
- O tipo de movimentação precisa ser embarque, descarga, gate in, gate out, reposicionamento, pesagem ou scanner
