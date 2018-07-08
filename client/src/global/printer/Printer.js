import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class Printer extends React.Component {
  static propTypes = {
    copyStyles: PropTypes.bool,
    trigger: PropTypes.func.isRequired,
    content: PropTypes.func.isRequired,
    onBeforePrint: PropTypes.func,
    onAfterPrint: PropTypes.func,
  };

  static defaultProps = {
    copyStyles: true,
  };

  triggerPrint(target) {
    if (this.props.onBeforePrint) {
      this.props.onBeforePrint();
    }
    setTimeout(() => {
      target.print();
      target.close();
    }, 500);
  }

  handlePrint = () => {
    const { content, copyStyles, onAfterPrint } = this.props;

    const printWindow = window.open(
      '',
      'Print',
      'status=no, toolbar=no, scrollbars=yes',
      'false',
    );

    if (onAfterPrint) {
      printWindow.onbeforeunload = onAfterPrint;
    }

    const contentEl = content();
    const contentNodes = findDOMNode(contentEl);

    const imageNodes = [...contentNodes.getElementsByTagName('img')];
    const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

    this.imageTotal = imageNodes.length;
    this.imageLoaded = 0;

    this.linkTotal = linkNodes.length;
    this.linkLoaded = 0;

    const markLoaded = type => {
      if (type === 'image') this.imageLoaded++;
      else if (type === 'link') this.linkLoaded++;

      if (
        this.imageLoaded === this.imageTotal &&
        this.linkLoaded === this.linkTotal
      ) {
        this.triggerPrint(printWindow);
      }
    };

    [...imageNodes].forEach(child => {
      /** Workaround for Safari if the image has base64 data as a source */
      if (/^data:/.test(child.src)) {
        child.crossOrigin = 'anonymous';
      }
      child.setAttribute('src', child.src);
      child.onload = markLoaded.bind(null, 'image');
      child.onerror = markLoaded.bind(null, 'image');
      child.crossOrigin = 'use-credentials';
    });

    /*
     * IE does not seem to allow appendChild from different window contexts correctly.  They seem to come back
     * as plain objects. In order to get around this each tag is re-created into the printWindow
     * https://stackoverflow.com/questions/38708840/calling-adoptnode-and-importnode-on-a-child-window-fails-in-ie-and-edge
     */
    if (copyStyles !== false) {
      const headEls = document.querySelectorAll(
        'style, link[rel="stylesheet"]',
      );
      [...headEls].forEach(node => {
        const newHeadEl = printWindow.document.createElement(node.tagName);

        if (node.textContent) newHeadEl.textContent = node.textContent;
        else if (node.innerText) newHeadEl.innerText = node.innerText;

        const attributes = [...node.attributes];
        attributes.forEach(attr => {
          let nodeValue = attr.nodeValue;

          if (
            attr.nodeName === 'href' &&
            /^https?:\/\//.test(attr.nodeValue) === false
          ) {
            nodeValue =
              document.location.protocol +
              '//' +
              document.location.host +
              nodeValue;
          }

          newHeadEl.setAttribute(attr.nodeName, nodeValue);
        });

        if (node.tagName === 'LINK') {
          newHeadEl.onload = markLoaded.bind(null, 'link');
          newHeadEl.onerror = markLoaded.bind(null, 'link');
        }

        printWindow.document.head.appendChild(newHeadEl);
      });
    }

    if (document.body.className) {
      const bodyClasses = document.body.className.split(' ');
      bodyClasses.map(item => printWindow.document.body.classList.add(item));
    }

    /* remove date/time from top */
    const styleEl = printWindow.document.createElement('style');
    styleEl.appendChild(
      printWindow.document.createTextNode(`
      @page {
        size: 8.5in 11in;
        margin: 0.7in 0.5in;
      }

      @media print {
        body { -webkit-print-color-adjust: exact; }
        
        table tbody tr td,
        table tbody tr th {
          page-break-after: always;
        }
      }
    `),
    );

    printWindow.document.head.appendChild(styleEl);
    printWindow.document.body.innerHTML = contentNodes.outerHTML;

    if (this.imageTotal === 0 || copyStyles === false) {
      this.triggerPrint(printWindow);
    }
  };

  render() {
    return React.cloneElement(this.props.trigger(), {
      ref: el => (this.triggerRef = el),
      onClick: this.handlePrint,
    });
  }
}

export default Printer;
