
import "./globals.css";
import Nav from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VoltarAoTopo from '@/components/VoltarAoTopo/VoltarAoTopo'


export const metadata = {
  title: "Lumier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nhw8ncg.css" />
        <link href="https://fonts.cdnfonts.com/css/sugo-pro-classic-trial" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/eccf30d3af8a69bf0b97f01c6d46b8e2?family=Agrandir+Grand+Heavy" rel="stylesheet" />
      </head>
      <body>
        <Nav></Nav>
        {children}
        <VoltarAoTopo></VoltarAoTopo>
        <Footer></Footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossOrigin="anonymous"></script>
      </body>
    </html>



  );
}
