# Sistema de Recetas - App Móvil

Aplicación móvil desarrollada en **Visual Studio Code** con React Native y Expo, orientada a la gestión de recetas utilizando almacenamiento en memoria local.

---

## Tecnologías utilizadas
- React Native
- Expo
- JavaScript

---

## Funcionalidades

La aplicación incluye las siguientes funcionalidades:

### Inicio de sesión
- Login con usuario y contraseña

### Menú principal
Acceso a:
- Perfil
- Ingreso de recetas
- Lista de recetas
- Cierre de sesión

### Perfil
- Visualización del nombre de usuario
- Cambio de tema de la aplicación (modo claro / oscuro)

### Ingreso de recetas
Registro de recetas con:
- Nombre
- Ingredientes
- Forma de preparación

### Lista de recetas
- Visualización de las recetas previamente ingresadas

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js (versión LTS)  
  https://nodejs.org/

- Expo Go en tu dispositivo móvil  
  Disponible en Play Store (Android) o App Store (iOS)

---

## Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

2. Entrar a la carpeta del proyecto:

```bash
cd SistemaRecetas
```
3. Abre el proyecto en Visual Studio Code:
   - Abrir Visual Studio Code
   - Ir a File > Open Folder y selelccionar la carpeta del proyecto
   - Luego abrir una terminal desde **Terminal** > **New Terminal**
   
5. Instalar dependencias:
Escribir el siguiente comando en la terminal:
```bash
npm install
```

6. Ejecución del proyecto
Inicia el servidor de desarrollo en la terminal con:
```bash
npx expo start
```
Esto generará un código QR en la terminal.

## Ejecución en dispositivo móvil
- Descargar en tu celular la aplicación "Expo Go" desde la Google Play Store
- Abrir la aplicación Expo Go en el celular
- Seleccionar la opción "Scan QR Code"
- Escanear el código QR generado en la terminal de Visual Studio Code

La aplicación se cargará automáticamente en el celular.
