import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const getMonthName = (date: Date): string => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return months[date.getMonth()];
  }

  const currentDate = new Date();
  const currentMonthName = getMonthName(currentDate);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: '500'
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: currentMonthName,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-check" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <MaterialCommunityIcons
          //           name="bell-outline"
          //           size={30}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="newTask"
        options={{
          headerTitleStyle: { display: 'none' },
          tabBarStyle: { display: "none" },
          tabBarIcon: ({size, color}) => (
            <View style={{
              position:"absolute",
              bottom: 8, 
              right: 16, 
              backgroundColor: '#FAFAFA',
              padding: 12,
              borderRadius: 100
              }}
            >
              <View
                style={{ 
                  backgroundColor: '#7A08FA',
                  padding: 16,
                  borderRadius: 50 
                }}
              >
              <MaterialCommunityIcons name='plus' size={48} color='#ffffff'/>
              </View>
            </View>
          ),
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name="close"
                    size={40}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginLeft: 8, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
