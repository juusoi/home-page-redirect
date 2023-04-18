const { redirect } = require("./redirect");

describe("redirect", () => {
  test("should set the response headers and redirect to the expected URL", () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    const redirect_url = "https://example.com";
    redirect(res, redirect_url);
    expect(res.writeHead).toHaveBeenCalledWith(307, {
      Location: redirect_url,
      "Cache-Control":
        "no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache",
    });
    expect(res.end).toHaveBeenCalled();
  });
});
