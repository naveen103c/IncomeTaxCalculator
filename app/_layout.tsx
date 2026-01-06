import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="profile" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'profile',
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}
