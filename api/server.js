const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Datos de ejemplo (luego conectaremos con GitHub)
let config = {
  titulo_header: "DW soluciones digitales",
  titulo_hero: "DisWeb Soluciones Digitales",
  telefono: "+54 9 11 5340-2972",
  email: "diswebsolucionesdigitales@proton.me"
};

// Obtener configuración actual
app.get('/api/config', (req, res) => {
  res.json(config);
});

// Actualizar configuración
app.post('/api/update-settings', (req, res) => {
  config = { ...config, ...req.body };
  console.log('📝 Configuración actualizada:', config);
  res.json({ success: true, message: 'Configuración actualizada' });
});

// Endpoints existentes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ Backend DisWeb funcionando!', 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor DisWeb corriendo en puerto ${PORT}`);
});
