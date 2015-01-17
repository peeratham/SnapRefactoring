function Scope(){
  this.init();
}

Scope.prototype.init = function(){
  this.childScopes = [];
  this.parentScope = null;
};

Scope.prototype.setScope = function(element){
  this.scopeObject = element;
  this.xmlString = ide.serializer.serialize(this.scopeObject);
  this.xmlDoc = $.parseXML(this.xmlString);
};

Scope.prototype.setStringScope = function(string){
  this.xmlString = string;
  this.xmlDoc = $.parseXML(string);
  this.processScopes();
};

Scope.prototype.getScope = function(){
  return this.scopeObject;
};

Scope.prototype.toXMLString = function(){
  return this.xmlString;
};

Scope.prototype.getSelectedScope = function(id){
  var current = $(this.xmlDoc).find('#'+id)[0];
  while(current.tagName != 'script'){
    current = current.parentNode;
  }
  if(current.parentNode.tagName == 'block'){
    current = current.parentNode;
  }
  return current;
};

Scope.prototype.getSelectedElementString = function(){
  return $(this.xmlDoc).find('#selected')[0].outerHTML;
};

Scope.prototype.getAllElements = function(){
  return $(this.xmlDoc).find('block');
};

Scope.prototype.processScopes = function(){
  //process identifiers in current scope
  //e.g. script variable, function
  this.context = $(this.xmlDoc).children('script');
  this.scope = this.context.children('block[s="doDeclareVariables"]');

  innerScopes = this.context.children('block[s="doRepeat"],block[s="doForever"]');
  //for each child make it a scope object
  var resultArray=[];
  var thisScope = this;
  innerScopes.each(function(idx,el){
    var temp = new Scope();
    temp.setStringScope($(el).children('script')[0].outerHTML);
    temp.parentScope = thisScope;
    resultArray.push(temp);
  });
  this.childScopes = resultArray;

};

Scope.prototype.getChildScopes = function(){
  return this.childScopes;
};

Scope.prototype.lookup = function(name){
  var scope = this.scope;
  var result = scope.find('l:contains("'+name+'")');
  if(result.length==0){
    return null;
  }
  return result;
};

Scope.prototype.getParentScope = function(){
  return this.parentScope;
};

Scope.prototype.getDeclaredScope = function(){

};


function scopeToString(node){
  return node.outerHTML;
}

function getSelector(node){
  return node.getAttribute('s');
}


function Refactorer(){
  this.init();
}

Refactorer.prototype.init = function(){
  this.scope = new Scope();
};

Refactorer.prototype.setScope = function(element){
  this.scope.setScope(element);
};

Refactorer.prototype.getCurrentContextString = function(){
  return this.scope.getScopeXML();
};

Refactorer.prototype.getScopeObject = function(){
  return this.scope;
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
// http://api.jquery.com/multiple-attribute-selector/
// http://api.jquery.com/category/selectors/attribute-selectors/