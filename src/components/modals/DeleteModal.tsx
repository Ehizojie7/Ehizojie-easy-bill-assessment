import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  handleDelete: () => void;
  bottomSheetModalRef: any;
}

export default function DeleteModal({ handleDelete, bottomSheetModalRef }: ModalProps) {

  return (
    <View className='mt-5 px-3'>   
     <View >
          <View >
            <View>
              <Text className="text-[#393F42] text-[14px] leading-[24px] text-center">
                Do you want to delete this?
              </Text>
            </View>

            <View className="flex-row items-center justify-around mt-10">
              <TouchableOpacity className="w-[40%] bg-red-500 py-3 rounded-md" onPress={handleDelete}>
                <Text className="text-center text-white">Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-[40%] bg-blue-500 py-3 rounded-md" onPress={() => bottomSheetModalRef.current?.close()}>
                <Text className="text-center text-white">No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      
    </View>
  );
}


