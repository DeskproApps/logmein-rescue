import { getPinCode } from "../getPinCode";

describe("utils", () => {
  describe("getPinCode", () => {
    test("should return PIN Code", () => {
      expect(getPinCode("https://secure.logmeinrescue.com/R?i=2&Code=100500"))
        .toBe("100500");
      expect(getPinCode("https://secure.logmeinrescue.com/R?i=2&a=b&Code=123456&foo=bar"))
        .toBe("123456");
    });

    test("shouldn't return PIN Code if not in query params", () => {
      expect(getPinCode("https://secure.logmeinrescue.com/R?i=2&a=b&foo=bar"))
        .toBeNull();
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(getPinCode(payload as never)).toBeNull();
    });
  });
});
