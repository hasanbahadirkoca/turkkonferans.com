// template.js
// Tüm sayfalarda ortak header ve footer'ı dinamik olarak ekler

async function loadHeaderFooter() {
  try {
    const res = await fetch('header-footer.html');
    const text = await res.text();
    // Header ve footer'ı ayır
    const headerMatch = text.match(/<!-- HEADER-FOOTER TEMPLATE -->([\s\S]*?)<!-- \/HEADER -->/);
    const footerMatch = text.match(/<!-- FOOTER -->([\s\S]*?)<!-- \/FOOTER -->/);
    if(headerMatch && document.body) {
      const headerDiv = document.createElement('div');
      headerDiv.innerHTML = headerMatch[1];
      document.body.insertAdjacentElement('afterbegin', headerDiv);
    }
    if(footerMatch && document.body) {
      const footerDiv = document.createElement('div');
      footerDiv.innerHTML = footerMatch[1];
      document.body.appendChild(footerDiv);
    }
  } catch(e) {
    console.error('Header/Footer yüklenemedi:', e);
  }
}

window.addEventListener('DOMContentLoaded', loadHeaderFooter); 