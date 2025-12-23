import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { Color } from "@theme/color";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@db/index";
import { seedData } from "@db/seeder";
import migrations from "@db/migrations/migrations";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  React.useEffect(() => {
    if (!success) return;

    (async () => {
      await seedData();
    })();
  }, [success, error]);

  const theme =
    colorScheme === "light"
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: Color.surface },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: Color.surface },
        };

  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: "auto",
        prefixes: [prefix],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
