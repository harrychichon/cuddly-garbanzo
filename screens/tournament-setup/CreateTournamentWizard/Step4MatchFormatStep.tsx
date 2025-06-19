// steps/MatchFormatStep.tsx
import { MATCH_FORMATS } from '@/configs';
import React from 'react';
import { Control } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { FormFieldRenderer } from '../helpers/formFieldRenderer';
import { TournamentFormData } from '../types';

type MatchFormatStepProps = {
	control: Control<TournamentFormData>;
};

export const MatchFormatStep = ({
	control,
}: Readonly<MatchFormatStepProps>) => {
	const matchFormatField = {
		name: 'matchFormat',
		type: 'select' as const,
		label: 'Match Format',
		required: true,
		options: Object.entries(MATCH_FORMATS).map(([key, value]) => ({
			value: key,
			label: `${value.sets} Set${value.sets > 1 ? 's' : ''} - ${
				value.gamesPerSet
			} Games`,
		})),
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={{ gap: 24 }}>
				<View>
					<Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
						Match Format
					</Text>
					<Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
						Välj
					</Text>

					<FormFieldRenderer
						field={matchFormatField}
						control={control}
					/>
				</View>

				<View
					style={{
						padding: 16,
						backgroundColor: '#f8f9fa',
						borderRadius: 8,
						borderWidth: 1,
						borderColor: '#e9ecef',
					}}>
					<Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
						Format Explanations:
					</Text>

					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<View
							key={key}
							style={{ marginBottom: 8 }}>
							<Text style={{ fontWeight: '500' }}>
								{format.sets} Set{format.sets > 1 ? 's' : ''} -{' '}
								{format.gamesPerSet} Games:
							</Text>
							<Text style={{ color: '#666', fontSize: 14 }}>
								{format.sets === 1
									? `Play one set to ${format.gamesPerSet} games`
									: `Best of ${format.sets} sets, each to ${format.gamesPerSet} games`}
								{format.tiebreakAt &&
									` (tiebreak at ${format.tiebreakAt}-${format.tiebreakAt})`}
							</Text>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
};
