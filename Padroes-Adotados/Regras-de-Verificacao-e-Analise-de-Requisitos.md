# Regras de verificação e Análise de Requisitos

## Nomenclatura

Requisitos representados por:

- **RF**: Requisito funcional

Estes requisitos descrevem o comportamento do sistema, o que ele deve fazer. 

Eles são identificados com a sigla "RF" seguida de um número sequencial. 

Exemplo: RF-01, RF-02, RF-03, ...


- **RNF**: Requisito não funcional

Requisitos que descrevem atributos de qualidade do sistema. Eles são identificados com a sigla "RNF" seguida de um número sequencial.

Exemplo: RNF-01, RNF-02, RNF-03, ...


## Regras

1. **Corretude** 

-Cada requisito deve ser expresso em linguagem clara e objetiva, evitando termos como "fácil", "rápido" ou "eficiente", que são subjetivos.

-Os requisitos devem ser quantificáveis sempre que possível (por exemplo, "o sistema deve responder a uma requisição em no máximo 2 segundos").

-Os requisitos devem ser verificáveis, ou seja, deve ser possível definir testes para comprovar se foram atendidos.

-A terminologia utilizada nos requisitos deve ser consistente e alinhada com o glossário do projeto.

2. **Abrangência**

-Os requisitos devem cobrir todas as funcionalidades do sistema, desde as mais básicas até as mais complexas.

-Os requisitos devem incluir as interfaces do sistema (usuário, hardware, outros sistemas).

-Os requisitos devem considerar os dados que serão manipulados pelo sistema (tipos, formatos, volumes).

-Os requisitos devem especificar os limites de operação do sistema (por exemplo, número máximo de usuários simultâneos).

3. **Rastreabilidade**

-Cada requisito deve ter um identificador único.

-A origem de cada requisito deve ser documentada (por exemplo, solicitação do cliente, análise de mercado).

-Os requisitos devem ser vinculados aos casos de uso, cenários de teste e itens de trabalho do projeto.

-Deve ser possível rastrear as mudanças em cada requisito ao longo do tempo.

4. **Coerência**
-Os requisitos não devem se contradizer.
-Os requisitos devem ser consistentes com a arquitetura do sistema.
-Os requisitos devem ser alinhados com as metas do projeto.
-Os requisitos devem ser analisados para identificar possíveis conflitos ou redundâncias.
