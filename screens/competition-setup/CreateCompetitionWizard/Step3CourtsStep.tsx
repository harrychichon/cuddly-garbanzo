import { MySlider, MyTextInput } from '@/components/';
import { useAppTheme } from '@/hooks';
import { CompetitionFormData } from '@/screens/';
import React, { useEffect, useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

type CourtsStepProps = {
	control: Control<CompetitionFormData>;
	maxCourts: number;
	currentCourtCount: number;
};

export const CourtsStep = ({
	control,
	maxCourts,
	currentCourtCount,
}: Readonly<CourtsStepProps>) => {
	const { theme } = useAppTheme();
	const [courtNames, setCourtNames] = useState<string[]>([]);

	const watchedCourtCount = useWatch({
		control,
		name: 'courtCount',
		defaultValue: currentCourtCount,
	});

	// Updpaterar bannamnens array när antal ändras
	useEffect(() => {
		const currentCount = watchedCourtCount || currentCourtCount;
		const newNames = Array.from({ length: currentCount }, (_, index) => {
			return courtNames[index] || `Court ${index + 1}`;
		});
		setCourtNames(newNames);
	}, [watchedCourtCount, currentCourtCount]);

	const handleCourtNameChange = (index: number, name: string) => {
		const updatedNames = [...courtNames];
		updatedNames[index] = name;
		setCourtNames(updatedNames);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={{ gap: 24 }}>
				<View>
					<Text
						style={{
							color: theme.colors.text,
							fontSize: 18,
							fontWeight: '600',
							marginBottom: 12,
						}}>
						Number of Courts
					</Text>
					<Text
						style={{
							fontSize: 14,
							color: theme.colors.text,
							marginBottom: 16,
						}}>
						Maximum courts available: {maxCourts} (based on participant count)
					</Text>
					<Controller
						name='courtCount'
						control={control}
						render={({ field: { onChange, value } }) => (
							<MySlider
								label='Number of Courts'
								minimumValue={1}
								maximumValue={maxCourts}
								step={1}
								value={value || 1}
								onValueChange={onChange}
								units='courts'
							/>
						)}
					/>
				</View>

				<View>
					<Text
						style={{
							color: theme.colors.text,
							fontSize: 18,
							fontWeight: '600',
							marginBottom: 12,
						}}>
						Court Names
					</Text>
					<Text
						style={{
							fontSize: 14,
							color: theme.colors.text,
							marginBottom: 16,
						}}>
						Specificera namnen på banorna eller lämna de förifyllda.
					</Text>

					<View style={{ gap: 12 }}>
						{courtNames.map((name, index) => (
							<MyTextInput
								key={index + name}
								label={`Court ${index + 1}`}
								value={name}
								onChangeText={(text) => handleCourtNameChange(index, text)}
								maxLength={20}
							/>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
