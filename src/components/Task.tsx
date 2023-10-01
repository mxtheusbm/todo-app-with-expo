import { Checkbox, Icon, IconButton, Text, Box } from "native-base"
import { Entypo } from '@expo/vector-icons';

import { taskProps } from "../app/(tabs)/newTask"
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firabase";
import { useState } from "react";

type Props = {
  item: taskProps,
  itemI: number
}

export const Task = ({ item, itemI }: Props) => {
  const [checked, setChecked] = useState(item.is_completed)
  
  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  }

  const checkTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, {
      is_completed: checked,
    });
  }
  
  return (
    <Box 
      w="100%"
      flexDirection="row"
      justifyContent="space-between" 
      alignItems="center" 
      overflow="hidden" 
      borderColor="coolGray.200" 
      borderWidth="1"
      rounded='lg'
      p='3'
    >
      <Checkbox
        colorScheme="purple" 
        isChecked={item.is_completed} 
        onChange={() => {
          setChecked(!checked)
          checkTask(item.id)
        }} 
        value={item.name}
      >
      </Checkbox>
      <Text
        fontSize="xl"
        fontWeight="medium" 
        width="100%" 
        flexShrink={1} 
        textAlign="left" 
        mx="4" 
        strikeThrough={item.is_completed} 
        _light={{color: item.is_completed ? "gray.400" : "coolGray.800"}} 
        _dark={{color: item.is_completed ? "gray.400" : "coolGray.50"}} 
        onPress={() => {
          setChecked(!checked)
          checkTask(item.id)
        }}
      >
        {item.name}
      </Text>
      <IconButton 
        size="md" 
        colorScheme="trueGray" 
        icon={<Icon height={20} as={Entypo} 
        name="minus" size="lg" 
        color="red.500" />} 
        onPress={() => deleteTask(item.id)} 
      />

    </Box>
  )
}