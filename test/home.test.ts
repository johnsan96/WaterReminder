import Home from "./../views/Home";
import renderer from "react-test-renderer";

/**
 * NOTE:
 * Tests loading from Planning overview.
 */
describe("ObjectIndex View", () => {
  const rendered = renderer.create(Home());

  /**
   * NOTE:
   * tests that component loads
   */
  it("should load", function () {
    expect(rendered.getInstance()).toBeDefined();
  });

  /**
   * NOTE:
   * tests that component matches snapshot struct.
   */
  it("should match the snapshot struct", function () {
    expect(rendered).toMatchSnapshot();
  });
});
