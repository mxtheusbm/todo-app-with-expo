import { StyleSheet, Alert } from 'react-native';

import { View } from '../../components/Themed';
import { Heading, Radio, Stack, Text, Button, VStack } from 'native-base'
import { Input } from '../../components/Input';
import { useForm, Controller } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firabase';
import { router, useNavigation } from 'expo-router';

export type taskProps = {
  id: string
  name: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
}

export default function TabTwoScreen() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<taskProps>()

  const submit = async (data: taskProps) => {
    try {
      await addDoc(collection(db, "tasks"), {
        name: data.name,
        description: data.description,
        is_completed: false,
        created_at: serverTimestamp()
      });

      Alert.alert('Uma nova tarefa foi adicionada!')
      router.replace('/');

    } catch (error) {
      Alert.alert('Error ao criar uma nova tarefa!')
      console.log(error)
    }

    reset({ name: '', description: ''})
  }

  return (
    <View style={styles.container}>
      <VStack height='full' justifyContent='space-between'>
        <VStack flexDirection='column'>
          <Heading fontSize={'4xl'} fontWeight={'medium'} mb={6}>
            Criando tarefa
          </Heading>

          <Controller 
            control={control}
            name='name'
            defaultValue=''
            rules={{
              required: 'Campo obrigatório',
              minLength: {
                value: 3,
                message: 'No mínimo 3 characteres'
              }
            }}
            render={({ field: {onChange} }) => (
              <Input 
                placeholder='Nome da tarefa'
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name='description'
            defaultValue=''
            rules={{
              required: 'Campo obrigatório',
              minLength: {
                value: 3,
                message: 'No mínimo 3 characteres'
              }
            }}
            render={({ field: {onChange} }) => (
              <Input 
                placeholder='Descrição'
                onChangeText={onChange}
                mt='4'
                errorMessage={errors.description?.message}
              />
            )}
          />
        </VStack>

        <Button
          size={'lg'} 
          bgColor={'#7A08FA'}
          onPress={handleSubmit(submit)}
        >
          Criar tarefa
        </Button>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24, 
    paddingHorizontal: 16,
  },
});
