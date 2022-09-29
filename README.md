
# API-pure-node

> API construída sem dependências, explorando oque o ambiente NodeJS tem a oferecer. 

## Interface
Interface simples, com endpoints de get, post, put e delete, seguindo um 
CRUD padrão.
>  Todos os nomes dos campos nas requisições seguem o padrão de **Camel Case**, onde a divisão entre palavras ocorre com a capitalização da primeira letra da palavra.

>  Exemplo:
>  ``"bookName":"nome de teste"``


## Installation

Após clonar o repositório da API, usar o comando:

```bash
npm run init
```
Que é responsável por baixar as tipagens do node, e a dependência concurrenly, além de buildar e iniciar o projeto.

> Adicionar o certificado e a chave do certificado SSL, para configuração do HTTPS

## Usage

Iniciar o projeto e fazer requisições para os endpoints com os devidos parâmetros.
### GET
![foto do código](https://media.discordapp.net/attachments/734174844681453670/1020826778559848540/unknown.png?width=1025&height=387)
> Não é necessário preencher o body da requisição, por padrão serão trazidos todos os livros da lista.
 ### POST
![foto do código](https://media.discordapp.net/attachments/734174844681453670/1020830095092498522/unknown.png?width=1025&height=461)
> É necessário informar o **author**(autor) e o **bookName**  (nome do livro).
### PUT
![foto do código](https://media.discordapp.net/attachments/734174844681453670/1020830842706219071/unknown.png?width=1025&height=459)
> É necessário informar o **author** (autor) e o **bookName** (nome do livro) do livro que será modificado, e os novos campos: **newAuthor**(novo autor) e o **newBookName** (novo nome do livro).
### DELETE
![foto do código](https://media.discordapp.net/attachments/734174844681453670/1020830842706219071/unknown.png?width=1025&height=459)
> É necessário informar o **author** (autor) e o **bookName** (nome do livro) que será deletado.

## License
[MIT](https://choosealicense.com/licenses/mit/)
