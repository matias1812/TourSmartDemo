import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import PlaceItem from './PlaceItem';

const BottomSheetComponent = React.forwardRef((props, ref) => {
  const { places } = props;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['10%', '50%', '90%']}
      borderRadius={10}
      handleIndicatorStyle={styles.handleIndicator}
      index={0}
      enablePanDownToClose={false} // Disable pan down to close
      enableContentPanningGesture={false} // Disable content panning gesture
    >
      <View style={styles.bottomSheetContent}>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={places}
            keyExtractor={(item, index) => `${item.id}-${index}`} // Use a combination of id and index
            renderItem={({ item }) => <PlaceItem place={item} />}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </ScrollView>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  flatListContentContainer: {
    paddingBottom: 16,
  },
  handleIndicator: {
    backgroundColor: 'gray',
  },
});

export default BottomSheetComponent;
