import { readFileSync, writeFileSync } from 'fs'
import ejs from 'ejs'
import OpenAPIParser from '@readme/openapi-parser'

try {
  let openApi = readFileSync('../public/docs/anchor-http-api/openapi.yaml');
  let api = await OpenAPIParser.dereference('../public/docs/anchor-http-api/openapi.yaml');
  // let api = OpenAPIParser.validate('../public/docs/anchor-http-api/openapi.yaml');
  // console.log("API name: %s, Version: %s", api.info.title, api.info.version);

  let templateSource = readFileSync('./template.mdx')
  let result = ejs.render(templateSource.toString(), { api });

  writeFileSync('../src/app/docs/anchor-http-api/page.mdx', result);
}
catch(err) {
  console.error("Error: %s", err);
}