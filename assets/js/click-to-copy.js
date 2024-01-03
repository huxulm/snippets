let codeListings = document.querySelectorAll('.highlight > pre');

for (let index = 0; index < codeListings.length; index++) {
  const codeSample = codeListings[index].querySelector('code');
  const copyButton = document.createElement('button');
  const buttonAttributes = {
    type: 'button',
    title: '复制代码',
    'data-bs-toggle': 'tooltip',
    'data-bs-placement': 'top',
    'data-bs-container': 'body',
  };

  Object.keys(buttonAttributes).forEach((key) => {
    copyButton.setAttribute(key, buttonAttributes[key]);
  });

  copyButton.classList.add(
    'btn-click-to-copy',
    'bg-white',
    'ba',
    'br2',
    'dim',
    'pointer'
  );
  const tooltip = new bootstrap.Tooltip(copyButton);

  copyButton.onclick = () => {
    copyCode(codeSample);
    copyButton.setAttribute('data-bs-original-title', '已复制!');
    tooltip.show();
  };

  copyButton.onmouseout = () => {
    copyButton.setAttribute('data-bs-original-title', '复制到剪贴板');
    tooltip.hide();
  };

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('click-to-copy');
  buttonDiv.classList.add('bg-light-gray');
  copyButton.innerHTML = `<svg role="img" aria-label="Copy" class="icon icon-copy" viewBox="0 0 16 16" width="16" height="16">
  <title>Copy</title>
  <path fill="currentcolor" fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
  <path fill="currentcolor" fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>`
  buttonDiv.append(copyButton);
  codeListings[index].insertBefore(buttonDiv, codeSample);
}

const copyCode = (codeSample) => {
  navigator.clipboard.writeText(codeSample.textContent.trim() + '\n');
};
