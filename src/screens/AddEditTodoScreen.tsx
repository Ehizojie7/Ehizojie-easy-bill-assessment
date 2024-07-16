import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../services/store';
import { addTodo, updateTodo, saveTodos } from '../services/todoSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = StackScreenProps<RootStackParamList, 'AddEditTodo'>;

const AddEditTodoScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = route.params || {};
  const todo = useSelector((state: RootState) => state.todos.todos.find(todo => todo.id === id));

  const [title, setTitle] = useState(todo ? todo.title : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (id) {
      setTitle(todo?.title || '');
      setDescription(todo?.description || '');
    }
  }, [id, todo]);

  const handleSave = () => {
     if (title === '') {
      setTitleError('Title cannot be empty');
      return;
    }
    if (description === '') {
      setDescriptionError('Description cannot be empty');
      return;
    }
    if (id) {
      dispatch(updateTodo({
        id,
        title,
        description
      }));
    } else {
      dispatch(addTodo({
        id: Math.random().toString(),
        title,
        description
      }));
    }
    dispatch(saveTodos());
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
    <View className='px-2'>
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
      <View className='ml-[15%]'>
        <Text className='text-center text-[#1A1A1A] text-bold text-[24px]'>
          Add a Todo
        </Text>
      </View>
      </View>
      
      <View className='mt-6'>
      <Text className='text-[#1A1A1A] text-bold text-[18px]'> Title</Text>
      <TextInput 
      className='border py-2.5 rounded-lg px-3 mt-3'
      placeholder=" Add a Title..." 
      placeholderTextColor={'#1A1A1A'}
      value={title} 
      onChangeText={setTitle}
       />
      </View>
      {titleError ? <Text className='mt-2' style={{color: 'red', textAlign: 'center'}}>{titleError}</Text> : null}


      <View className='mt-6'>
      <Text className='text-[#1A1A1A] text-bold text-[18px]'> Description</Text>
      <TextInput 
      className='border py-2.5 rounded-lg px-3 mt-3'
      placeholder="Add a Description..." 
      placeholderTextColor={'#1A1A1A'}
      value={description} 
      onChangeText={setDescription} />
      </View>
      {descriptionError ? <Text className='mt-2' style={{color: 'red', textAlign: 'center'}}>{descriptionError}</Text> : null}

 
      <TouchableOpacity 
        className='bg-[#000000] py-7 rounded-lg mt-20 mb-10 mx-3' 
        onPress={handleSave}>
          <Text className='text-[#FFCA44] text-[18px] text-center font-bold leading-[21.6px]'>
              Save Todo
          </Text>
           
        </TouchableOpacity>    
    </View>
    </KeyboardAwareScrollView>
  );
};

export default AddEditTodoScreen;
