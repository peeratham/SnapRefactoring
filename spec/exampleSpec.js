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