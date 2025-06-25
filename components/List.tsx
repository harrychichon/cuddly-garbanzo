import { isSelected } from '@/utils/';
import React from 'react';
import { FlatList, StyleSheet, Text, ViewStyle } from 'react-native';

type ListProps<T extends { id: string }> = {
	data: T[];
	selected?: T | string | null;
	onPress?: (item: T) => void;
	renderItem: (
		item: T,
		selected: boolean,
		onPress: () => void
	) => React.ReactElement;
	keyExtractor?: (item: T) => string;
	emptyText?: string;
	style?: ViewStyle;
};

function List<T extends { id: string }>({
	data,
	selected = null,
	onPress,
	renderItem,
	keyExtractor,
	emptyText = 'No items available.',
	style,
}: Readonly<ListProps<T>>) {
	const renderListItem = ({ item }: { item: T }) => {
		const selectedState = isSelected(selected, item);
		const handlePress = () => {
			if (onPress) onPress(item);
		};
		return renderItem(item, selectedState, handlePress);
	};

	return (
		<FlatList
			data={data}
			renderItem={renderListItem}
			keyExtractor={keyExtractor ?? ((item) => item.id)}
			ListEmptyComponent={<Text style={styles.emptyText}>{emptyText}</Text>}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={[styles.container, style]}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		borderColor: '#fff',
		borderRadius: 12,
		padding: 16,
		margin: 8,
		backgroundColor: '#333',
		width: '100%',
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 12,
	},
});

export default List;
