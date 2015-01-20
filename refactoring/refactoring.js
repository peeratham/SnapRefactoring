function Scope($xml){
//   this.init();
  this.$xml = $xml;
  if(this.$xml.children('script').length > 0){
    this.$blocks = this.$xml.children('script').children();
  }
  this.rep = this.getXMLString();
  
}

Scope.prototype.getXMLString = function(){
  if(this.$xml[0] instanceof XMLDocument){
    return this.$xml.children('script')[0].outerHTML;
  }
  return this.$xml[0].outerHTML;
};

Scope.prototype.getScopeByID = function(id){
  node = this.getNodeByID(id);
  return this.getScopeOfNode(node);
};

Scope.prototype.getScopeOfNode = function($node){
  var current = $node;
  while(current[0].tagName != 'script'){
    current = current.parent();
  }
  if(current[0].parentNode.tagName == 'block'|| current[0].parentNode instanceof XMLDocument){
    current = current.parent();
  }
  return new Scope(current);
};

Scope.prototype.getNodeByID = function(id){
  return this.$xml.find('#'+id);
};

Scope.prototype.getChildScopes = function(){

  resultArray=[];
  innerScopes = this.$xml.children('script').children('block[s="doRepeat"],block[s="doForever"]');
  innerScopes.each(function(idx,el){
    var temp = new Scope($(el));
    resultArray.push(temp);
  });
  this.childScopes = resultArray;
  return this.childScopes;
};

Scope.prototype.lookup = function(name){
  declarations = this.$blocks.filter('block[s="doDeclareVariables"]');
  var result = declarations.find('l:contains("'+name+'")');
  if(result.length==0){
    return null;
  }
  return result;
};

Scope.prototype.getParentScope = function(){
  var current = this.$xml.parent();

  while(current[0].tagName != "script"){
    current = current.parent(); 
  }
  return new Scope(current.parent());
};

Scope.prototype.getDeclaredScope = function($node){
  var name = $node.attr('var')|| $node[0].textContent;
  var currentScope = this.getScopeOfNode($node);
  while(currentScope.lookup(name)==null){
    currentScope = currentScope.getParentScope();
  }
  return currentScope;
};

Scope.prototype.getDeclaredScopeByID = function(id){
  return this.getDeclaredScope(this.getNodeByID(id));
};



function Rename(){
}

Rename.prototype.localRename = function(scope, selectedScope, oldName, inputName){
  var newName = inputName;
  occurrences = Refactorer.prototype.findOccurrences(scope, oldName);
  
  
  occurrences.each(function(idx,el){
    el.declaredScope = scope.getDeclaredScope($(el));  
  });
  
  occurrences.each(function(idx,el){
    //precondition: if shadowing?
    if(el.declaredScope.$xml.is(selectedScope.$xml)){
      if(el.tagName == 'l'){
        el.textContent = newName;
      } else if( el.tagName == 'block'){
        $(el).attr('var',newName);
      }

    }
    
  });
  return scope.getXMLString();
};


function Refactorer(){}


Refactorer.prototype.findOccurrences = function(scope, name){
  sc = scope;
  resultOccurs = scope.$xml.find('block[var='+name+'], l:contains('+name+')');
  return resultOccurs;
};


function xmlToString(xmlData) {
  var xmlString;
  //IE
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  }
  // code for Mozilla, Firefox, Opera, etc.
   else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
}
// // http://api.jquery.com/multiple-attribute-selector/
// // http://api.jquery.com/category/selectors/attribute-selectors/