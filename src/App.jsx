import React, { useEffect, useState } from "react";

const App = () => {
  const [personajes, setPersonajes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    const url = `https://rickandmortyapi.com/api/character/?page=${pagina}&name=${busqueda}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data.results || []);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCargando(false);
      });
  }, [pagina, busqueda]);

  const siguiente = () => setPagina((p) => p + 1);
  const anterior = () => setPagina((p) => Math.max(p - 1, 1));

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.titulo}>Rick and Morty</h1>
        <p style={styles.subtitulo}>Explora el multiverso</p>
      </header>

      <div style={styles.busquedaContainer}>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={busqueda}
          onChange={(e) => {
            setPagina(1);
            setBusqueda(e.target.value);
          }}
          style={styles.busqueda}
        />
      </div>

      <div style={styles.paginacion}>
        <button 
          onClick={anterior} 
          disabled={pagina === 1}
          style={pagina === 1 ? styles.botonDeshabilitado : styles.boton}
        >
          ← Anterior
        </button>
        <span style={styles.paginaInfo}>Página {pagina}</span>
        <button 
          onClick={siguiente}
          style={styles.boton}
        >
          Siguiente →
        </button>
      </div>

      {cargando ? (
        <div style={styles.cargando}>
          <div style={styles.spinner}></div>
          <p>Cargando personajes...</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {personajes.length > 0 ? (
            personajes.map((p) => (
              <div key={p.id} style={styles.tarjeta}>
                <div style={styles.imagenContainer}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={styles.imagen}
                  />
                  <div style={styles.estado(p.status)}></div>
                </div>
                <div style={styles.contenido}>
                  <h3 style={styles.nombre}>{p.name}</h3>
                  <p style={styles.especie}>{p.species}</p>
                  <div style={styles.meta}>
                    <span style={styles.estadoTexto}>{p.status}</span>
                    <span style={styles.separador}>•</span>
                    <span>{p.gender}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.vacio}>
              <p style={styles.textoVacio}>No se encontraron personajes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    padding: "20px 0",
  },
  titulo: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1a202c",
    margin: "0 0 8px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitulo: {
    fontSize: "1.1rem",
    color: "#718096",
    margin: "0",
    fontStyle: "italic",
  },
  busquedaContainer: {
    marginBottom: "30px",
  },
  busqueda: {
    padding: "12px 16px",
    width: "100%",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  busquedaFocus: {
    borderColor: "#667eea",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.1)",
  },
  paginacion: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  boton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#667eea",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
  },
  botonDeshabilitado: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#cbd5e0",
    color: "#718096",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  paginaInfo: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4a5568",
    minWidth: "100px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  tarjeta: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  imagenContainer: {
    position: "relative",
    overflow: "hidden",
  },
  imagen: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  estado: (status) => ({
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: 
      status === "Alive" ? "#48bb78" :
      status === "Dead" ? "#f56565" : "#ed8936",
    border: "2px solid white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  }),
  contenido: {
    padding: "16px",
  },
  nombre: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0 0 8px 0",
    lineHeight: "1.3",
  },
  especie: {
    fontSize: "14px",
    color: "#667eea",
    fontWeight: "500",
    margin: "0 0 8px 0",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#718096",
  },
  estadoTexto: {
    fontWeight: "500",
    textTransform: "capitalize",
  },
  separador: {
    color: "#cbd5e0",
  },
  cargando: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    color: "#718096",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderLeft: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  vacio: {
    textAlign: "center",
    padding: "60px 20px",
    gridColumn: "1 / -1",
  },
  textoVacio: {
    fontSize: "18px",
    color: "#a0aec0",
    margin: "0",
  },
};

// Agregar la animación del spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default App;