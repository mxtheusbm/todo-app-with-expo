import { StyleSheet, View } from 'react-native';

import DaysOfMonthList from '../../components/DaysOfMonthList';

import moment from 'moment';
import 'moment/locale/pt-br';
import { Stack, Text, VStack } from 'native-base';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firabase';
import { taskProps } from './newTask';
import { useEffect, useState } from 'react';
import { Task } from '../../components/Task';

export default function TabOneScreen() {
  const getDayOfWeek = () => {
    moment.locale('pt-br');
    
    const today = moment();
    const dayOfWeek = today.format('dddd');
    return dayOfWeek;
  };

  const [data, setData] = useState<taskProps[]>()

  const getTasks = () => {
    try {
      onSnapshot(collection(db, "tasks"), (DATA) => {
        const tasks: taskProps[] = [];
        DATA.forEach((doc) => {
          tasks.push({...doc.data() as taskProps, id: doc.id});
        });
        setData(tasks);
      });
    } catch (error) {
      alert("Não foi possível carregar os itens!");
      console.log(error);
    }
  }
  
  useEffect(() => {
    getTasks();
  }, []);

  const currentDayOfWeek = getDayOfWeek();
  return (
    <View style={styles.container}>
      <DaysOfMonthList />
      <Stack p='4'>
        <Text fontSize='md' color='#7E7E7E'>{currentDayOfWeek}</Text>

        <VStack space={2} mt='5'>
          {data?.map((item, itemI) => 
            <Task key={item.name + itemI.toString()} item={item} itemI={itemI} />
          )}
        </VStack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#FAFAFA'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
