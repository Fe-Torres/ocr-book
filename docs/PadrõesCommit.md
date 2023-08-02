## Padrões de Commits

<tipo>[escopo opcional]: <descrição->

- chore: Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas.
- feat: São adições de novas funcionalidades ou de quaisquer outras novas implantações ao código.
- fix: Essencialmente definem o tratamento de correções de bugs.
- refactor: Utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada.
- docs: Inclusão ou alteração somente de arquivos de documentação.
- perf: Uma alteração de código que melhora o desempenho.
- style: Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.
- test: Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD).
- build: Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm).
- ci: Mudanças em nossos arquivos e scripts de configuração de CI (exemplo de escopos: Travis, Circle, BrowserStack, SauceLabs).
- env: Utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.

Exemplos:

- chore: add commitlint e husky
- chore(eslint): obrigar o uso de aspas duplas no jsx
- refactor: refatorando a tipagem
- feat: add axios / buscando e tratando os dados
- feat(page/home): criando o roteamentento no next
