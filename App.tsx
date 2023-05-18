import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";

import Home from "./views/Home";
import About from "./views/About";
import Statistic from "./views/Statistic";
import ErrorBoundary from './views/ErrorBoundary';

export default function App() {


  return (

      <SafeAreaProvider>
        <Navigation />

        <StatusBar style="light" />

      </SafeAreaProvider>
  

  );
}
