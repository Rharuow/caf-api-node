import sum from "./utils/sum";

test("should return 3 when 1 and 2 are params", () => {
  expect(sum(1, 2)).toBe(3);
});
