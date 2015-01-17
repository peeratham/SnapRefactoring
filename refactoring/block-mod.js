// Extends refactoring to BlockMorph
BlockMorph.prototype.refactorRename = function () {
  var refactorer = new Refactorer();
  refactorer.setSelected(this);
  console.log(refactorer.getCurrentContextString());
  // dlgb = new DialogBoxMorph(this, _rename, this);
  // dlgb.prompt('Refactor-Rename', 'temp', world);
};

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
  return menu;
};