ddescribe("Scope", function(){
	var scope;
	var refactorer;
	var testModel;
	var testScriptBlocks;
	var sampleScriptXML;

	var testScriptEqual = function(actual,expected){
		// if(actual == expected){
			var actualXML = $.parseXML(actual);
			var expectedXML = $.parseXML(expected);
			$(actualXML).find('*[id]').removeAttr('id');
			$(expectedXML).find('*[id]').removeAttr('id');
			return xmlToString(actualXML) == xmlToString(expectedXML);

		// }
		// return false;
	};

	beforeEach(function(){

		scope = new Scope();
	});

	// it("should get the script return the type of scope", function(){
	// 	var scope = new Scope();
	// 	var element = scope.getScope("<script>a</script>");
	// 	console.log(element);
	// });


	// it("should get the selected element", function(){
	// 	var selected = scope.getSelectedElementString();
	// 	expect(selected).toBe('<l id="selected">a</l>');
	// });

	// it("should return the immediate block node of the selected element", function(){
	// 	var selectedBlock = scope.getSelectedBlock();
	// 	expect(scopeToString(selectedBlock)).toBe('<block s="doDeclareVariables"><list><l id="selected">a</l></list></block>');
	// });

	// it("should contains elements in the selected scope",function(){
	// 	var allElements = scope.getAllElements();
	// 	expect(allElements.length).toBe(3);
	// 	expect(getSelector(allElements[1])).toBe('doDeclareVariables');
	// });

	// it("should contains inner scopes",function(){
	// 	var sampleScriptXML = '<script><block s="forward"><l>10</l></block><block s="doRepeat"><l>10</l><script><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doSetVar"><l>a</l><l>0</l></block></script></block><block s="doForever"><script><block s="doDeclareVariables"><list><l>b</l></list></block></script></block></script>';
	// 	scope.setStringScope(sampleScriptXML);
	// 	// expect(scope.getScopes().length).toBe(2);
	// 	// var loopScope = scope.getScopes()[0];
	// 	// expect(getSelector(loopScope)).toBe('doRepeat');

	// });

	it("should contains only names defined in a scope", function(){
		var testScript = '<script><block s="forward"><l>10</l></block><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doRepeat"><l>10</l><script><block s="doDeclareVariables"><list><l>c</l></list></block><block s="doDeclareVariables"><list><l>d</l></list></block></script></block><block s="doForever"><script><block s="doDeclareVariables"><list><l>e</l></list></block></script></block></script>';
		var scriptScope = new Scope();
		scriptScope.setStringScope(testScript);
		expect(scriptScope.getChildScopes().length).toBe(2);
		expect(scriptScope.lookup('a')).not.toBe(null);
		expect(scriptScope.lookup('b')).not.toBe(null);
		expect(scriptScope.lookup('c')).toBe(null);

		doRepeatScope = scriptScope.getChildScopes()[0];
		expect(doRepeatScope.lookup('c')).not.toBe(null);
		expect(doRepeatScope.lookup('d')).not.toBe(null);

		expect(doRepeatScope.lookup('a')).toBe(null);
		doForeverScope = scriptScope.getChildScopes()[1];
		expect(doForeverScope.lookup('e')).not.toBe(null);
		expect(doForeverScope.lookup('c')).toBe(null);
	});

	it("should return the scope that the selected name is declared", function(){
		var testScript = '<script><block s="forward"><l>10</l></block><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doRepeat"><l>10</l><script><block s="doSetVar"><l>a</l><l>0</l></block><block s="forward"><block var="a" id="4"/></block></script></block></script>';
		scriptScope = new Scope();
		scriptScope.setStringScope(testScript);
		selected = scriptScope.getSelectedScope(4);
		console.log(selected);
		//need to return Scope Obj not jquery way
		//maybe can add associated Scope Object to each xml element as processingScope

		// expect(testScriptEqual(selected.toString(),'<a><b>a</b></a>')).toBe(true);

		//setvar is the content of the first <l></l>
		//script var is a <block var> inside block

	});

});

ddescribe("Rename",function(){
	

	it("should give occurence inside the scope, which the variable is defined", function(){

	});

	it("should rename all occurence inside the scope where the variable is defined", function(){

	});
});