# fepcmac-app

Aplicación móvil en React Native (Expo) que carga el sitio web de FEPCMAC en un `WebView`. Incluye pantalla de carga, manejo de errores con botón de reintento y la configuración mínima para compilar un APK con EAS. Se usan los iconos y recursos por defecto de Expo para evitar agregar archivos binarios en el repositorio.

## Requisitos previos

- Node.js 18+
- npm o yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [EAS CLI](https://docs.expo.dev/eas/cli/) (`npm install -g eas-cli`) para generar el APK.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run start
```

Luego, escanea el código QR con la app Expo Go o usa un emulador Android con `npm run android`.

## Generar APK con EAS Build

1. Autentícate en Expo: `eas login`.
2. Configura las credenciales de Android (keystore) cuando EAS lo solicite o provee una existente.
3. Ejecuta el build en la nube:

```bash
npm run build:android
```

4. Descarga el artefacto .apk desde la URL que entrega EAS al finalizar el build.

### Build local del APK

Si prefieres generar el APK localmente, instala previamente Android Studio (SDK + herramientas de línea de comandos), Java 17 y agrega
`adb`/`gradle` al `PATH`. Luego ejecuta:

```bash
npm run build:android:local
```

Esto usa el perfil `apk` definido en `eas.json` y genera `dist/fepcmac-local.apk` sin subir código ni artefactos a la nube.

## Personalización rápida

- Edita la URL del `WebView` en `App.js`.
- Cambia el identificador del paquete Android en `app.json` (`expo.android.package`).
- Si necesitas íconos o splash personalizados, agrégalos a `app.json` y súbelos a un servidor o almacén de artefactos externo en lugar de incluir binarios en el repositorio.
