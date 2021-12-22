/**
 * @jest-environment jsdom
 */
import MarkupFactory from '../src/markup_factory.js';

describe("data attributes", () => {
    test("get created", () => {
        let factory = new MarkupFactory();
        let node    = factory.build({data: {first: "ONE", second: 2, third: false},
                                     nodeName: "div"});

        expect(node.dataset.first).toBe("ONE");
        expect(node.dataset.second).toBe("2");
        expect(node.dataset.third).toBe("false");
    });
});
