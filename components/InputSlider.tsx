import { useAppTheme } from '@/hooks';
import Slider from '@react-native-community/slider';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type InputSliderProps = {
	label: string;
	units: string;
	minimumValue: number;
	maximumValue: number;
	step?: number;
	value: number;
	onValueChange: (value: number) => void;
};

const InputSlider = ({
	label,
	units,
	minimumValue,
	maximumValue,
	step,
	value,
	onValueChange,
}: Readonly<InputSliderProps>) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: { width: '100%', gap: theme.sizes.spacing.sm },
				slider: {
					width: '100%',
				},
			}),
		[theme]
	);
	return (
		<View style={styles.container}>
			<Text style={{ marginBottom: 10 }}>
				{label}: {value || minimumValue} {units}
			</Text>
			<Slider
				style={styles.slider}
				minimumValue={minimumValue}
				maximumValue={maximumValue}
				step={step ?? 1}
				value={value}
				onValueChange={onValueChange}
				minimumTrackTintColor={theme.colors.primary}
				maximumTrackTintColor={theme.colors.border}
				thumbTintColor={theme.colors.primary}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
				<Text style={{ fontSize: 12, color: theme.colors.textDim }}>
					{minimumValue} {units}
				</Text>
				<Text style={{ fontSize: 12, color: theme.colors.textDim }}>
					{maximumValue} {units}
				</Text>
			</View>
		</View>
	);
};

export default InputSlider;
