# Regras de verificação e Análise de Requisitos

## Nomenclatura

Requisitos representados por:

- **RF**: Requisito funcional

Estes requisitos descrevem o comportamento do sistema, o que ele deve fazer. 

Eles são identificados com a sigla "RF" seguida de um número sequencial. Exemplo: RF-01, RF-02, RF-03, ...


- **RNF**: Requisito não funcional

Requisitos que descrevem atributos de qualidade do sistema. Eles são identificados com a sigla "RNF" seguida de um número sequencial. Exemplo: RNF-01, RNF-02, RNF-03, ...


## Regras

1. **Defina somente um requesito por vez (Seção:7.2.1)** 
CORRETO:
        O software DEVE permitir o registro dos membros do sistema.
        O software não DEVE permitir registros de dois Membros com os mesmos dados.
INCORRETO:
        O software DEVE permitir o registro de membros do Sistema e não DEVE permitir registros de dois Membros com os mesmos dados.  
        
              
2. **Evite frases grandes (Seção:7.2.3)**
CORRETO:
      O software DEVE permitir o registro dos membros do Sistema.
INCORRETO:
      O software DEVE permitir o registro dos membros do nosso renomado e aclamado Sistema de Viagens TravelPlanner.


3. **Respeito a estrutura de hierarquia de requesitos (Seção:7.2.5)**
Os requesitos requesitos não possuem o mesmo nível semântico. A tentativa foi de encaixar um novo requesito como um detalhamento de um requesito existente e, se não fosse possível, lidamos como um requesito Macro diretamente alterado em um caso de uso.


4. **Evitar Palavras Ambíguas  (Seção:7.2.2)**
No documento de requisitos, deve-se evitar o uso de palavras que possam gerar múltiplas interpretações, como "geralmente", "frequentemente", "possivelmente", "aproximadamente", pois essas palavras ornam os requesitos imprecisos e podem comprometer o desenvolvimento do Sistema

 CORRETO:  
        O sistema DEVE processar até 100 transações por segundo.
 INCORRETO:  
        O sistema DEVE processar aproximadamente 100 transações por segundo.
