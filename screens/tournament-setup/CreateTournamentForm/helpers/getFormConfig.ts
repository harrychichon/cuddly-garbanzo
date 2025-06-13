import { MATCH_FORMATS, SCORING, TournamentFormat } from '@/configs';
import { FormConfig, FormField } from './types';

const getFormConfig = (selectedFormat: TournamentFormat): FormConfig => {
	const baseFields: FormField[] = [
		{
			name: 'tournamentName',
			type: 'text',
			label: 'Tournament Name',
			required: true,
			placeholder: 'Enter tournament name',
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
		{
			name: 'scoring',
			type: 'slider',
			label: 'Scoring System',
			required: true,
			min: SCORING.min,
			max: SCORING.max,
			step: 1,
			unit: 'points',
		},
	];

	// Add format-specific fields
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

	return {
		fields: [...baseFields, formatSpecificField],
		defaultValues: {
			tournamentName: '',
			matchFormat: 'BEST_OF_ONE',
			scoringSystem: 'TRADITIONAL',
			[formatSpecificField.name]:
				selectedFormat.type === 'singles'
					? selectedFormat.playerRange.min
					: selectedFormat.teamRange.min,
		},
	};
};

export default getFormConfig;
