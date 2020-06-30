const alfy = require('alfy');

const results = await alfy.fetch(`https://www.getoutline.com/api/documents.search`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.apiToken}`,
    "Content-Type": "application/json",
  },
  body: {
    query: alfy.input
  }
});

let items = results.data.map(result => ({
  title: result.document.title,
  subtitle: result.context.replace(/\<\/?b\>/g, ''),
  arg: `https://${process.env.subdomain || "www"}.getoutline.com${result.document.url}`
}));

if (!items.length) {
  items = [{
    title: "No results - go to Outline homepage",
    arg: `https://${process.env.subdomain || "www"}.getoutline.com/home`
  }];
}

alfy.output(items);