import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../services/store';
import { fetchTodos, deleteTodo, saveTodos } from '../services/todoSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import DeleteModal from '../components/modals/DeleteModal';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
    dispatch(saveTodos(todos.filter(todo => todo.id !== id)));
    bottomSheetModalRef.current?.close();
  };

  const openDeleteModal = (id: string) => {
    setSelectedTodoId(id);
    bottomSheetModalRef.current?.present();
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedState(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <BottomSheetModalProvider>
      <View className="h-full px-3">
        <View className="mt-5">
          <Text className="text-[#1A1A1A] text-bold text-[24px]">Make a list. 😊</Text>
        </View>

        {todos.length < 1 && (
          <View className="mt-6 border py-2 px-3 rounded-lg bg-black">
            <View className="py-1">
              <Text className="text-white text-sm font-medium">Create a To-do list today 👍.</Text>
            </View>
          </View>
        )}

        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="mt-6 flex-row items-center justify-between border py-2 px-3 rounded-lg bg-black">
              <View className="py-1 flex-row items-center" style={{ gap: 25 }}>
                <Checkbox
                  value={checkedState[item.id] || false}
                  onValueChange={() => handleCheckboxChange(item.id)}
                  color={checkedState[item.id] ? '#4630EB' : undefined}
                />
                <View>
                  <Text className="text-white text-base font-medium ml-2">{item.title}</Text>
                  <TouchableOpacity
                    className="border border-white px-2 mt-2 rounded-md"
                    onPress={() => navigation.navigate('Details', { id: item.id })}>
                    <Text className="text-white text-base font-medium">see more details...</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
                <Text className="text-base font-medium">
                  <MaterialIcons name="delete" size={24} color="#FFCA44" />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          className="bg-[#000000] py-7 rounded-lg mt-6 mb-10 mx-3"
          onPress={() => navigation.navigate('AddEditTodo')}>
          <Text className="text-[#FFCA44] text-[18px] text-center font-bold leading-[21.6px]">Create a Todo</Text>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}>
        <DeleteModal
          handleDelete={() => selectedTodoId && handleDelete(selectedTodoId)}
          bottomSheetModalRef={bottomSheetModalRef}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
