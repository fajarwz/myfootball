let apiCall;

document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav 
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
  
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav, .footer-links").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
  
        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a, .footer-links, .breadcrumb").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Tutup sidenav
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
  
            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
  xhttp.open("GET", "/pages/nav.html", true);
  xhttp.send();
  }

  // load page content 
  let page = window.location.hash.substr(1);
  if(page === "") page = "home";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        let content = document.querySelector("#index-content, #competition-content");
        
        if (page === "home") {
          getCompetitions();
        } else if (page === "saved") {
          getSavedCompetitions();
        }

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = "<h2>Page not found</h2>";
        } else {
          content.innerHTML = "<h2>Sorry.. you can not access this page</h2>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
})