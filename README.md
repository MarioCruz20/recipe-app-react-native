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

## Nota:
Si te da un error al ejecutar el comando anterior prueba lo siguiente:
  - Abre Windows PowerShell como administrador
  - Escribe el comando y presiona ENTER: 
  ```bash
  Set-ExecutionPolicy RemoteSigned
  ```
  - Te mostrará el siguiente mensaje:

  Execution Policy Change
  The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose
  you to the security risks described in the about_Execution_Policies help topic at
  https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
  [Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"):

  - Escribe: **"Y"**, presiona ENTER.
  - Regresa a Visual Studio Code, cierra la terminal anterior y abre una nueva.
  - Vuelve a ingresar el comando:

  ```bash
  npm install
  ```
  ---
5. Ejecución del proyecto
Inicia el servidor de desarrollo en la terminal con:
```bash
npx expo start
```
Esto generará un código QR en la terminal.

## Ejecución en dispositivo móvil
- Abrir la aplicación Expo Go en el celular
- Seleccionar la opción "Scan QR Code"
- Escanear el código QR generado en la terminal de Visual Studio Code

La aplicación se cargará automáticamente en el celular.

## Posible error:
Si al escanear el código QR o introducir la URL manualmente aparece la pantalla de "Project is incompatible with this version of Expo Go"

Esto se debe a que el proyecto usa SDK 53. 
**Solución:**
- Selecciona "Learn how to install Expo Go for SDK 53"
- Presionas el botón de "Download"
- Antes de actualizar a esa versión es necesario **desinstalar** el Expo Go que se descargó antes
- Instalar Expo Go ahora con SDK 53
- Volver a escanear código QR o ingresar URL manualmente para ver la app

## Nota:
El login está deshabilitado **temporalmente**, ingresa escribiendo cualquier nombre de usuario y cualquier contraseña.
Ejemplo:
- Usuario: user
- Contraseña: 1234
