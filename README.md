# App Móvil de Lectura de Comics, Mangas y Manwhas

Este proyecto es un prototipo de una aplicación móvil que permite a los usuarios leer diferentes tipos de historias como mangas, cómics y manwhas. Además, los usuarios pueden subir sus propias historias, gestionarlas y compartirlas con otros. Este prototipo está diseñado como parte de un proyecto escolar y no está destinado para uso en producción.

---

## Características principales

- **Autenticación de usuarios**: Los usuarios pueden registrarse e iniciar sesión para acceder a las funcionalidades de la aplicación.
- **CRUD de historias**:
  - **Crear**: Los usuarios pueden subir nuevas historias con portada, descripción, géneros, capítulos y más.
  - **Leer**: Los usuarios pueden explorar y leer historias subidas por otros.
  - **Actualizar**: Los usuarios pueden editar las historias que han subido.
  - **Eliminar**: Los usuarios pueden eliminar sus historias.
- **Clasificación por categorías**: Las historias están organizadas en categorías como manga, cómic y manwha.
- **Gestión de géneros**: Los usuarios pueden seleccionar géneros para sus historias, como acción, aventura, comedia, entre otros.

---

## Tecnologías utilizadas

- **Frontend**: React Native
- **UI Framework**: React Native Paper
- **Gestión de estado**: Context API
- **Validación de formularios**: Formik y Yup
- **Autenticación**: JWT (JSON Web Tokens)
- **Backend**: Strapi (conectado a una base de datos MongoDB)
- **Almacenamiento local**: AsyncStorage
- **Gestión de archivos**: Expo Image Picker y Document Picker

---

## Instalación y configuración

1. **Clonar el repositorio**:
```bash
git clone <URL_DEL_REPOSITORIO>
cd my-rn-app
```

2. **Instalar Dependencias**
```bash
npm install
```

3. **Configurar el backend**
El backend utiliza Strapi y MongoDB. Se debe configurar correctamente el archivo docker-compose.yml en la carpeta src/database

4. **Iniciar la aplicación**
```bash
npm start
```

5. **Probar en un dispositivo o emulador**
Se puede utilizar tanto Expo Go como un emulador de Android o iOS para probar la aplicación

---

## Uso de la aplicación
1. Registro e inicio de sesión:
Los usuarios deben registrarse o iniciar sesión para acceder a las funcionalidades.

2.Explorar historias:
Las historias están organizadas por categorías (manga, cómic, manwha) en la pantalla principal.

3.Subir historias:
Los usuarios pueden subir historias con portada, descripción, géneros y capítulos en formato PDF.

4.Gestionar historias:
Los usuarios pueden editar o eliminar las historias que han subido desde la sección "Mis Historias".

---

## Dependencias Principales
- React Native
- Expo
- React Navigation
- React Native Paper
- Formik
- Yup
- Axios
- Strapi
