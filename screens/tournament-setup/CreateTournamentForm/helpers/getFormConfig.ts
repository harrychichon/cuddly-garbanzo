import { MATCH_FORMATS, TournamentFormat } from '@/configs';
import { FormConfig, FormField } from '../types';

export const calculateMaxCourts = (
	format: TournamentFormat,
	participantCount: number
): number => {
	// For singles: each match needs 2 players, so max courts = players / 2
	// For doubles: each match needs 2 teams (4 players), so max courts = teams / 2
	return Math.floor(participantCount / 2);
};

const getFormConfig = (
	selectedFormat: TournamentFormat,
	participantCount?: number
): FormConfig => {
	const today = new Date().toISOString().split('T')[0];
	const defaultTournamentName = `${selectedFormat.name} ${today}`;

	const baseFields: FormField[] = [
		{
			name: 'tournamentName',
			type: 'text',
			label: 'Tournament Name',
			required: true,
			placeholder: 'Enter tournament name',
			defaultValue: defaultTournamentName,
			maxLength: 50,
		},
		{
			name: 'matchFormat',
			type: 'select',
			label: 'Match Format',
			required: true,
			options: Object.entries(MATCH_FORMATS).map(([key, value]) => ({
				value: key,
				label: `${value.sets} Set${value.sets > 1 ? 's' : ''} - ${
					value.gamesPerSet
				} Games`,
			})),
		},
	];

	// Add format-specific participant count field
	const formatSpecificField: FormField =
		selectedFormat.type === 'singles'
			? {
					name: 'playerCount',
					type: 'slider',
					label: 'Number of Players',
					required: true,
					min: selectedFormat.playerRange.min,
					max: selectedFormat.playerRange.max,
					step: selectedFormat.playerRange.step,
					unit: 'players',
			  }
			: {
					name: 'teamCount',
					type: 'slider',
					label: 'Number of Teams',
					required: true,
					min: selectedFormat.teamRange.min,
					max: selectedFormat.teamRange.max,
					step: selectedFormat.teamRange.step,
					unit: 'teams',
			  };

	// Add courts field dynamically based on participant count
	const courtsField: FormField | null = participantCount
		? {
				name: 'courtCount',
				type: 'slider',
				label: 'Number of Courts',
				required: true,
				min: 1,
				max: calculateMaxCourts(selectedFormat, participantCount),
				step: 1,
				unit: 'courts',
		  }
		: null;

	const allFields = courtsField
		? [...baseFields, formatSpecificField, courtsField]
		: [...baseFields, formatSpecificField];

	const defaultParticipantCount =
		selectedFormat.type === 'singles'
			? selectedFormat.playerRange.min
			: selectedFormat.teamRange.min;

	return {
		fields: allFields,
		defaultValues: {
			tournamentName: defaultTournamentName,
			matchFormat: 'BEST_OF_ONE' as keyof typeof MATCH_FORMATS,
			[formatSpecificField.name]: defaultParticipantCount,
			...(courtsField && { courtCount: 1 }),
		},
	};
};

export default getFormConfig;
