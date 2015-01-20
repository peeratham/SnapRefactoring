// Extends refactoring to BlockMorph
TemplateSlotMorph.prototype.toXML = function (serializer) {
   if(this.inputs()[0].isTarget){
    return serializer.format('<l id="selected">$</l>', this.contents());
   }
    return serializer.format('<l>$</l>', this.contents());
};

ReporterBlockMorph.prototype.toXML = function (serializer) {
    if(this.isTarget){
      return this.selector === 'reportGetVar' ? serializer.format(
        '<block var="@" id="selected"/>',
        this.blockSpec
    ) : this.toBlockXML(serializer);
      
    }
    return this.selector === 'reportGetVar' ? serializer.format(
        '<block var="@"/>',
        this.blockSpec
    ) : this.toBlockXML(serializer);
};




BlockMorph.prototype.refactorRename = function () {

  
  // var refactorer = new Refactorer();
  // refactorer.setSelected(this);
  // console.log(refactorer.getCurrentContextString());
  dlgb = new DialogBoxMorph(this, _rename, this);
  dlgb.prompt('Refactor-Rename', 'temp', world);
};

function _rename(input){
    this.isTarget = true;
  // console.log(ide.serializer.serialize(this.topBlock()));
  var src = ide.serializer.serialize(this.topBlock())
  delete this.isTarget;
  var xml = $.parseXML(src);
  mainScope = new Scope($(xml));
  targetScope = mainScope.getDeclaredScopeByID("selected");

  console.log(mainScope.getXMLString());
  console.log(targetScope.getXMLString());

  var $node = mainScope.getNodeByID("selected");
  oldName = $node.attr('var')|| $node[0].textContent;

  rename = new Rename();
  console.log(input);
  refactored = rename.localRename(mainScope, targetScope, oldName, input);

  model = ide.serializer.parse(refactored);
  refactoredScript = ide.serializer.loadScript(model);
  
  scripts = ide.currentSprite.scripts;
  scripts.add(refactoredScript);
  refactoredScript.fixLayout();
  refactoredScript.setPosition(this.topBlock().topRight().add(new Point(30, 0)));
  


}

BlockMorph.prototype.getScriptXML = function(){
  console.log(ide.serializer.serialize(this));
};



//modification of userMenu
BlockMorph.prototype.userMenu = function () {
  var menu = new MenuMorph(this),
  world = this.world(),
  myself = this,
  shiftClicked = world.currentKey === 16,
  alternatives,
  top,
  blck;
  
  menu.addItem('duplicate', function () {
    var dup = myself.fullCopy(),
    ide = myself.parentThatIsA(IDE_Morph);
    dup.pickUp(world);
    if (ide) {
      world.hand.grabOrigin = {
        origin: ide.palette,
        position: ide.palette.center()
      };
    }
  }, 'make a copy\nand pick it up'
  );
  if (this instanceof CommandBlockMorph && this.nextBlock()) {
    menu.addItem(this.thumbnail(0.5, 60, false), function () {
      var cpy = this.fullCopy(),
      nb = cpy.nextBlock(),
      ide = myself.parentThatIsA(IDE_Morph);
      if (nb) {
        nb.destroy();
      }
      cpy.pickUp(world);
      if (ide) {
        world.hand.grabOrigin = {
          origin: ide.palette,
          position: ide.palette.center()
        };
      }
    }, 'only duplicate this block'
    );
  }
  menu.addItem('delete', 'userDestroy'
  );
  menu.addLine();
  menu.addItem('xml-script', 'getScriptXML'
  );
  menu.addItem('rename', 'refactorRename'
  );
  return menu;
};