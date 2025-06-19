import InputText from '@/components/InputText';
import { getTournamentFormat, TournamentFormat } from '@/configs';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import FormatCardList from '../FormatCardList/FormatCardList';
import { TournamentFormData } from '../types';

type FormatStepProps = {
	control: Control<TournamentFormData>;
	selectedFormat: TournamentFormat | null;
	onFormatSelect: (format: TournamentFormat) => void;
};

export const FormatStep = ({
	control,
	selectedFormat,
	onFormatSelect,
}: Readonly<FormatStepProps>) => {
	return (
		//TODO Flytta ut turneringens namn från scrollview
		//TODO lägg border på scrollview
		<ScrollView
			style={{ width: '100%' }}
			showsVerticalScrollIndicator={false}>
			<View style={{ gap: 24 }}>
				<View>
					<Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
						Välj tävlingsformat:
					</Text>
					{selectedFormat && (
						<View
							style={{
								padding: 12,
								backgroundColor: '#f0f9ff',
								borderRadius: 8,
								marginBottom: 16,
								borderWidth: 2,
								borderColor: '#0ea5e9',
							}}>
							<Text style={{ fontWeight: '600', color: '#0369a1' }}>
								Vald: {selectedFormat.name}
							</Text>
							<Text style={{ color: '#0369a1', marginTop: 4 }}>
								{selectedFormat.summary}
							</Text>
						</View>
					)}
					<FormatCardList
						onPress={(formatId) => {
							const format = getTournamentFormat(formatId);
							if (format) {
								onFormatSelect(format);
							}
						}}
					/>
				</View>
				<View>
					<Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
						Turneringens namn:
					</Text>
					<Controller
						name='name'
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputText
								label='Tournament Name'
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
