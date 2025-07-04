import { COMPETITION_FORMATS, MATCH_FORMATS, SCORING } from '@/configs';

export type CompetitionFormData = {
	id: string;
	name: string;
	matchFormat: keyof typeof MATCH_FORMATS;
	scoringSystem?: keyof typeof SCORING;
	formatType: keyof typeof COMPETITION_FORMATS;
	courtCount: number;
	courtNames?: string[];
	startDate: string;
} & (
	| { playerCount: number; playerNames?: string[] }
	| { teamCount: number; teamNames?: string[] }
);

export const isSinglesFormat = (
	data: CompetitionFormData
): data is CompetitionFormData & {
	playerCount: number;
	playerNames?: string[];
} => {
	return 'playerCount' in data;
};

export const isTeamFormat = (
	data: CompetitionFormData
): data is CompetitionFormData & {
	teamCount: number;
	teamNames?: string[];
} => {
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
