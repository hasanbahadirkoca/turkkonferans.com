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
    
    // Bootstrap'ı yeniden başlat
    if (typeof bootstrap !== 'undefined') {
      // Offcanvas menüleri yeniden başlat
      const offcanvasElements = document.querySelectorAll('.offcanvas');
      offcanvasElements.forEach(element => {
        new bootstrap.Offcanvas(element);
      });
      
      // Collapse menüleri yeniden başlat
      const collapseElements = document.querySelectorAll('.collapse');
      collapseElements.forEach(element => {
        new bootstrap.Collapse(element, { toggle: false });
      });
    }
    
    // Aktif menüyü ayarla
    setActiveMenu();
  } catch(e) {
    console.error('Header/Footer yüklenemedi:', e);
  }
}

function setActiveMenu() {
  var path = location.pathname.split('/').pop();
  if (!path || path === '' || path === '/') path = 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || '/' + href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Bootstrap JS'i yükle
function loadBootstrapJS() {
  if (!document.querySelector('script[src*="bootstrap.bundle.min.js"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.onload = function() {
      // Bootstrap yüklendikten sonra header-footer'ı yükle
      loadHeaderFooter();
    };
    document.head.appendChild(script);
  } else {
    // Bootstrap zaten yüklüyse direkt header-footer'ı yükle
    loadHeaderFooter();
  }
}

window.addEventListener('DOMContentLoaded', loadBootstrapJS); 