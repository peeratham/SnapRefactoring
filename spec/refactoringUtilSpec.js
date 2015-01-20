	var testScriptEqual = function(actual,expected){
		// if(actual == expected){
			 actualXML = $.parseXML(actual);
			 expectedXML = $.parseXML(expected);
			$(actualXML).find('*[id]').removeAttr('id');
			$(expectedXML).find('*[id]').removeAttr('id');
			return xmlToString(actualXML) == xmlToString(expectedXML);
		};
describe("Scope", function(){
	var scope;
	var testModel;
	var testScriptBlocks;
	var sampleScriptXML;



	beforeEach(function(){
	});

	it("should contains only names defined in a scope", function(){
		var testScript = '<script><block s="forward"><l>10</l></block><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doRepeat"><l>10</l><script><block s="doDeclareVariables"><list><l>c</l></list></block><block s="doDeclareVariables"><list><l>d</l></list></block></script></block><block s="doForever"><script><block s="doDeclareVariables"><list><l id="1">e</l></list></block></script></block></script>';
		xml1 = $.parseXML(testScript);
		mainScript = new Scope($(xml1));
		expect(mainScript.getXMLString()).toEqual(testScript);
		expect(mainScript.getChildScopes().length).toBe(2);
		expect(mainScript.lookup('a')).not.toBe(null);
		expect(mainScript.lookup('b')).not.toBe(null);
		expect(mainScript.lookup('c')).toBe(null);

		expect(mainScript.getNodeByID(1)[0].outerHTML).toBe('<l id="1">e</l>');
		expect(mainScript.getScopeByID(1).getXMLString()).toBe('<block s="doForever"><script><block s="doDeclareVariables"><list><l id="1">e</l></list></block></script></block>');
		childScopes = mainScript.getChildScopes();
		doRepeatScope = mainScript.getChildScopes()[0];
		expect(doRepeatScope.lookup('c')).not.toBe(null);
		expect(doRepeatScope.lookup('d')).not.toBe(null);

		expect(doRepeatScope.lookup('a')).toBe(null);
		doForeverScope = mainScript.getChildScopes()[1];
		expect(doForeverScope.lookup('e')).not.toBe(null);
		expect(doForeverScope.lookup('c')).toBe(null);
	});

	it("should return the scope that the selected name is declared", function(){
		var testScript = '<script id="0"><block s="forward"><l>10</l></block><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doRepeat"><l>10</l><script><block s="doSetVar"><l>a</l><l>0</l></block><block s="forward"><block var="a" id="4"/></block></script></block></script>';
		var xml = $.parseXML(testScript);
		mainScript = new Scope($(xml));
		selected = mainScript.getNodeByID(4);
		declaredScope = mainScript.getDeclaredScope(selected);
		targetScope = mainScript.getScopeByID(0);
		expect(declaredScope.$xml.is(targetScope.$xml)).toBe(true);

	});

});

describe("Rename",function(){
	var refactorer;
	// occurences = refactorer.findOccurrences(scope);

	it("should rename the occurences in the scope, which the variable is defined", function(){
		var testScript = '<script><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doSetVar"><l>a</l><l>0</l></block><block s="doRepeat"><l>10</l><script><block s="doChangeVar"><l id="selected">a</l><l>1</l></block><block s="doChangeVar"><l>b</l><l>1</l></block></script></block><block s="doSetVar"><l>b</l><l>0</l></block></script>';
		refactorer = new Refactorer();
		var xml = $.parseXML(testScript);
		mainScope = new Scope($(xml));
		targetScope = mainScope.getDeclaredScopeByID("selected");
		rename = new Rename();
		result = rename.localRename(mainScope, targetScope, 'a', 'newName');

		expect(testScriptEqual(result, '<script><block s="doDeclareVariables"><list><l>newName</l></list></block><block s="doDeclareVariables"><list><l>b</l></list></block><block s="doSetVar"><l>newName</l><l>0</l></block><block s="doRepeat"><l>10</l><script><block s="doChangeVar"><l id="selected">newName</l><l>1</l></block><block s="doChangeVar"><l>b</l><l>1</l></block></script></block><block s="doSetVar"><l>b</l><l>0</l></block></script>')).toBe(true);
		
	});

	it("should not rename the occurrence where there exists variable shadowing", function(){
		var testScript = '<script><block s="doDeclareVariables"><list><l>a</l></list></block><block s="doSetVar"><l id="selected">a</l><l>0</l></block><block s="doRepeat"><l>10</l><script><block s="doChangeVar"><l>a</l><l>1</l></block><block s="doIf"><block s="reportTrue"></block><script><block s="doDeclareVariables"><list><l>a</l></list></block><block s="bubble"><block var="a"/></block></script></block></script></block></script>';

		refactorer = new Refactorer();
		var xml = $.parseXML(testScript);
		mainScope = new Scope($(xml));
		targetScope = mainScope.getDeclaredScopeByID("selected");
		rename = new Rename();
		result = rename.localRename(mainScope, targetScope, 'a', 'newName');
		expect(testScriptEqual(result, '<script><block s="doDeclareVariables"><list><l>newName</l></list></block><block s="doSetVar"><l id="selected">newName</l><l>0</l></block><block s="doRepeat"><l>10</l><script><block s="doChangeVar"><l>newName</l><l>1</l></block><block s="doIf"><block s="reportTrue"></block><script><block s="doDeclareVariables"><list><l>a</l></list></block><block s="bubble"><block var="a"/></block></script></block></script></block></script>')).toBe(true);
	});
});