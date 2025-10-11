const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Ajusta esto al dominio de tu GitHub Pages
const FRONTEND_ORIGIN = 'https://diswebsolucionesdigitales.github.io';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS: permitir sólo tu frontend (más seguro) o '*' para abrirlo
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// Endpoint de ejemplo: salud
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Endpoint de ejemplo: contacto (simula envío)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  // Aquí pondrías integración real (Mailgun, Sendgrid, guardar DB, etc.)
  console.log('Contacto recibido:', { name, email, message });

  return res.json({ status: 'enviado', received: { name, email } });
});

// Si quieres servir archivos estáticos desde el backend (opcional)
// app.use(express.static('../public'));

// Render asigna el puerto en process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
