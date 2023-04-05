// @ts-ignore
import { DEV_MODE } from "@env";

function getUrl(): URL {
  let url;

  try {
    url = new URL(DEV_MODE.toString());
  } catch (e) {
    url = new URL("");
  }

  return url;
}

describe("DEV_MODE env var", () => {
  it("should have a defined DEV_MODE", function () {
    expect(DEV_MODE).toBeDefined();
  });

 
});
