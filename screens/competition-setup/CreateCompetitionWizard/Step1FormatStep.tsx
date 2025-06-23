import InputText from '@/components/MyTextInput';
import { CompetitionFormat, getCompetitionFormat } from '@/configs';
import { useAppTheme } from '@/hooks';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import FormatCardList from '../FormatCardList';
import { CompetitionFormData } from '../types';

type FormatStepProps = {
	control: Control<CompetitionFormData>;
	selectedFormat: CompetitionFormat | null;
	onFormatSelect: (format: CompetitionFormat) => void;
};

export const FormatStep = ({
	control,
	selectedFormat,
	onFormatSelect,
}: Readonly<FormatStepProps>) => {
	const { theme } = useAppTheme();
	return (
		<ScrollView
			style={{ width: '100%' }}
			showsVerticalScrollIndicator={false}>
			<View style={{ gap: 24 }}>
				<View>
					<Text
						style={{
							color: theme.colors.text,
							fontSize: 18,
							fontWeight: '600',
							marginBottom: 12,
						}}>
						Välj tävlingsformat:
					</Text>
					{selectedFormat && (
						<View
							style={{
								padding: 12,
								backgroundColor: '#6fdc6f',
								borderRadius: 8,
								marginBottom: 16,
								borderWidth: 2,
								borderColor: '#1b371b',
							}}>
							<Text style={{ fontWeight: '600', color: '#1b371b' }}>
								Vald: {selectedFormat.name}
							</Text>
							<Text style={{ color: '#1b371b', marginTop: 4 }}>
								{selectedFormat.summary}
							</Text>
						</View>
					)}
					<FormatCardList
						onPress={(formatId) => {
							const format = getCompetitionFormat(formatId);
							if (format) {
								onFormatSelect(format);
							}
						}}
					/>
				</View>
				<View>
					<Controller
						name='name'
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputText
								label='Turneringens namn:'
								value={value || ''}
								onChangeText={onChange}
								maxLength={50}
							/>
						)}
					/>
				</View>
			</View>
		</ScrollView>
	);
};
