import InputSlider from '@/components/MySlider';
import InputText from '@/components/MyTextInput';
import { CompetitionFormat } from '@/configs';
import { useAppTheme } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { CompetitionFormData } from '../types';

type ParticipantsStepProps = {
	control: Control<CompetitionFormData>;
	format: CompetitionFormat;
	participantCount: number;
};

export const ParticipantsStep = ({
	control,
	format,
	participantCount,
}: Readonly<ParticipantsStepProps>) => {
	const { theme } = useAppTheme();
	const [participantNames, setParticipantNames] = useState<string[]>([]);

	const isSingles = format.type === 'singles';
	const participantLabel = isSingles ? 'Player' : 'Team';
	const participantLabelPlural = isSingles ? 'Players' : 'Teams';

	const range = isSingles ? format.playerRange : format.teamRange;

	const watchedCount = useWatch({
		control,
		name: isSingles ? 'playerCount' : 'teamCount',
		defaultValue: participantCount,
	});

	// Uppdaterar deltagarnamnens array när antal ändras
	useEffect(() => {
		const currentCount = watchedCount || participantCount;
		const newNames = Array.from({ length: currentCount }, (_, index) => {
			return participantNames[index] || `${participantLabel} ${index + 1}`;
		});
		setParticipantNames(newNames);
	}, [watchedCount, participantCount, participantLabel]);

	const handleNameChange = (index: number, name: string) => {
		const updatedNames = [...participantNames];
		updatedNames[index] = name;
		setParticipantNames(updatedNames);
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
						Antal {participantLabelPlural}
					</Text>
					<Controller
						name={isSingles ? 'playerCount' : 'teamCount'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputSlider
								label={`Number of ${participantLabelPlural}`}
								minimumValue={range.min}
								maximumValue={range.max}
								step={range.step}
								value={value || range.min}
								onValueChange={onChange}
								units={participantLabelPlural.toLowerCase()}
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
						{participantLabel} Names
					</Text>
					<Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
						Specificera namnen eller lämna de förifyllda.
					</Text>

					<View style={{ gap: 12 }}>
						{participantNames.map((name, index) => (
							<InputText
								key={index + name}
								label={`${participantLabel} ${index + 1}`}
								value={name}
								onChangeText={(text) => handleNameChange(index, text)}
								maxLength={30}
							/>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
