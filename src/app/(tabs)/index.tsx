import { StyleSheet, Text, View } from 'react-native';

import DaysOfMonthList from '../../components/DaysOfMonthList';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function TabOneScreen() {
  const getDayOfWeek = () => {
    moment.locale('pt-br');
    
    const today = moment();
    const dayOfWeek = today.format('dddd');
    return dayOfWeek;
  };

  const currentDayOfWeek = getDayOfWeek();
  return (
    <View style={styles.container}>
      <DaysOfMonthList />
      <View>
        <Text>{currentDayOfWeek}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
