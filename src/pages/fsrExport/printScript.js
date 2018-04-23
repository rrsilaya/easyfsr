import { findDOMNode } from 'react-dom';

const HTTPS = /^https?:\/\//;

export const handleDOMPrint = content => {
  content = findDOMNode(content);
  const printWindow = window.open(
    '',
    'Faculty Service Record',
    'status=no, toolbar=no, scrollbars=yes',
    'false',
  );

  // Copy Styles
  const headers = document.querySelectorAll('link[rel="stylesheet"]');
  Array.from(headers).forEach(node => {
    const headElement = printWindow.document.createElement('link');
    const { attributes } = node;

    [...attributes].forEach(attr => {
      let { nodeValue, nodeName } = attr;

      if (nodeName === 'href' && !HTTPS.test(nodeValue)) {
        nodeValue = `${document.location.protocol}//${
          document.location.host
        }${nodeValue}`;
      }

      headElement.setAttribute(nodeName, nodeValue);
    });

    printWindow.document.head.appendChild(headElement);
  });

  printWindow.document.body.innerHTML = content.outerHTML;
};
