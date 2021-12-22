/**
 * @jest-environment jsdom
 */
import MarkupFactory from '../src/markup_factory.js';

describe("building", () => {
    test("basic objects", () => {
        let factory = new MarkupFactory();
        let nodes   = [factory.build({nodeName: "span"}),
                       factory.build({nodeName: "div"}),
                       factory.build({nodeName: "p"})];

        expect(nodes[0] instanceof Node).toBe(true);
        expect(nodes[1] instanceof Node).toBe(true);
        expect(nodes[2] instanceof Node).toBe(true);
        expect(nodes[0].nodeName).toBe("SPAN");
        expect(nodes[1].nodeName).toBe("DIV");
        expect(nodes[2].nodeName).toBe("P");
    });

    test("custom element types", () => {
        let factory = new MarkupFactory();
        let node    = factory.build({nodeName: "BLAH"});

        expect(node).not.toBeUndefined();
        expect(node instanceof Node).toBe(true);
        expect(node.nodeName).toBe("BLAH")
    });

    test("fails when not given a node name", () => {
        let factory = new MarkupFactory();

        expect(() => factory.build({})).toThrow("MarkupFactory received object definition with no nodeName attribute.");
    });

    describe("text property", () => {
        test("gets assigned as the node inner text", () => {
            let factory = new MarkupFactory();
            let node    = factory.build({nodeName: "h1", text: "A Header!"});

            expect(node.innerText).toBe("A Header!");
        });
    });

    describe("attributes", () => {
        test("get added", () => {
            let factory = new MarkupFactory();
            let node    = factory.build({class: "custom", nodeName: "button", type: "submit"});

            expect(node.classList.contains("custom")).toBe(true);
            expect(node.hasAttribute("type")).toBe(true);
            expect(node.getAttribute("type")).toBe("submit");
        });
    });
});