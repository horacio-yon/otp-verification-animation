# OTP Verification Component 🔐

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Ver%20ahora-2ee6a6?style=for-the-badge&logo=github&logoColor=white)](https://horacio-yon.github.io/otp-verification-animation/)

Una elegante interfaz de verificación OTP (One-Time Password) con animaciones fluidas y efectos visuales inmersivos. Este componente presenta una experiencia de usuario moderna con transiciones suaves, efectos de partículas y audio sintetizado.

![OTP Verification Demo](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Características

### 🎨 Interfaz Visual
- **Diseño moderno**: Tema oscuro con gradientes y efectos de cristal
- **Animaciones fluidas**: Transiciones CSS avanzadas con spring easing
- **Focus ring animado**: Anillo de enfoque que gira al ingresar dígitos
- **Efectos de partículas**: Sistema de partículas en canvas para celebraciones
- **Responsive**: Adaptable a diferentes tamaños de pantalla

### 🎵 Audio Sintetizado
- **Web Audio API**: Sonidos generados proceduralmente sin archivos externos
- **Efectos sonoros**:
  - Ticks al escribir dígitos
  - Cascada armónica al auto-rellenar
  - Whoosh para transiciones
  - Boom y melodía de éxito
  - Sonidos de error
- **Control de audio**: Botón de silencio/activar audio

### 🔄 Animaciones por Fases
1. **Fase 1**: Grid horizontal de dígitos con focus ring
2. **Fase 2**: Transición a formación orbital
3. **Fase 3**: Convergencia de elementos orbitales
4. **Fase 4**: Explosión de celebración con efectos múltiples

### ⚡ Interactividad
- **Auto-fill**: Botón para llenar automáticamente el código correcto
- **Navegación por teclado**: Flechas izquierda/derecha, backspace
- **Contador regresivo**: Para reenvío de código
- **Estados de error**: Animación de shake y colores de error
- **Accesibilidad**: ARIA labels y navegación por teclado

## 📦 Instalación

### Clonar el Repositorio
```bash
git clone https://github.com/tuusuario/otp-verification.git
cd otp-verification
```


## 🛠️ Uso

### Instalación Local
1. **Clona el repositorio** en tu máquina local
2. **Abre `index.html`** en tu navegador web preferido
3. **¡Listo!** No requiere instalación de dependencias adicionales

### Servidor Local (Recomendado)
Para una mejor experiencia, ejecuta con un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## ⚙️ Configuración

### Código OTP Correcto
El código correcto está definido en `script.js`:
```javascript
const CORRECT_CODE = '2365';
```

### Personalización de Audio
Puedes ajustar las frecuencias de audio en la clase `SoundEngine`:
```javascript
const DIGIT_FREQS = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
```

### Variables CSS Personalizables
En `style.css` puedes modificar:
```css
:root {
    --bg-color: #07090e;
    --success-color: #2ee6a6;
    --error-color: #f87171;
    --transition-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 🎯 Funcionalidades Técnicas

### State Machine
El componente maneja diferentes estados:
- `idle`: Estado inicial
- `typing`: Ingresando dígitos
- `orbit`: Fase de transición orbital
- `verifying`: Verificando código
- `success`: Verificación exitosa
- `error`: Código incorrecto

### Efectos Visuales
- **CSS Custom Properties**: Para animaciones dinámicas
- **Conic Gradients**: Para el focus ring animado
- **Canvas Particles**: Sistema de partículas WebGL
- **CSS Animations**: Keyframes para transiciones complejas

## 🔧 Desarrollo

### Estructura del Código

#### HTML (`index.html`)
- Estructura semántica con ARIA labels
- Canvas para efectos de partículas
- Input oculto para compatibilidad móvil

#### CSS (`style.css`)
- Variables CSS para fácil personalización
- Animaciones con spring easing
- Media queries para responsividad
- Soporte para `prefers-reduced-motion`

#### JavaScript (`script.js`)
- Clase `SoundEngine` para audio procedural
- State machine para manejo de estados
- Sistema de partículas canvas
- Event listeners para interactividad

### Personalización Avanzada

#### Cambiar Animaciones
```css
/* Modificar duración de transiciones */
.digit-box {
    transition: transform 0.3s var(--transition-spring);
}

/* Personalizar efectos de partículas */
.particle-canvas {
    mix-blend-mode: screen; /* Cambiar modo de mezcla */
}
```

#### Audio Personalizado
```javascript
// Agregar nuevos sonidos a SoundEngine
playCustomSound(freq, duration) {
    // Tu implementación aquí
}
```

## 🐛 Solución de Problemas

### El audio no funciona
- Verifica que el navegador soporte Web Audio API
- Los navegadores modernos requieren interacción del usuario antes del audio
- Haz clic en cualquier parte de la página primero

### Animaciones lentas
- Verifica `prefers-reduced-motion` en configuración del sistema
- Algunos navegadores throttle animations en pestañas inactivas

### Problemas de responsive
- Verifica que el viewport meta tag esté presente
- Prueba en diferentes tamaños de pantalla

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Reconocimientos

- Inspirado en las mejores prácticas de UX/UI modernas
- Efectos de audio basados en Web Audio API
- Animaciones inspiradas en principios de motion design

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
