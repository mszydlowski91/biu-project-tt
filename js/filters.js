var app=angular.module('myApp',[]);
app.filter('myTableFilter', function(){
  /* array is first argument, each addiitonal argument is prefixed by a ":" in filter markup*/
  return function(dataArray, searchTerm){
      if(!dataArray ) return;
      /* when term is cleared, return full array*/
      if( !searchTerm){
          return dataArray
       }else{
           /* otherwise filter the array */
           var term=searchTerm.toLowerCase();
           return dataArray.filter(function( item){

              return item.id.toLowerCase().indexOf(term) > -1 || item.name.toLowerCase().indexOf(term) > -1;    
           });
       } 
  }    
});