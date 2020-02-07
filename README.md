# Google Apps Script Converter
Este projeto tem o intuito de utilizar a api [convertapi](https://www.convertapi.com/) para converter arquivos em pdf para jpg ou arquivos de imagens para pdf. A conversão é feita de forma automática ao adicionar um arquivo de imagem ou pdf a uma pasta do google drive pré-configurada, o resultado estará disponível em outra pasta pré-configurada.

# Como configurar:
1- Entre na [IDE do Google](http://script.google.com) e clique em Novo Projeto. Será aberta uma página para que seja digitado o código.<br>
2 - Cole o código disponível no arquivo converter.gs deste repositório.<br>
3 - É necessário definir a pasta de entrada e de saída. Todos os arquivos de imagem ou pdf da pasta de entrada serão convertidos. Para definir basta alterar o nome das pastas nas linhas 6 e 7.
4 - É necessário definir um ID de usuário no [convertapi](https://www.convertapi.com/). Para isso basta clicar no link e criar uma conta. Será informado um código que deve ser colocado na linha 8.
5 - É necessário definir até quanto tempo um arquivo deve ser considerado um <b>Arquivo Novo</b>. Na linha 44 digite em segundos esse tempo. Por padrão está 60 segundos (1 minuto).

# Executando:
1 - Existem duas formas de execução. Uma será executada apenas uma vez, isto é, será verificado uma vez se há arquivos novos, se houverem serão convertidos e enviados para a pasta de saída. A outra forma é de forma automática por meio de uma rotina. Você consegue definir um tempo para que o código seja executado automaticamente novamente. Desta forma, toda vez que você adicionar um arquivo novo este será convertido automaticamente.
2 - Primeira forma(executando uma única vez): Selecione a função "converter" na caixa de seleção e clique no botão de executar .
3 - Segunda forma(criando a rotina): Selecione a função "myFunction" na caixa de seleção e clique no botão de executar. Para alterar o tempo de execução basta alterar o número 1 (1 minuto) na linha 3 para a quantidade de minutos desejada. Para finalizar a execução da rotina é necessário clicar no ícone de relógio do lado esquerdo do botão executar (Acionadores do projeto atual) e em seguida excluir a rotina clicando nos 3 pontinhos no canto direito da rotina.