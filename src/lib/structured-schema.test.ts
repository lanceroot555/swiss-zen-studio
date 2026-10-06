import { describe, expect, it } from "vitest";
import { parseSchema, schemaScripts, serializeSchema } from "./structured-schema";
import { applyContent } from "./content";
import { navigationConfig, pageSchemas, servicePages } from "./site-config";
import { pageSchema } from "./seo";
describe("JSON-LD", () => {
  it("accepts JSON and wrapped scripts", () => {
    expect(parseSchema('{"@type":"WebPage"}')).toEqual({"@type":"WebPage"});
    expect(parseSchema('<script type="application/ld+json">{"@type":"Service"}</script>')).toEqual({"@type":"Service"});
  });
  it("rejects executable and malformed input", () => {
    expect(()=>parseSchema('<script>alert(1)</script>')).toThrow();
    expect(()=>parseSchema('{bad}')).toThrow();
    expect(()=>parseSchema('"plain text"')).toThrow();
  });
  it("escapes markup and replaces default schema", () => {
    const input={"@type":"WebPage",name:'</script><script>alert(1)</script>'};
    expect(serializeSchema(input)).not.toContain('<');
    expect(JSON.parse(serializeSchema(input))).toEqual(input);
    expect(schemaScripts(JSON.stringify(input),{"@type":"Service"})).toHaveLength(1);
    expect(JSON.parse(schemaScripts(JSON.stringify(input))[0]?.children ?? '{}')).toEqual(input);
  });
  it("applies independent menu, service and page schema overrides", () => {
    applyContent({navigation:{items:[{label:'Test menu',href:'/',visible:true,children:[]}]},servicePages:{items:servicePages.items.map((s,i)=>i===0?{...s,title:'Test service'}:s)},schemas:{items:pageSchemas.items.map(p=>p.path==='/'?{...p,structuredSchema:'{"@type":"WebPage","name":"Custom"}'}:p)}});
    expect(navigationConfig.items[0]?.label).toBe('Test menu');
    expect(servicePages.items[0]?.title).toBe('Test service');
    expect(JSON.parse(pageSchema('/')[0]?.children ?? '{}').name).toBe('Custom');
    applyContent({});
    expect(navigationConfig.items[0]?.label).toBe('Home');
  });
});