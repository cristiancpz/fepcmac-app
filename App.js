import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

const FEPCMAC_URL = 'https://www.fepcmac.org.pe/';

export default function App() {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleReload = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ExpoStatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>FEPCMAC</Text>
        <Text style={styles.subtitle}>Portal en WebView</Text>
      </View>

      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: FEPCMAC_URL }}
          originWhitelist={["*"]}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          startInLoadingState
        />

        {(isLoading || hasError) && (
          <View style={styles.overlay}>
            {isLoading && !hasError ? (
              <View style={styles.overlayContent}>
                <ActivityIndicator size="large" color="#0b3a63" />
                <Text style={styles.overlayText}>Cargando contenido...</Text>
              </View>
            ) : (
              <View style={styles.overlayContent}>
                <Text style={styles.overlayText}>No se pudo cargar el sitio.</Text>
                <TouchableOpacity style={styles.button} onPress={handleReload}>
                  <Text style={styles.buttonText}>Reintentar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0b3a63'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff'
  },
  subtitle: {
    fontSize: 14,
    color: '#d7e7f7'
  },
  webviewContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#0b3a63',
    overflow: 'hidden'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayContent: {
    alignItems: 'center',
    gap: 12
  },
  overlayText: {
    color: '#0b3a63',
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#0b3a63',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600'
  }
});
