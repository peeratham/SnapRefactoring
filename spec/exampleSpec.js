describe("Example suite1", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
    expect($('<div><span></span></div>')).toHaveHtml('<span></span>');

  });
});

describe("Example suite2", function() {
  it("contains spec with an expectation", function() {
  	expect(mult(3,4)).toEqual(12);

  });
});

describe("Example suite3", function() {
  it("contains spec with an expectation", function() {
	
	jasmine.getFixtures().fixturesPath = './base/src/';
	loadFixtures('fixture.html');
	console.log($("#jasmine-fixtures"));
	console.log($("p"));
	expect($("p")).toHaveLength(3);
  	});

});



