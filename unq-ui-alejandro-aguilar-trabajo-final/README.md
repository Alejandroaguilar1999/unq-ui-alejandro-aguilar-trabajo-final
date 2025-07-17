# 🎮 Wordle UNQ - Trabajo Final Integrador

Este proyecto es una implementación del clásico juego **Wordle**, desarrollado como parte del **Trabajo Final Integrador** de la materia **UIs** de la Universidad Nacional de Quilmes (2C 2024).

El juego incluye selección de dificultad, pistas por colores, teclado visual y un historial de partidas jugadas almacenado localmente.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React (con Vite)
- 📦 Axios
- 🧠 React Hooks (useState, useEffect, useCallback)
- 🧱 HTML + CSS
- 🧪 API externa provista por la cátedra

---

## 🔧 Instalación y ejecución local

1. Cloná este repositorio:
```bash
git clone https://github.com/usuario/unq-ui-nombre-apellido-trabajo-final.git
cd unq-ui-nombre-apellido-trabajo-final
```
2. Instalá las dependencias:
```bash
npm install
```
3. Iniciá el proyecto:
```bash
npm run dev
```
4. Abrí tu navegador en:
http://localhost:5173

## ¿Cómo se juega?

a. Seleccioná una dificultad.

b. Ingresá una palabra válida en español.

c. Usá el teclado físico o el teclado virtual.

d. Tenés 6 intentos para adivinar la palabra.

e. Las letras se colorean como pistas:

| Color      | Significado                            |
|------------|----------------------------------------|
| 🟩 Verde   | Letra correcta en la posición correcta |
| 🟨 Amarillo| Letra correcta en posición incorrecta  |
| ⬜ Gris    | Letra incorrecta                       |

f. Al finalizar la partida, se guarda en el historial (panel izquierdo).

✅ Funcionalidades implementadas
1. Selección de dificultad desde la API

2. Juego Wordle completo con pistas visuales

3. Evaluación de letras (correct/elsewhere/absent)

4. Teclado virtual + soporte para ñ

5. Historial persistente de partidas

6. Layout centrado y responsive

7. Código refactorizado y reutilizable

👤 Autor
Nombre: ALEJANDRO ADRIAN AGUILAR

Carrera: TEC/LIC. EN INFORMATICA

Año/Cuatrimestre: 2025 - 1C


📦 Link al Release
