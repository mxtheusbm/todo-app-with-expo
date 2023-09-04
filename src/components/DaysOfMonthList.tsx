import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DaysOfMonthList = () => {
  const [daysList, setDaysList] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState(0);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    generateDaysList();
    setCurrentDay(new Date().getDate());
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      const scrollToX = (currentDay - 1) * 40; // Adjust the width and margin values
      scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
    }
  }, [currentDay]);

  const generateDaysList = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    setDaysList(daysArray);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.daysScrollView}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      >
        {daysList.map((day) => (
          <View
          key={day}
          style={[
            styles.dayItem,
            day === currentDay && styles.currentDayItem,
          ]}
          >
            <Text
              key={day}
              style={[
                styles.dayItemText,
                day === currentDay && styles.currentDayItemText,
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  daysScrollView: {
    flexDirection: 'row',
    marginTop: 24,
  },
  dayItem: {
    width: 42,
    height: 68,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDayItem: {
    width: 68,
    backgroundColor: '#7A08FA',
    borderRadius: 50,
  },
  dayItemText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#D6D6D6',
  },
  currentDayItemText: {
    color: '#FFFFFF',
  },
});

export default DaysOfMonthList;