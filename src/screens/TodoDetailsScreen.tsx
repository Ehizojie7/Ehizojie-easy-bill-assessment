import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { AntDesign } from '@expo/vector-icons';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

const TodoDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const todo = useSelector((state: RootState) => state.todos.todos.find(todo => todo.id === id));

  return (
    <View className='px-2 h-full'>
    <View className='flex-row items-center mt-5'>
    <View className='flex-row items-center' style={{gap: 15}}>
      <TouchableOpacity onPress={() => navigation.goBack()}> 
      <Text>
      <AntDesign name="left" size={26} color="black" />
      </Text>
      </TouchableOpacity>    
      <Text className='text-[18px] font-semibold'>
        Home
      </Text>
    </View>
    <View className='ml-[18%]'>
      <Text className='text-center text-[#1A1A1A] text-bold text-[20px]'>
        Details
      </Text>
    </View>
    </View>

    <ScrollView className='mt-2'>
       <View className='mt-6 border py-2.5 px-3 rounded-lg bg-black'>
            <View className='py-1'>
            <Text className='text-white text-base font-medium'>{todo?.title}</Text>
            <Text className='text-white text-[18px] font-medium'>{todo?.description}</Text>
            </View>                         
         </View>
    </ScrollView>

    <TouchableOpacity 
        className='bg-[#000000] py-7 rounded-lg mt-20 mb-10 mx-3' 
        onPress={() => navigation.navigate('AddEditTodo', { id })}>
          <Text className='text-[#FFCA44] text-[18px] text-center font-bold leading-[21.6px]'>
              Edit
          </Text>       
        </TouchableOpacity>  
    </View>
  );
};

export default TodoDetailsScreen;
