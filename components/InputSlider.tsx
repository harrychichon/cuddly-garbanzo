import { useAppTheme } from '@/hooks';
import Slider from '@react-native-community/slider';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type InputSliderProps = {
	label: string;
	minimumValue: number;
	maximumValue: number;
	value: string | number;
	onValueChange: (value: number) => void;
	units?: string;
	step?: number;
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
					height: 40,
				},
			}),
		[theme]
	);
	return (
		<View style={styles.container}>
			<Text style={{ marginBottom: 10, color: theme.colors.text }}>
				{label}: {value || minimumValue} {units}
			</Text>

			<Slider
				minimumValue={minimumValue}
				maximumValue={maximumValue}
				step={step ?? 1}
				value={typeof value === 'number' ? value : Number(value)}
				onValueChange={onValueChange}
				minimumTrackTintColor={theme.colors.primary}
				maximumTrackTintColor={theme.colors.border}
				thumbTintColor={theme.colors.primary}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 5,
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
