function myFunction() {
  //CRIANDO TRIGGER QUE SERÁ EXECUTADO A CADA MINUTO
  ScriptApp.newTrigger('converter').timeBased().everyMinutes(1).create();
}
//CONFIGURANDO AS PASTAS DE ENTRADA E SAÍDA DE ARQUIVOS
var input_folder_name = "converter";
var output_folder_name = "out";
var user_convertapi = "YOUR_CODE; //ADICIONE O SEU CÓDIGO DE USUÁRIO AQUI
function converter(){ 
  var folders = DriveApp.getFolders();
  var input_folder;
  var output_folder;
  //PROCURANDO PELAS PASTAS DE ENTRADA E SAÍDA INFORMADAS
  while(folders.hasNext()){
    var f = folders.next();
    if(f.getName() == input_folder_name){
      input_folder = f;
    }
    if(f.getName() == output_folder_name){
      output_folder = f;
    }
  }
  //PEGANDO OS ARQUIVOS DA PASTA DE ENTRADA E SAÍDA
  var files = input_folder.getFiles();
  var out_files = output_folder.getFiles();
  //PASSANDO POR TODOS OS ARQUIVOS DA PASTA DE ENTRADA
  while(files.hasNext()){
    //var out_files = output_folder.getFiles();
    var file = files.next();
    Logger.log(file.getMimeType());
    //VERIFICA SE O ARQUIVO EM QUESTÃO É UMA IMAGEM OU PDF PARA QUE AÍ SIM SEJA FEITA A CONVERSÃO
    if(!file.getMimeType().toString().indexOf("image/") || !file.getMimeType().toString().indexOf("application/pdf")){
      convert(file, output_folder);
    }
  }
}

function convert (file, output_folder){
  var converted = false;
  var in_file_name = file.getName().split('.')[0];
  var origin_format = file.getName().split('.')[1];
  var current_time = new Date().valueOf();
  //AQUI É VERIFICADO SE O ARQUIVO EM QUESTÃO É NOVO (ULTIMA MODIFICAÇÃO TEM MENOS DE 60 SEGUNDOS NA PASTA)
  var segundos_new_file = 60;
  var is_new_file = current_time > (file.getLastUpdated().valueOf()+(segundos_new_file*1000))? false:true;
  
  //VERIFICA SE A FLAG MOSTRA QUE O ARQUIVO É NOVO
  if(is_new_file){
    //VERIFICA O FORMATO DO ARQUIVO DE ORIGEM PARA DETERMINAR O FORMATO DE SAÍDA
    var converted_format = origin_format == "pdf"? "jpg":"pdf";
    var url = 'https://v2.convertapi.com/convert/'+origin_format+'/to/'+converted_format+'?Secret='+user_convertapi;
    var payload = {
      File: file.getBlob()
    };
    var options = {
      method: "POST",
      payload: payload,
      muteHttpExceptions : true
    };
    var res = UrlFetchApp.fetch(url, options);
    if(res.getResponseCode() == 200){
      //RECEBE TODA A RESPOSTA DA API
      var dataAll = JSON.parse(res.getContentText());
      var converted_file = Utilities.base64Decode(dataAll["Files"][0]["FileData"], Utilities.Charset.UTF_8);
      //SE O FORMATO DE ORIGEM FOR PDF A SAÍDA SERÁ EM JPG, SE FOR ALGUMA IMAGEM SERÁ EM PDF
      var file_blob = origin_format == "pdf"? Utilities.newBlob(converted_file, "image/jpeg", in_file_name+'.jpg'):Utilities.newBlob(converted_file, "application/pdf", in_file_name+'.pdf');
      output_folder.createFile(file_blob);
    }
  }
}