describe("Rename Script Variable", function() {

	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = './base/fixtures/';
		loadFixtures('snap-fixture.html');
		createWorld($("canvas")[0]);
	});

	it("contains spec with an expectation", function() {
		console.log(scopeXML = ide.serializer.serialize(script01));
	});
	


});

