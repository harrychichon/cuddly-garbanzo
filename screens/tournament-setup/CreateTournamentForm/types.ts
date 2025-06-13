import { MATCH_FORMATS, SCORING, TOURNAMENT_FORMATS } from '@/configs';
import {} from '@/constants';

export type TournamentFormData = {
	tournamentName: string;
	matchFormat: keyof typeof MATCH_FORMATS;
	scoringSystem: keyof typeof SCORING;
	formatType: keyof typeof TOURNAMENT_FORMATS;
} & ({ playerCount: number } | { teamCount: number });

export const isSinglesFormat = (
	data: TournamentFormData
): data is TournamentFormData & { playerCount: number } => {
	return 'playerCount' in data;
};

export const isDoublesFormat = (
	data: TournamentFormData
): data is TournamentFormData & { teamCount: number } => {
	return 'teamCount' in data;
};

type BaseField = {
	name: string;
	label: string;
	required?: boolean;
};

type TextField = BaseField & {
	type: 'text';
	defaultValue?: string;
	placeholder?: string;
	maxLength?: number;
};

export type SelectField = BaseField & {
	type: 'select';
	options: Array<{ value: string; label: string }>;
};

type SliderField = BaseField & {
	type: 'slider';
	min: number;
	max: number;
	step: number;
	unit?: string;
};

type NumberField = BaseField & {
	type: 'number';
	min?: number;
	max?: number;
	step?: number;
};

export type FormField = TextField | SelectField | SliderField | NumberField;

export type FormConfig = {
	fields: FormField[];
	defaultValues: Record<string, any>;
};
