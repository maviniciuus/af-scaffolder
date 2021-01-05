# af-scaffolder v2
![GitHub package.json version](https://img.shields.io/github/package-json/v/maviniciuus/af-scaffolder)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/af-scaffolder) ![npm](https://img.shields.io/npm/dy/af-scaffolder) 
[![](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/maviniciuus/af-scaffolder) 
[![](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/maviniciuus/af-scaffolder) 
![GitHub Repo stars](https://img.shields.io/github/stars/maviniciuus/af-scaffolder)
![GitHub issues](https://img.shields.io/github/issues/maviniciuus/af-scaffolder)


## Sobre
Uma biblioteca para manter design patterns. Com a estrutura definida em JSON, você cria o esqueleto e gera os arquivos baseados em templates caso queira. Evite erros de copiar e colar, o código é gerado automaticamente a partir do template.

## Para que Serve?
Quantas vezes você começa módulos e aplicativos novos em um sistema. Esse trabalho é repetitivo e sucestível a erros. Defina a estrutura de arquivos e pastas do módulo em json, e a partir desse json crie os arquivos e pastas.

Agora imagine que você pode definir templates básicos, com códigos inicias e esses templates são gerados dinamicamentes.

> Isso é possível!

Basta definir a estrutura e criar os templates que a mágica acontece. Seu código é gerado, baseado no nome de módulo que você forneceu.

## Comece por Aqui:
Instale globalmente via npm:
```
npm install -g af-scaffolder
```

## Mão na massa:

### Estrutra de Arquivos e Pastas
Com o `af-scaffolder` instalado, basta rodar em qualquer terminal:
#### Comando
```
scaff -s ../path/to/awesome/scheme.json -n SampleModule
```
#### Schema
Onde o conteudo do arquivo `scheme.json` é:
```
[
  {
    "name": "{{lowercase pack_name}}",
    "children": [
      {
        "name": "controllers",
        "children": [
          {
            "name": "Controller{{capitalize pack_name}}.js"
          }
        ]
      },
      {
        "name": "models",
        "children": [
          {
            "name": "Model{{capitalize pack_name}}.js"
          }
        ]
      }
    ]
  }
]
```
#### Resultado
E o resultado é:
```
    .
    ├── ...
    ├── SampleModule                       # Pasta raiz com o nome do pack
    │   ├── controllers                    # Pasta definida para receber os controllers do módulo
    │   └──── ControllerSampleModule.js    # Controller principal do módulo
    │   ├── models                         # Pasta definida para receber os models do módulo
    │   └──── ModelSampleModule.js         # Model principal do módulo
    └── ...
```
