import { sizes } from '@/design-tokens';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
	type: 'ScrollView' | 'SafeAreaView';
	children: ReactNode;
};

const screenPadding = sizes.base.spacing;

const Screen = ({ type, children }: Readonly<ScreenProps>) => {
	if (type === 'ScrollView') {
		return (
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}>
				<View style={styles.content}>{children}</View>
			</ScrollView>
		);
	} else {
		return (
			<SafeAreaView style={styles.safeAreaContainer}>
				<View style={styles.content}>{children}</View>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	scrollContainer: {
		paddingHorizontal: screenPadding,
		paddingVertical: screenPadding,
		flexGrow: 1,
	},
	safeAreaContainer: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});

export default Screen;
