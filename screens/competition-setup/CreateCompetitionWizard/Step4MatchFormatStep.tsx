import { MATCH_FORMATS } from '@/configs';
import { useAppTheme } from '@/hooks';
import { CompetitionFormData, FormFieldRenderer } from '@/screens/';
import { Control, useWatch } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

type MatchFormatStepProps = {
	control: Control<CompetitionFormData>;
};

export const MatchFormatStep = ({
	control,
}: Readonly<MatchFormatStepProps>) => {
	const { theme } = useAppTheme();

	// Övervaka vald matchformattyp för att visa relevanta alternativ
	const selectedFormatType = useWatch({
		control,
		name: 'matchFormat',
	});

	const matchFormatTypeField = {
		name: 'matchFormat',
		type: 'select' as const,
		label: 'Match Format Type',
		required: true,
		options: [
			{ value: 'POINTS_BASED', label: 'Points Based (Single Set)' },
			{ value: 'SETS_BASED', label: 'Sets Based (Multiple Sets)' },
		],
	};

	// Generera alternativ för antal game per set baserat på valt formattyp
	const getGamesPerSetOptions = (formatType: string) => {
		const format = MATCH_FORMATS[formatType as keyof typeof MATCH_FORMATS];
		if (!format) return [];

		const options = [];
		for (let i = format.gamesPerSet.min; i <= format.gamesPerSet.max; i++) {
			options.push({ value: i.toString(), label: `${i} Games` });
		}
		return options;
	};

	// Generera alternativ för antal set för set-baserat format
	const getSetsOptions = () => {
		const format = MATCH_FORMATS.SETS_BASED;
		const options = [];
		for (let i = format.sets.min; i <= format.sets.max; i++) {
			options.push({ value: i.toString(), label: `${i} Sets` });
		}
		return options;
	};

	const gamesPerSetField = {
		name: 'gamesPerSet',
		type: 'select' as const,
		label: 'Games Per Set',
		required: true,
		options: selectedFormatType
			? getGamesPerSetOptions(selectedFormatType)
			: [],
	};

	const setsField = {
		name: 'numberOfSets',
		type: 'select' as const,
		label: 'Number of Sets',
		required: true,
		options: getSetsOptions(),
	};

	const tiebreakField = {
		name: 'tiebreakRule',
		type: 'select' as const,
		label: 'Tiebreak Rule',
		required: true,
		options: [
			{ value: 'goldenPoint', label: 'Golden Point' },
			{ value: 'advantageDeuce', label: 'Advantage/Deuce' },
		],
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
						Match Format
					</Text>
					<Text
						style={{
							fontSize: 14,
							color: theme.colors.text,
							marginBottom: 16,
						}}>
						Configure your match format settings
					</Text>

					{/* Val av matchformattyp */}
					<View style={{ marginBottom: 20 }}>
						<FormFieldRenderer
							field={matchFormatTypeField}
							control={control}
						/>
					</View>

					{/* Villkorliga fält baserat på vald formattyp */}
					{selectedFormatType && (
						<>
							{/* Sets selection - only for SETS_BASED */}
							{selectedFormatType === 'SETS_BASED' && (
								<View style={{ marginBottom: 20 }}>
									<FormFieldRenderer
										field={setsField}
										control={control}
									/>
								</View>
							)}

							{/* Val av antal game per set */}
							<View style={{ marginBottom: 20 }}>
								<FormFieldRenderer
									field={gamesPerSetField}
									control={control}
								/>
							</View>

							{/* Val av tiebreak-regel */}
							<View style={{ marginBottom: 20 }}>
								<FormFieldRenderer
									field={tiebreakField}
									control={control}
								/>
							</View>
						</>
					)}
				</View>

				{/* Formatförklaringar */}
				<View
					style={{
						padding: 16,
						backgroundColor: '#f8f9fa',
						borderRadius: 8,
						borderWidth: 1,
						borderColor: '#e9ecef',
					}}>
					<Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
						Beskrivning av spelformer:
					</Text>

					<View style={{ marginBottom: 12 }}>
						<Text style={{ fontWeight: '500', marginBottom: 4 }}>
							Poäng-baserat (1 set):
						</Text>
						<Text style={{ color: '#666', fontSize: 14 }}>
							Spela ett set med 4-32 games. Välj antal poäng och regel for
							tiebreak.
						</Text>
					</View>

					<View style={{ marginBottom: 12 }}>
						<Text style={{ fontWeight: '500', marginBottom: 4 }}>
							Set-baserat (Flera set):
						</Text>
						<Text style={{ color: '#666', fontSize: 14 }}>
							Spela 2-8 set, med 4-8 games vardera. Den som först vinner en
							majoritet av sets vinner matchen.
						</Text>
					</View>

					<View style={{ marginBottom: 8 }}>
						<Text style={{ fontWeight: '500', marginBottom: 4 }}>
							Regler för tiebreak:
						</Text>
						<Text style={{ color: '#666', fontSize: 14 }}>
							• Golden Point: Första poäng vinner
						</Text>
						<Text style={{ color: '#666', fontSize: 14 }}>
							• Advantage/Deuce: Traditionell poängsättning med fördel
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
