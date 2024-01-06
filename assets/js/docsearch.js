import docsearch from '@docsearch/js';

docsearch({
  container: '#docsearch',
  appId: 'JK7YO1LOVV',
  apiKey: 'b7ba9320220309ac639e8a7c52b70e73',
  indexName: 'local_code_snippets',
  insights: true,
});

const onClick = function() {
  document.getElementsByClassName('DocSearch-Button')[0].click();  
}

document.getElementById('searchToggleMobile').onclick = onClick;
document.getElementById('searchToggleDesktop').onclick = onClick;
